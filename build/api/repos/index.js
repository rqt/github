let create = require('./create'); if (create && create.__esModule) create = create.default;
let del = require('./delete'); if (del && del.__esModule) del = del.default;

const repos = {
  create,
  delete: del,
}

module.exports=repos
//# sourceMappingURL=index.js.map