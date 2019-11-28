/**
 * Delete a repository.
 * @param {string} owner
 * @param {string} repo
 */
async function del(owner, repo) {
  const endpoint = `/repos/${owner}/${repo}`
  const { statusCode } = await this._request({
    method: 'DELETE',
    data: {},
    endpoint,
  })
  if (statusCode != 204) {
    throw new Error(`Unexpected status code ${statusCode}.`)
  }
}

/**
 * Create a new repository for the authenticated user.
 * @param {_github.CreateRepository} options Options to create a repository.
 * @param {string} [options.org] The organisation on which to create the repository (if not adding to the user account).
 * @param {string} options.name The name of the repository.
 * @param {string} [options.description] A short description of the repository.
 * @param {string} [options.homepage] A URL with more information about the repository.
 * @param {string} [options.license_template] Choose an [open source license template](https://choosealicense.com/) that best suits your needs, and then use the [license keyword](https://help.github.com/articles/licensing-a-repository/#searching-github-by-license-type) as the license_template string. For example, "mit" or "mpl-2.0".
 * @param {string} [options.gitignore_template] Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".
 * @param {boolean} [options.auto_init=false] Pass `true` to create an initial commit with empty README. Default `false`.
 */
async function create(options) {
  const {
    org,
    name,
    description,
    homepage,
    license_template,
    gitignore_template,
    auto_init = false,
  } = options
  const p = org ? `orgs/${org}` : 'user'
  const endpoint = `/${p}/repos`
  const { body } = await this._request({
    data: {
      name,
      description,
      homepage,
      gitignore_template,
      license_template,
      auto_init,
    },
    endpoint,
  })
  /** @type {_github.Repository} */
  const r = body
  return r
}

/**
 * @param {string} templateOwner
 * @param {string} templateRepo
 * @param {_github.Generate} config Options to generate a repository from a template.
 * @param {string} [config.owner] The organisation on which to create the repository (if not adding to the user account).
 * @param {string} config.name The name of the repository.
 * @param {string} [config.description] A short description of the repository.
 * @param {boolean} [config.private] Whether it is a private repository.
 * @return {_github.Repository}
 */
async function generate(templateOwner, templateRepo, config) {
  const { owner, name, description, private: p } = config
  const endpoint = `/repos/${templateOwner}/${templateRepo}/generate`
  const { body } = await this._request({
    data: {
      owner, name, description, private: p,
    },
    headers: {
      Accept: 'application/vnd.github.baptiste-preview+json',
    },
    method: 'POST',
    endpoint,
  })
  if (body.message == 'Not Found') {
    throw new Error(`Template ${templateOwner}/${templateRepo} not found.`)
  }
  /** @type {_github.Repository} */
  const r = body
  return r
}

/**
 * @param {string} owner
 * @param {string} repo
 * @param {_github.RepoEdit} config Options to edit a repository.
 * @param {string} [config.name] The name of the repository.
 * @param {string} [config.description] A short description of the repository.
 * @param {string} [config.homepage] A URL with more information about the repository.
 * @param {boolean} [config.private=false] Either `true` to make the repository private or `false` to make it public. Creating private repositories requires a paid GitHub account. Default `false`.
 * @param {boolean} [config.has_issues=true] Either `true` to enable issues for this repository or `false` to disable them. Default `true`.
 * @param {boolean} [config.has_projects=true] Either `true` to enable projects for this repository or `false` to disable them. Default `true`.
 * @param {boolean} [config.has_wiki=true] Either `true` to enable the wiki for this repository or `false` to disable it. Default `true`.
 * @param {boolean} [config.is_template=false] Either `true` to make this repo available as a template repository or `false` to prevent it. Default `false`.
 * @param {string} [config.default_branch] Updates the default branch for this repository.
 * @param {boolean} [config.allow_squash_merge=true] Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging. Default `true`.
 * @param {boolean} [config.allow_merge_commit=true] Either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits. Default `true`.
 * @param {boolean} [config.allow_rebase_merge=true] Either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging. Default `true`.
 * @param {boolean} [config.archived=false] `true` to archive this repository. Note: You cannot unarchive repositories through the API. Default `false`.
 */
async function edit(owner, repo, config) {
  const endpoint = `/repos/${owner}/${repo}`
  const { body } = await this._request({
    data: config,
    headers: config.is_template ? {
      Accept: 'application/vnd.github.baptiste-preview+json',
    } : {},
    method: 'PATCH',
    endpoint,
  })
  if (body.message == 'Not Found') {
    throw new Error(`Template ${owner}/${repo} not found.`)
  }
  /** @type {_github.Repository} */
  const r = body
  return r
}

export default {
  create,
  delete: del,
  generate,
  edit,
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types').Repository} _github.Repository
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types').RepoEdit} _github.RepoEdit
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types').Generate} _github.Generate
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types').CreateRepository} _github.CreateRepository
 */