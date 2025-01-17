const fs = require("fs");
var rimraf = require("rimraf");
const common = require ("./common");


const objectContructor = async (dir, fs) => {

  // use this list to add fields from junction tables
  const junctionFields = [
    "authors.team_id.*"
  ]

  const items = await common.getDirectusData("reboot_democracy_blog", junctionFields);

  await items.data.forEach((item) => {
    let i = {};
    i.date = common.toLocalISOString(item.date);
    i.slug = item.slug ? item.slug : item.common.slugify(item.title);
    i.brow = item.brow;
    i.title = item.title;
    i.tagline = item.tagline;
    i.cover_image = item.image ? common.getImage(item.image.id) : '';
    i.audio_version = item.audio_version ? common.getImage(item.audio_version.id) : '';
    i.proof_read_prompt = item.proof_read_prompt;
    i.excerpt = item.excerpt;
    i.content = item.content;
    i.url = item.fullURL;
    i.tags = item.Tags ? item.Tags.map(tag => ({
      tag_slug: common.slugify(tag),
      tag_label: tag
    })) : [];

    // authors
    i.authors = item.authors.length > 0 ? item.authors.map((author) => {
      let person = author.team_id;
      person.picture = person.Headshot ? common.getImage(person.Headshot) : '';

      return {
        name: person.First_Name,
        lastName: person.Last_Name,
        slug: common.slugify(person.First_Name),
        picture: person.picture,
        bioLink: person.Link_to_bio,
        title: person.Title,
      }
    }) : []

    i.featured = item.featured;
    i.array_of_tag_slug = item.Tags ? item.Tags.map(item => common.slugify(item)) : [];

    fs.writeFile(
      dir + "/" + i.slug + ".json",
      JSON.stringify(i),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("WRITING BLOGPOST: ", i.slug + ".json");
  });
}

const getBlogposts = async () => {
  
  const dir = "./content/blogposts";
  if (fs.existsSync(dir)) {
    rimraf(dir, async () => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) {
          console.log(err);
        } else {
          objectContructor(dir, fs);
        }
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dir);
    fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        objectContructor(dir, fs);
      }
    });
  }
}

module.exports = {
  getBlogposts
}
