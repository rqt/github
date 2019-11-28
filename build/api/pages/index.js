/**
 * Enable a Pages site.
 * @param {string} owner
 * @param {string} repo
 * @param {EnablePages} config
 */
async function enable(owner, repo, config = {}) {
  const { branch = 'master', path = '/docs' } = config
  const endpoint = `/repos/${owner}/${repo}/pages`
  const { body } = await this._request({
    data: {
      source: {
        branch, path,
      },
    },
    headers: {
      Accept: 'application/vnd.github.switcheroo-preview+json',
    },
    method: 'POST',
    endpoint,
  })
  if (body.message == 'Not Found') {
    throw new Error(`Repo ${owner}/${repo} not found.`)
  }
  /** @type {Page} */
  const r = body
  return r
}

module.exports={
  enable,
}

/* typal types/api/pages/index.xml */
/**
 * @typedef {Object} EnablePages Options to enable pages.
 * @prop {string} [branch="master"] The branch, either `master` or `gh-pages`. Default `master`.
 * @prop {string} [path="/docs"] When setting branch to master, this can be set to `/docs`,
 * otherwise it has to be `/`. Default `/docs`.
 * @typedef {Object} Page The enabled page object.
 * @prop {string} url `https://api.github.com/repos/github/developer.github.com/pages`
 * @prop {string} status `built`
 * @prop {string} cname `developer.github.com`
 * @prop {boolean} custom_404 `false`
 * @prop {string} html_url `https://developer.github.com`
 * @prop {{ branch: string, directory: string }} source The source.
 * ```json
 * "source": {
 *   "branch": "master",
 *   "directory": "/"
 * }
 * ```
 */
