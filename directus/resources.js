const fs = require("fs");
var rimraf = require("rimraf");
const common = require ("./common");


const objectContructor = async (dir, fs) => {

  // use this list to add fields from junction tables
  const junctionFields = [
  ]

  const resources = await common.getDirectusData("reboot_democracy_resources", undefined, false);

  if(!Object.keys(resources).length) {
    console.log("No resources data found.");
    return;
  }

  await resources.data.forEach((item) => {
    let i = {};
    i.date = item.date ? common.toLocalISOString(item.date) : '';
    i.slug = common.slugify(item.title);
    i.title = item.title;
    i.thumbnail = item.thumbnail ? common.getImage(item.thumbnail.id) : '';
    i.description = item.description;
    i.type = item.type;
    i.url = item.link;
    i.parter = item.partner;
    i.stage = item.stage;

    fs.writeFile(
      dir + "/" + i.slug + ".json",
      JSON.stringify(i),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("WRITING RESOURCES: ", i.slug + ".json");
  });
}

const getResources = async () => {
  
  const dir = "./content/resources";
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
  getResources
}