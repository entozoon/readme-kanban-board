// Strip out the kanban stuff
let alpha = '<!---KANBAN',
  omega = 'KANBAN--->';

exports.stripKanban = string => {
  (start = string.indexOf(alpha)), (end = string.indexOf(omega));
  if (start >= 0 && end > 0) {
    return string.slice(start + alpha.length, end).trim();
  }
  return false;
};

const whatTypeDis = string => {
  switch (string.slice(0, 1)) {
    case '-':
      return 'item';
    case '#':
      return 'header';
  }
  return false;
};

let section = 0,
  lastHeader; // This isn't smart either (not a pure function) but it'll do
const lineToObject = line => {
  let text = line.slice(1).trim(),
    type = whatTypeDis(line);
  let object = {
    text: text,
    type: type
  };
  if (type == 'header') {
    lastHeader = text;
    section++;
  }
  if (section) {
    object.section = section;
    object.lastHeader = lastHeader;
  }
  return object;
};

const emptyItems = item => item.text;

// One day I'll look back at this code and laugh, but not today
const groupItems = items => {
  //let groups = [];
  let groups = {};
  items.forEach(item => {
    //if (!groups[item.section]) groups[item.section] = [];
    //groups[item.section].push(item);
    if (!groups[item.lastHeader]) {
      groups[item.lastHeader] = [];
    }
    groups[item.lastHeader].push(item);
  });
  return groups;
};

exports.parseKanban = string => {
  let parse = string.split('\n').map(lineToObject).filter(emptyItems),
    items = parse.filter(item => item.type === 'item'),
    groups = groupItems(items);
  return groups;
  //let headers = parse.filter(item => item.type === 'header');
  //return headers;
};

// It's almost like I'm writing code for the sake of writing code at this point
exports.kanbanToHTML = kanban => {
  let html = '';
  for (let key in kanban) {
    html += '<h3>' + key + '</h3>';
    html += '<ul>';
    kanban[key].forEach(item => {
      html += '<li>' + item.text + '</li>';
    });
    html += '</ul>';
  }
  return html;
};

exports.addImageToMarkdown = (url, md) => {
  let imageLink = '![created by readme-kanban-board](' + url + ')';
  let jam = md.split('\n');
  // Replace an existing image link, or add
  console.log(jam);
  jam = jam
    .map((line, i) => {
      if (line.substring(0, alpha.length) == alpha) {
        // Ergh, this is so dodgy..
        if (jam[i - 1].substring(0, 2) == '![') {
          jam[i - 1] = imageLink;
        } else {
          line = imageLink + '\n' + line;
        }
      }
      return line;
    })
    .join('\n');
  console.log(jam);
  return jam;
};
