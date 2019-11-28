/* typal types/api/pages/index.xml */
/** @const */
var _github = {}
/**
 * Options to enable pages.
 * @typedef {{ branch: (string|undefined), path: (string|undefined) }}
 */
_github.EnablePages
/**
 * The enabled page object.
 * @typedef {{ url: string, status: string, cname: string, custom_404: boolean, html_url: string, source: { branch: string, directory: string } }}
 */
_github.Page

/* typal types/api/repos/create.xml */
/**
 * Options to create a repository.
 * @typedef {{ org: (string|undefined), name: string, description: (string|undefined), homepage: (string|undefined), license_template: (string|undefined), gitignore_template: (string|undefined), auto_init: (boolean|undefined) }}
 */
_github.CreateRepository

/* typal types/api/repos/edit.xml */
/**
 * Options to edit a repository.
 * @typedef {{ name: (string|undefined), description: (string|undefined), homepage: (string|undefined), private: (boolean|undefined), has_issues: (boolean|undefined), has_projects: (boolean|undefined), has_wiki: (boolean|undefined), is_template: (boolean|undefined), default_branch: (string|undefined), allow_squash_merge: (boolean|undefined), allow_merge_commit: (boolean|undefined), allow_rebase_merge: (boolean|undefined), archived: (boolean|undefined) }}
 */
_github.RepoEdit

/* typal types/api/repos/generate.xml */
/**
 * Options to generate a repository from a template.
 * @typedef {{ owner: (string|undefined), name: string, description: (string|undefined), private: (boolean|undefined) }}
 */
_github.Generate

/* typal types/api/repos/Repository.xml */
/**
 * @typedef {{ id: number, node_id: string, name: string, full_name: string, private: boolean, html_url: string, description: string, fork: boolean, url: string, archive_url: string, assignees_url: string, blobs_url: string, branches_url: string, collaborators_url: string, comments_url: string, commits_url: string, compare_url: string, contents_url: string, contributors_url: string, deployments_url: string, downloads_url: string, events_url: string, forks_url: string, git_commits_url: string, git_refs_url: string, git_tags_url: string, git_url: string, issue_comment_url: string, issue_events_url: string, issues_url: string, keys_url: string, labels_url: string, languages_url: string, merges_url: string, milestones_url: string, notifications_url: string, pulls_url: string, releases_url: string, ssh_url: string, stargazers_url: string, statuses_url: string, subscribers_url: string, subscription_url: string, tags_url: string, teams_url: string, trees_url: string, clone_url: string, mirror_url: string, hooks_url: string, svn_url: string, homepage: string, forks_count: number, stargazers_count: number, watchers_count: number, size: number, default_branch: string, open_issues_count: number, has_issues: boolean, has_projects: boolean, has_wiki: boolean, has_pages: boolean, has_downloads: boolean, archived: boolean, pushed_at: string, created_at: string, updated_at: string, allow_rebase_merge: boolean, allow_squash_merge: boolean, allow_merge_commit: boolean, subscribers_count: number, network_count: number, topics: string[], permissions: {admin: boolean, push: boolean, pull: boolean}, language: string, owner: Owner }}
 */
_github.Repository

/* typal types/api/Owner.xml */
