// Strip out the kanban stuff
exports.stripKanban = string => {
  let a = '<!---KANBAN',
    b = 'KANBAN--->',
    start = string.indexOf(a),
    end = string.indexOf(b);
  if (start >= 0 && end > 0) {
    return string.slice(start + a.length, end).trim();
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

const lineToObject = line => {
  let text = line.slice(1).trim();
  return {
    text: text,
    type: whatTypeDis(line)
  };
};

const emptyItems = item => item.text;

exports.parseKanban = string => {
  return string.split('\n').map(lineToObject).filter(emptyItems);
};
