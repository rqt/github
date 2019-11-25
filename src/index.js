import request from './lib'
import repos from './api/repos'
import activity from './api/activity'

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

export async function starRepository(token, name, org) {
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

export async function deleteRepository(token, name, org) {
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
