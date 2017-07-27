let imgur = require('imgur'); // https://github.com/kaimallea/node-imgur
let webshot = require('webshot');
let fs = require('fs');
let utils = require('../utils/utils');

let debugging = false;

let pathRoot = './',
  pathModule = debugging ? './' : 'node_modules/readme-kanban-board/',
  pathGenImage = pathRoot + '../gen/kanban.png',
  pathReadme = debugging ? pathModule + 'test/README.md' : pathRoot + 'README.md';

console.log(' -- Readme Kanban Board --');

// fs.readFile function with a legit Promise wrapper
const getFile = (fileName, type) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (error, data) => {
      return error ? reject(error) : resolve(data);
    });
  });

// Get all the local files
let promisedCSS = getFile(pathModule + 'css/style.css', 'utf8');
let promisedMD = getFile(pathReadme, 'utf8');
console.log(pathReadme);

// When they're loaded, crack on with parsing everything
Promise.all([promisedCSS, promisedMD])
  .catch(error => console.log('Error (getFile): ', error))
  .then(values => {
    let css = values[0];
    let md = values[1];

    // Grab the <!---KANBAN KANBAN---> chunk
    let kanban = utils.stripKanban(md);

    if (!kanban) {
      console.log(
        "Oops, I couldn't find a README.md file in the root of your project,\nthat also contains a <!---KANBAN KANBAN---> section. Please read:\nhttps://github.com/entozoon/readme-kanban-board#kanban-markdown-formatting"
      );
      return;
    }

    // Parse the heck out of it
    let kanbanParsed = utils.parseKanban(kanban);

    // Create HTML
    let kanbanHtml = utils.kanbanToHTML(kanbanParsed);

    // Create a PhantomJS simulation of the HTML and an image therein.
    // We have to physically save the file to disk, as webshot doesn't handle it another way (despite docs)
    let renderStream = webshot(
      kanbanHtml,
      pathGenImage, // image created locally
      {
        siteType: 'html',
        customCSS: css
      },
      err => {
        if (debugging) {
          console.log('Stopping for debugging');
          return;
        }
        if (err) {
          console.log(err);
          return;
        }
        // Sweet, so the image was created. Let's sploodge it up to imgur
        fs.readFile(pathGenImage, function read(err, data) {
          console.log('Uploading to imgur..');
          imgur
            .uploadFile(pathGenImage)
            .then(json => {
              console.log(json.data.link);
            })
            .catch(err => {
              console.error(err.message);
            });
        });
      }
    );
  });
