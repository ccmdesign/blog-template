const fs = require("fs");
var rimraf = require("rimraf");
const common = require ("./common");


const objectContructor = async (dir, fs) => {

  // use this list to add fields from junction tables
  const junctionFields = [
  ]

  const democracyData = await common.getDirectusData("reboot_democracy", undefined, false);
  const democracy = democracyData.data;

  let i = { ...democracy };
  i.slug = common.slugify(democracy.title);

  fs.writeFile(
    dir + "/" + i.slug + ".json",
    JSON.stringify(i),
    function (err, result) {
      if (err) console.log("error", err);
    }
  );
  console.log("WRITING DEMOCRACY: ", i.slug + ".json");
}

const getDemocracy = async () => {
  
  const dir = "./content/democracy";
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
  getDemocracy
}