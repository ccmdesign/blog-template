const fs = require("fs");
var rimraf = require("rimraf");
const common = require ("./common");


const objectContructor = async (dir, fs) => {

  // use this list to add fields from junction tables
  const junctionFields = [
  ]

  const modalData = await common.getDirectusData("reboot_democracy_modal");
  const modal = modalData.data;

  let i = { ...modal };
  i.slug = common.slugify(modal.title);

  fs.writeFile(
    dir + "/" + i.slug + ".json",
    JSON.stringify(i),
    function (err, result) {
      if (err) console.log("error", err);
    }
  );
  console.log("WRITING MODAL: ", i.slug + ".json");
}

const getModal = async () => {
  
  const dir = "./content/modal";
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
  getModal
}