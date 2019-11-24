const create = require('./create');
const del = require('./delete');

const repos = {
  create,
  delete: del,
}

module.exports=repos