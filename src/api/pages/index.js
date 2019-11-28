/**
 * Enable a Pages site.
 * @param {string} owner
 * @param {string} repo
 * @param {_github.EnablePages} [config] Options to enable pages.
 * @param {string} [config.branch="master"] The branch, either `master` or `gh-pages`. Default `master`.
 * @param {string} [config.path="/docs"] When setting branch to master, this can be set to `/docs`,
 * otherwise it has to be `/`. Default `/docs`.
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
  /** @type {_github.Page} */
  const r = body
  return r
}

export default {
  enable,
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types').EnablePages} _github.EnablePages
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types').Page} _github.Page
 */