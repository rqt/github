const request = require('./lib');
const repos = require('./api/repos');
const activity = require('./api/activity');
const pages = require('./api/pages');
const user = require('./api/user');

const proxy = (scope, instance) => {
  const p = new Proxy(scope, {
    get(target, key) {
      const v = target[key]
      if (typeof v == 'function') {
        return v.bind(instance)
      }
      return v
    },
  })
  return p
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
    this.repos = proxy(repos, this)
    /** @type {activity} */
    this.activity = proxy(activity, this)
    /** @type {pages} */
    this.pages = proxy(pages, this)
    /** @type {user} */
    this.user = proxy(user, this)
  }
  /**
   * @param {Object} opts
   * @param {string} opts.endpoint Where to send the request.
   * @param {Object} [opts.data] The data to send.
   * @param {string} [opts.method] The HTTP method, such as GET or POST
   * @param {Object} [opts.headers] Additional Headers.
   */
  async _request(opts = {}) {
    const res = await request({
      token: this._token,
      ...opts,
    })
    return res
  }
}

module.exports = GitHub