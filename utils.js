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
