let webshot = require("webshot");
let fs = require("fs");
let utils = require("../utils/utils");

console.log(" -- Readme Kanban Board --");

// During dev of the module, enable debugging by running with
//   npm run dev
// But to run it in a way that generates the 'Example' in the module readme itself, run
//   npm run build
//
let debugging = false,
  useModuleReadme = false;

// Enable debugging mode if run with `npm run dev`, i.e. `node bin/readme-kanban-board debugging`
process.argv.forEach(function(value, index, array) {
  if (value == "debugging") debugging = true;
  if (value == "useModuleReadme") useModuleReadme = true;
});

let pathRoot = "./",
  pathModule = debugging ? "./" : "node_modules/readme-kanban-board/",
  pathGenImage = pathRoot + "kanban.png",
  pathReadme =
    debugging && !useModuleReadme
      ? pathModule + "test/README.md"
      : pathRoot + "README.md";

// fs.readFile function with a legit Promise wrapper
const getFile = (fileName, type) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (error, data) => {
      return error ? reject(error) : resolve(data);
    });
  });

// Get all the local files
let promisedCSS = getFile(pathModule + "css/style.css", "utf8");
let promisedMD = getFile(pathReadme, "utf8");
console.log(pathReadme);

// When they're loaded, crack on with parsing everything
Promise.all([promisedCSS, promisedMD])
  .catch(error => console.log("Error (getFile): ", error))
  .then(values => {
    let css = values[0];
    let md = values[1];

    // Grab the <!---KANBAN KANBAN---> chunk
    let kanban = utils.stripKanban(md);

    console.log(kanban);

    if (!kanban) {
      console.log(
        "Oops, I couldn't find a README.md file in the root of your project,\nthat also contains a <!---KANBAN KANBAN---> section. Please read:\nhttps://github.com/entozoon/readme-kanban-board"
      );
      return;
    }

    // Parse the heck out of it
    let kanbanParsed = utils.parseKanban(kanban);

    if (!Object.keys(kanbanParsed).length) {
      console.log(
        "Oops, something went wrong trying to parse your kanban markdown!"
      );
      return;
    }

    // Create HTML
    let kanbanHtml = utils.kanbanToHTML(kanbanParsed);

    // Create a PhantomJS simulation of the HTML and an image therein.
    // We have to physically save the file to disk, as webshot doesn't handle it another way (despite docs)
    let renderStream = webshot(
      kanbanHtml,
      pathGenImage, // image created locally
      {
        siteType: "html",
        customCSS: css,
        screenSize: {
          width: 888,
          height: 10 // Overflows over this! woop!
        },
        shotSize: {
          width: "all",
          height: "all"
        },
        quality: 100,
        streamType: "png"
      },
      err => {
        if (debugging) {
          //console.log('Stopping for debugging');
          //return;
        }
        if (err) {
          console.log(err);
          return;
        }
        // Sweet, so the image was created, let's bosh a relativel link into the README.md
        md = utils.addImageToMarkdown(pathGenImage, md);
        fs.writeFile(pathReadme, md, err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("README.md updated with your kanban image!");
        });
      }
    );
  });
