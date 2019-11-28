import request from './lib'
import repos from './api/repos'
import activity from './api/activity'
import pages from './api/pages'
import user from './api/user'

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
export default class GitHub {
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