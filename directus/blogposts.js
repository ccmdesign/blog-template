const fs = require("fs");
var rimraf = require("rimraf");
const common = require ("./common");


const objectContructor = async (dir, fs) => {

  // use this list to add fields from junction tables
  const junctionFields = [
  ]

  const items = await common.getDirectusData("reboot_democracy_blog");

  await items.data.forEach((item) => {
    let i = {};
    i.date = common.toLocalISOString(item.date);
    i.slug = item.slug ? item.slug : item.common.slugify(item.title);
    i.title = item.title;
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

    i.array_of_tag_slug = item.Tags ? item.Tags.map(item => common.slugify(item)) : [];

    //USED FOR TEST, REMOVE AFTER
    i.featured = Math.ceil(Math.random() * 11) > 5

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