/**
 * Create a new repository for the authenticated user.
 * @param {CreateRepository} options Options to create a repository.
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
  /** @type {Repository} */
  const r = body
  return r
}

module.exports=create

/* documentary types/api/repos/create.xml */
/**
 * @typedef {Object} CreateRepository Options to create a repository.
 * @prop {string} [org] The organisation on which to create the repository (if not adding to the user account).
 * @prop {string} name The name of the repository.
 * @prop {string} [description] A short description of the repository.
 * @prop {string} [homepage] A URL with more information about the repository.
 * @prop {string} [license_template] Choose an [open source license template](https://choosealicense.com/) that best suits your needs, and then use the [license keyword](https://help.github.com/articles/licensing-a-repository/#searching-github-by-license-type) as the license_template string. For example, "mit" or "mpl-2.0".
 * @prop {string} [gitignore_template] Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".
 * @prop {boolean} [auto_init=false] Pass `true` to create an initial commit with empty README. Default `false`.
 */


/* documentary types/Owner.xml */
/**
 * @typedef {Object} Owner
 * @prop {string} login octocat
 * @prop {number} id 1
 * @prop {string} node_id MDQ6VXNlcjE=
 * @prop {string} avatar_url https://github.com/images/error/octocat_happy.gif
 * @prop {string} gravatar_id </prop>
    <prop string name="url">https://api.github.com/users/octocat
 * @prop {string} html_url https://github.com/octocat
 * @prop {string} followers_url https://api.github.com/users/octocat/followers
 * @prop {string} following_url https://api.github.com/users/octocat/following{/other_user}
 * @prop {string} gists_url https://api.github.com/users/octocat/gists{/gist_id}
 * @prop {string} starred_url https://api.github.com/users/octocat/starred{/owner}{/repo}
 * @prop {string} subscriptions_url https://api.github.com/users/octocat/subscriptions
 * @prop {string} organizations_url https://api.github.com/users/octocat/orgs
 * @prop {string} repos_url https://api.github.com/users/octocat/repos
 * @prop {string} events_url https://api.github.com/users/octocat/events{/privacy}
 * @prop {string} received_events_url https://api.github.com/users/octocat/received_events
 * @prop {string} type User
 * @prop {boolean} site_admin false
 */

/* documentary types/api/repos/Repository.xml */
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

//# sourceMappingURL=create.js.map