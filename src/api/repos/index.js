import create from './create'
import del from './delete'

/**
 * @param {string} templateOwner
 * @param {string} templateRepo
 * @param {Generate} config
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
  /** @type {Repository} */
  const r = body
  return r
}

/**
 * @param {string} owner
 * @param {string} repo
 * @param {RepoEdit} config
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
  /** @type {Repository} */
  const r = body
  return r
}

const repos = {
  create,
  delete: del,
  generate,
  edit,
}

export default repos

/* typal types/api/repos/edit.xml */
/**
 * @typedef {Object} RepoEdit Options to edit a repository.
 * @prop {string} [name] The name of the repository.
 * @prop {string} [description] A short description of the repository.
 * @prop {string} [homepage] A URL with more information about the repository.
 * @prop {boolean} [private=false] Either `true` to make the repository private or `false` to make it public. Creating private repositories requires a paid GitHub account. Default `false`.
 * @prop {boolean} [has_issues=true] Either `true` to enable issues for this repository or `false` to disable them. Default `true`.
 * @prop {boolean} [has_projects=true] Either `true` to enable projects for this repository or `false` to disable them. Default `true`.
 * @prop {boolean} [has_wiki=true] Either `true` to enable the wiki for this repository or `false` to disable it. Default `true`.
 * @prop {boolean} [is_template=false] Either `true` to make this repo available as a template repository or `false` to prevent it. Default `false`.
 * @prop {string} [default_branch] Updates the default branch for this repository.
 * @prop {boolean} [allow_squash_merge=true] Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging. Default `true`.
 * @prop {boolean} [allow_merge_commit=true] Either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits. Default `true`.
 * @prop {boolean} [allow_rebase_merge=true] Either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging. Default `true`.
 * @prop {boolean} [archived=false] `true` to archive this repository. Note: You cannot unarchive repositories through the API. Default `false`.
 */

/* typal types/api/repos/generate.xml */
/**
 * @typedef {Object} Generate Options to generate a repository from a template.
 * @prop {string} [owner] The organisation on which to create the repository (if not adding to the user account).
 * @prop {string} name The name of the repository.
 * @prop {string} [description] A short description of the repository.
 * @prop {boolean} [private] Whether it is a private repository.
 */

/* typal types/api/repos/Repository.xml */
/**
 * @typedef {Object} Repository
 * @prop {number} id 1296269
 * @prop {string} node_id MDEwOlJlcG9zaXRvcnkxMjk2MjY5
 * @prop {string} name Hello-World
 * @prop {string} full_name octocat/Hello-World
 * @prop {boolean} private false
 * @prop {string} html_url https://github.com/octocat/Hello-World
 * @prop {string} description This your first repo!
 * @prop {boolean} fork true
 * @prop {string} url https://api.github.com/repos/octocat/Hello-World
 * @prop {string} archive_url http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}
 * @prop {string} assignees_url http://api.github.com/repos/octocat/Hello-World/assignees{/user}
 * @prop {string} blobs_url http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}
 * @prop {string} branches_url http://api.github.com/repos/octocat/Hello-World/branches{/branch}
 * @prop {string} collaborators_url http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}
 * @prop {string} comments_url http://api.github.com/repos/octocat/Hello-World/comments{/number}
 * @prop {string} commits_url http://api.github.com/repos/octocat/Hello-World/commits{/sha}
 * @prop {string} compare_url http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}
 * @prop {string} contents_url http://api.github.com/repos/octocat/Hello-World/contents/{+path}
 * @prop {string} contributors_url http://api.github.com/repos/octocat/Hello-World/contributors
 * @prop {string} deployments_url http://api.github.com/repos/octocat/Hello-World/deployments
 * @prop {string} downloads_url http://api.github.com/repos/octocat/Hello-World/downloads
 * @prop {string} events_url http://api.github.com/repos/octocat/Hello-World/events
 * @prop {string} forks_url http://api.github.com/repos/octocat/Hello-World/forks
 * @prop {string} git_commits_url http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}
 * @prop {string} git_refs_url http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}
 * @prop {string} git_tags_url http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}
 * @prop {string} git_url git:github.com/octocat/Hello-World.git
 * @prop {string} issue_comment_url http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}
 * @prop {string} issue_events_url http://api.github.com/repos/octocat/Hello-World/issues/events{/number}
 * @prop {string} issues_url http://api.github.com/repos/octocat/Hello-World/issues{/number}
 * @prop {string} keys_url http://api.github.com/repos/octocat/Hello-World/keys{/key_id}
 * @prop {string} labels_url http://api.github.com/repos/octocat/Hello-World/labels{/name}
 * @prop {string} languages_url http://api.github.com/repos/octocat/Hello-World/languages
 * @prop {string} merges_url http://api.github.com/repos/octocat/Hello-World/merges
 * @prop {string} milestones_url http://api.github.com/repos/octocat/Hello-World/milestones{/number}
 * @prop {string} notifications_url http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}
 * @prop {string} pulls_url http://api.github.com/repos/octocat/Hello-World/pulls{/number}
 * @prop {string} releases_url http://api.github.com/repos/octocat/Hello-World/releases{/id}
 * @prop {string} ssh_url git&#064;github.com:octocat/Hello-World.git
 * @prop {string} stargazers_url http://api.github.com/repos/octocat/Hello-World/stargazers
 * @prop {string} statuses_url http://api.github.com/repos/octocat/Hello-World/statuses/{sha}
 * @prop {string} subscribers_url http://api.github.com/repos/octocat/Hello-World/subscribers
 * @prop {string} subscription_url http://api.github.com/repos/octocat/Hello-World/subscription
 * @prop {string} tags_url http://api.github.com/repos/octocat/Hello-World/tags
 * @prop {string} teams_url http://api.github.com/repos/octocat/Hello-World/teams
 * @prop {string} trees_url http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}
 * @prop {string} clone_url https://github.com/octocat/Hello-World.git
 * @prop {string} mirror_url git:git.example.com/octocat/Hello-World
 * @prop {string} hooks_url http://api.github.com/repos/octocat/Hello-World/hooks
 * @prop {string} svn_url https://svn.github.com/octocat/Hello-World
 * @prop {string} homepage https://github.com
 * @prop {number} forks_count 9
 * @prop {number} stargazers_count 80
 * @prop {number} watchers_count 80
 * @prop {number} size 108
 * @prop {string} default_branch master
 * @prop {number} open_issues_count 0
 * @prop {boolean} has_issues true
 * @prop {boolean} has_projects true
 * @prop {boolean} has_wiki true
 * @prop {boolean} has_pages false
 * @prop {boolean} has_downloads true
 * @prop {boolean} archived false
 * @prop {string} pushed_at 2011-01-26T19:06:43Z
 * @prop {string} created_at 2011-01-26T19:01:12Z
 * @prop {string} updated_at 2011-01-26T19:14:43Z
 * @prop {boolean} allow_rebase_merge true
 * @prop {boolean} allow_squash_merge true
 * @prop {boolean} allow_merge_commit true
 * @prop {number} subscribers_count 42
 * @prop {number} network_count 0
 * @prop {string[]} topics ["octocat", "atom", "electron", "API"]
 * @prop {{admin: boolean, push: boolean, pull: boolean}} permissions
 * @prop {string} language
 * @prop {Owner} owner
 */
