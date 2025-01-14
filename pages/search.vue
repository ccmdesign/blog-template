<template>
  <main>
    <blog-hero mini/>
    <blog-partners :logos="projectConfig.project_partners" />
    <blog-post-list :content="data.filteredList" class="margin-bottom:xl-2xl"/>
  </main>
</template>

<script setup>
  import projectConfig from '../project_config.json';
    import _ from 'lodash';
    const route = useRoute()

  useHead({
    title: "Blog Template",
    meta: [
      { name: "description", content: projectConfig.description },
      { property: "og:site_name", content: projectConfig.title },
      { property: "og:title", content: projectConfig.title },
      { property: "og:description", content: projectConfig.description },
      { property: "og:image", content: projectConfig.image || "/images/default.png" },
      { property: "og:image:alt", content: projectConfig.title },
      { name: "twitter:image", content: projectConfig.image || "/images/default.png" },
      { name: "twitter:image:alt", content: projectConfig.title },
      { name: "twitter:description", content: projectConfig.description },
    ],
  });
  const blog = await queryContent("blogposts").sort({ date: -1 }).find();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = reactive({
    items: [],
    filteredList: []
  });

  blog.forEach((post) => {
    let item = {
      slug: post.slug,
      brow: post.brow,
      title: post.title,
      tagline: post.tagline,
      description: post.excerpt,
      actionLabel: "Read more",
      tags: post.tags,
      url: `/updates/${post.slug}`,
      date: "",
      stringDate: post.date,
      featured: post.featured,
    };

    const dateParts = item.stringDate.split("-");
    const dateObj = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2])
    );
    item.date = ` ${
      months[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    data.items.push(item);

  });

const filterList = (term) => {
  const searchWords = _.words(normalizeString(term.toLowerCase()));
  let listItems = data.items;

  listItems = listItems.filter(item =>
    hasAtLeastOneWordMatch(item, searchWords)
  );

  // Ordena os itens de acordo com a preferência
  const sortedList = listItems.sort((a, b) => {
    // Verifica se o term completo está presente em algum atributo de a e b
    const aFullTermMatch = hasFullTermMatch(a, searchWords);
    const bFullTermMatch = hasFullTermMatch(b, searchWords);

    if (aFullTermMatch && !bFullTermMatch) return -1; // a vem antes de b
    if (!aFullTermMatch && bFullTermMatch) return 1; // b vem antes de a

    // Calcula a quantidade de palavras do term presentes em cada item
    const aWordsMatched = countWordsMatched(a, searchWords);
    const bWordsMatched = countWordsMatched(b, searchWords);

    // Ordena com base na quantidade de palavras do term presentes
    if (aWordsMatched > bWordsMatched) return -1; // a vem antes de b
    if (aWordsMatched < bWordsMatched) return 1; // b vem antes de a

    return 0; // a e b são iguais em relação às preferências
  });

  //Marca as palavras procuradas
  sortedList.forEach(item => {
    item.title = highlightTitle(item.title, searchWords);
    item.tagline = highlightTitle(item.tagline, searchWords);
  });
  // Atualiza data.filteredList com os itens ordenados
  data.filteredList = sortedList;
};

const normalizeString = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacríticos (acentos e cedilhas)
};

// Verifica se o item possui pelo menos uma palavra do termo
const hasAtLeastOneWordMatch = (item, searchWords) => {
  return searchWords.some(word =>
    Object.values(item).some(value =>
      value && normalizeString(value.toString().toLowerCase()).includes(normalizeString(word))
    )
  );
};

// Verifica se o term completo está presente em algum atributo do item
const hasFullTermMatch = (item, searchWords) => {
  return Object.values(item).some(value =>
    value
      ? normalizeString(_.words(value.toString().toLowerCase()).join(' ')).includes(normalizeString(searchWords.join(' ')))
      : false
  );
};

// Calcula a quantidade de palavras do term presentes no item
const countWordsMatched = (item, searchWords) => {
  let count = 0;
  Object.values(item).forEach(value => {
    if (value) {
      _.words(normalizeString(value.toString().toLowerCase())).forEach(word => {
        if (searchWords.includes(normalizeString(word))) {
          count++;
        }
      });
    }
  });
  return count;
};

// Função para destacar os terms no título
const highlightTitle = (highlightedTitle, searchWords) => {
  // Itera sobre os terms de pesquisa
  searchWords.forEach(term => {
    // Cria uma expressão regular que mantém o caso original da palavra
    const regExp = new RegExp(`\\b${_.escapeRegExp(term)}\\b`, 'gi');
    // Substitui o term correspondente pelo term envolto em <b>
    highlightedTitle = highlightedTitle.replace(regExp, (match) => {
      return `<b class="highlight">${match}</b>`;
    });
  });

  return highlightedTitle;
};

if(route.query && route.query.term){
  filterList(route.query.term);
} else {
  data.filteredList = data.items;
}
</script>

<style scoped lang="scss">
  .grid {
    --base-grid-width: 300px;
  }
</style>
