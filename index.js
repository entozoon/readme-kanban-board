// https://github.com/kaimallea/node-imgur
let imgur = require('imgur');

let utils = require('./utils');

let readme = `
# Stuff here
- to be ignored

<!---KANBAN
# Doing
- This thing

# Done
- That thing
- Another thing
KANBAN--->

Ignore this too
`;

// I know I can write this better, erggh
let kanban = utils.stripKanban(readme),
  kanbanParsed = utils.parseKanban(kanban);

console.log(kanbanParsed);
