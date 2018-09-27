let request = require('./lib'); if (request && request.__esModule) request = request.default;
let repos = require('./api/repos'); if (repos && repos.__esModule) repos = repos.default;
let activity = require('./api/activity'); if (activity && activity.__esModule) activity = activity.default;

const bind = (scope, instance) => {
  return Object.keys(scope).reduce((acc, k) => {
    return {
      ...acc,
      [k]: scope[k].bind(instance),
    }
  }, {})
}

/**
 * A GitHub instance.
 */
               class GitHub {
  /**
   * Creates a new instance of the API with the token.
   * @param {string} token The access token used for requests.
   */
  constructor(token) {
    this._token = token
    /** @type {repos} */
    this.repos = bind(repos, this)
    /** @type {activity} */
    this.activity = bind(activity, this)
  }
  async _request(opts = {}) {
    const res = await request({
      token: this._token,
      ...opts,
    })
    return res
  }
}

       async function starRepository(token, name, org) {
  const n = `${org}/${name}`
  const u = `user/starred/${n}`
  const { headers } = await request({
    token,
    u,
    method: 'PUT',
    data: {},
  })
  if (headers.status != '204 No Content') {
    throw new Error(`Could not star the ${n} repository`)
  }
}

       async function deleteRepository(token, name, org) {
  const n = `${org}/${name}`
  const u = `repos/${n}`
  const { headers, body } = await request({
    token,
    u,
    method: 'DELETE',
  })
  if (headers.status != '204 No Content') {
    throw new Error(`Could not delete ${n}: ${body.message}.`)
  }
}

/* documentary types/index.xml */
/**
 * @typedef {Object} CreateRepository Options to create a repository.
 * @prop {string} token The access token.
 * @prop {string} [org] The organisation on which to create the repository (if not adding to the user account).
 * @prop {string} name The name of the repository.
 * @prop {string} [description] A short description of the repository.
 * @prop {string} [homepage] A URL with more information about the repository.
 * @prop {string} [license_template] Choose an [open source license template](https://choosealicense.com/) that best suits your needs, and then use the [license keyword](https://help.github.com/articles/licensing-a-repository/#searching-github-by-license-type) as the license_template string. For example, "mit" or "mpl-2.0".
 * @prop {string} [gitignore_template] Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".
 * @prop {boolean} [auto_init=false] Pass `true` to create an initial commit with empty README. Default `false`.
 */


module.exports = GitHub
module.exports.starRepository = starRepository
module.exports.deleteRepository = deleteRepository
//# sourceMappingURL=index.js.map