const fs = require("fs");
var rimraf = require("rimraf");
const common = require ("./common");


const objectContructor = async (dir, fs) => {

  // use this list to add fields from junction tables
  const junctionFields = [
  ]

  const team = await common.getDirectusData("Reboot_Democracy_team", undefined, false);


  await team.data.forEach((item) => {
    let i = {};
    i.slug = common.slugify(item.First_Name);
    i.name = item.First_Name + " " + item.Last_Name;
    i.link_to_bio = item.Link_to_bio;
    i.image = item.Headshot ? common.getImage(item.Headshot.id) : '';

    fs.writeFile(
      dir + "/" + i.slug + ".json",
      JSON.stringify(i),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("WRITING TEAM: ", i.slug + ".json");
  });
}

const getTeam = async () => {
  
  const dir = "./content/team";
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
  getTeam
}