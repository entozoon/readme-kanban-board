// https://github.com/kaimallea/node-imgur
let imgur = require('imgur');
let webshot = require('webshot');
let fs = require('fs');
let utils = require('./utils');

// fs.readFile function with a legit Promise wrapper
const getFile = (fileName, type) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (error, data) => {
      return error ? reject(error) : resolve(data);
    });
  });

let promisedCSS = getFile('./style.css', 'utf8');
let promisedMD = getFile('./test.md', 'utf8');

Promise.all([promisedCSS, promisedMD])
  .catch(error => console.log('Error (getFile): ', error))
  .then(values => {
    let css = values[0];
    let md = values[1];

    // I know I can write this better, erggh
    let kanban = utils.stripKanban(md),
      kanbanParsed = utils.parseKanban(kanban);

    console.log(kanbanParsed);

    let kanbanHtml = utils.kanbanToHTML(kanbanParsed);

    console.log(kanbanHtml);

    // Create a PhantomJS simulation of the html and an image therein.
    // We have to physically save the file to disk, as webshot doesn't handle it another way (despite docs)
    let renderStream = webshot(
      kanbanHtml,
      './kanban.png',
      {
        siteType: 'html',
        customCSS: css
      },
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
        fs.readFile('./kanban.png', function read(err, data) {
          //console.log(data);
          console.log('Uploading to imgur..');
          imgur
            .uploadFile('./kanban.png')
            .then(function(json) {
              console.log(json.data.link);
            })
            .catch(function(err) {
              console.error(err.message);
            });
        });
      }
    );
  });
