# @rqt/github

[![npm version](https://badge.fury.io/js/%40rqt%2Fgithub.svg)](https://npmjs.org/package/@rqt/github)

`@rqt/github` is a GitHub API implementation in Node.js.

```sh
yarn add -E @rqt/github
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`constructor(token?: string): GitHub`](#constructortoken-string-github)
- [Repositories](#repositories)
  * [`async create(options: CreateRepository): Repository`](#async-createoptions-createrepository-repository)
    * [`CreateRepository`](#type-createrepository)
    * [`Repository`](#type-repository)
  * [`async delete(owner: string, name: string)`](#async-deleteowner-stringname-string-void)
- [Types](#types)
  * [`Owner`](#type-owner)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import GitHub from '@rqt/github'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `constructor(`<br/>&nbsp;&nbsp;`token?: string,`<br/>`): GitHub`

Create a new instance of a GitHub API client. If the token is given, it will be used for methods that require it.

```js
/* yarn example/ */
import GitHub from '@rqt/github'
import bosom from 'bosom'

(async () => {
  try {
    const token = await bosom('.token.json')
    const name = 'github-example'
    const org = 'rqt'

    const github = new GitHub(token)
    const repo = await github.repos.create({
      name,
      org,
      homepage: 'https://rqt.biz',
      license_template: 'mit',
      description: 'An example repository.',
      auto_init: true,
      gitignore_template: 'Node',
    })
    console.log('Created a repository at: %s', repo.html_url)

    await github.activity.star(org, name)
    console.log('Starred a repository')
    await github.repos.delete(org, name)
    console.log('Deleted a repository')
  } catch ({ message }) {
    console.log(message)
  }
})()
```
```
Created a repository at: https://github.com/rqt/github-example
Starred a repository
Deleted a repository
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Repositories

These methods allow to work with repositories.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="15"></a></p>

### `async create(`<br/>&nbsp;&nbsp;`options: CreateRepository,`<br/>`): Repository`

Create a new repository.

__<a name="type-createrepository">`CreateRepository`</a>__: Options to create a repository.

|        Name        |   Type    |                                                                                                                                           Description                                                                                                                                            | Default |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| org                | _string_  | The organisation on which to create the repository (if not adding to the user account).                                                                                                                                                                                                          | -       |
| __name*__          | _string_  | The name of the repository.                                                                                                                                                                                                                                                                      | -       |
| description        | _string_  | A short description of the repository.                                                                                                                                                                                                                                                           | -       |
| homepage           | _string_  | A URL with more information about the repository.                                                                                                                                                                                                                                                | -       |
| license_template   | _string_  | Choose an [open source license template](https://choosealicense.com/) that best suits your needs, and then use the [license keyword](https://help.github.com/articles/licensing-a-repository/#searching-github-by-license-type) as the license_template string. For example, "mit" or "mpl-2.0". | -       |
| gitignore_template | _string_  | Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".                                                                                                                                                           | -       |
| auto_init          | _boolean_ | Pass `true` to create an initial commit with empty README.                                                                                                                                                                                                                                       | `false` |

---

__<a name="type-repository">`Repository`</a>__

|          Name           |                       Type                       |                                       Description                                       |
| ----------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| __id*__                 | _number_                                         | 1296269                                                                                 |
| __node_id*__            | _string_                                         | MDEwOlJlcG9zaXRvcnkxMjk2MjY5                                                            |
| __name*__               | _string_                                         | Hello-World                                                                             |
| __full_name*__          | _string_                                         | octocat/Hello-World                                                                     |
| __private*__            | _boolean_                                        | false                                                                                   |
| __html_url*__           | _string_                                         | https://github.com/octocat/Hello-World                                                  |
| __description*__        | _string_                                         | This your first repo!                                                                   |
| __fork*__               | _boolean_                                        | true                                                                                    |
| __url*__                | _string_                                         | https://api.github.com/repos/octocat/Hello-World                                        |
| __archive_url*__        | _string_                                         | http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}                  |
| __assignees_url*__      | _string_                                         | http://api.github.com/repos/octocat/Hello-World/assignees{/user}                        |
| __blobs_url*__          | _string_                                         | http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}                         |
| __branches_url*__       | _string_                                         | http://api.github.com/repos/octocat/Hello-World/branches{/branch}                       |
| __collaborators_url*__  | _string_                                         | http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}            |
| __comments_url*__       | _string_                                         | http://api.github.com/repos/octocat/Hello-World/comments{/number}                       |
| __commits_url*__        | _string_                                         | http://api.github.com/repos/octocat/Hello-World/commits{/sha}                           |
| __compare_url*__        | _string_                                         | http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}                 |
| __contents_url*__       | _string_                                         | http://api.github.com/repos/octocat/Hello-World/contents/{+path}                        |
| __contributors_url*__   | _string_                                         | http://api.github.com/repos/octocat/Hello-World/contributors                            |
| __deployments_url*__    | _string_                                         | http://api.github.com/repos/octocat/Hello-World/deployments                             |
| __downloads_url*__      | _string_                                         | http://api.github.com/repos/octocat/Hello-World/downloads                               |
| __events_url*__         | _string_                                         | http://api.github.com/repos/octocat/Hello-World/events                                  |
| __forks_url*__          | _string_                                         | http://api.github.com/repos/octocat/Hello-World/forks                                   |
| __git_commits_url*__    | _string_                                         | http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}                       |
| __git_refs_url*__       | _string_                                         | http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}                          |
| __git_tags_url*__       | _string_                                         | http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}                          |
| __git_url*__            | _string_                                         | git:github.com/octocat/Hello-World.git                                                  |
| __issue_comment_url*__  | _string_                                         | http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}                |
| __issue_events_url*__   | _string_                                         | http://api.github.com/repos/octocat/Hello-World/issues/events{/number}                  |
| __issues_url*__         | _string_                                         | http://api.github.com/repos/octocat/Hello-World/issues{/number}                         |
| __keys_url*__           | _string_                                         | http://api.github.com/repos/octocat/Hello-World/keys{/key_id}                           |
| __labels_url*__         | _string_                                         | http://api.github.com/repos/octocat/Hello-World/labels{/name}                           |
| __languages_url*__      | _string_                                         | http://api.github.com/repos/octocat/Hello-World/languages                               |
| __merges_url*__         | _string_                                         | http://api.github.com/repos/octocat/Hello-World/merges                                  |
| __milestones_url*__     | _string_                                         | http://api.github.com/repos/octocat/Hello-World/milestones{/number}                     |
| __notifications_url*__  | _string_                                         | http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating} |
| __pulls_url*__          | _string_                                         | http://api.github.com/repos/octocat/Hello-World/pulls{/number}                          |
| __releases_url*__       | _string_                                         | http://api.github.com/repos/octocat/Hello-World/releases{/id}                           |
| __ssh_url*__            | _string_                                         | git&#064;github.com:octocat/Hello-World.git                                             |
| __stargazers_url*__     | _string_                                         | http://api.github.com/repos/octocat/Hello-World/stargazers                              |
| __statuses_url*__       | _string_                                         | http://api.github.com/repos/octocat/Hello-World/statuses/{sha}                          |
| __subscribers_url*__    | _string_                                         | http://api.github.com/repos/octocat/Hello-World/subscribers                             |
| __subscription_url*__   | _string_                                         | http://api.github.com/repos/octocat/Hello-World/subscription                            |
| __tags_url*__           | _string_                                         | http://api.github.com/repos/octocat/Hello-World/tags                                    |
| __teams_url*__          | _string_                                         | http://api.github.com/repos/octocat/Hello-World/teams                                   |
| __trees_url*__          | _string_                                         | http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}                         |
| __clone_url*__          | _string_                                         | https://github.com/octocat/Hello-World.git                                              |
| __mirror_url*__         | _string_                                         | git:git.example.com/octocat/Hello-World                                                 |
| __hooks_url*__          | _string_                                         | http://api.github.com/repos/octocat/Hello-World/hooks                                   |
| __svn_url*__            | _string_                                         | https://svn.github.com/octocat/Hello-World                                              |
| __homepage*__           | _string_                                         | https://github.com                                                                      |
| __forks_count*__        | _number_                                         | 9                                                                                       |
| __stargazers_count*__   | _number_                                         | 80                                                                                      |
| __watchers_count*__     | _number_                                         | 80                                                                                      |
| __size*__               | _number_                                         | 108                                                                                     |
| __default_branch*__     | _string_                                         | master                                                                                  |
| __open_issues_count*__  | _number_                                         | 0                                                                                       |
| __has_issues*__         | _boolean_                                        | true                                                                                    |
| __has_projects*__       | _boolean_                                        | true                                                                                    |
| __has_wiki*__           | _boolean_                                        | true                                                                                    |
| __has_pages*__          | _boolean_                                        | false                                                                                   |
| __has_downloads*__      | _boolean_                                        | true                                                                                    |
| __archived*__           | _boolean_                                        | false                                                                                   |
| __pushed_at*__          | _string_                                         | 2011-01-26T19:06:43Z                                                                    |
| __created_at*__         | _string_                                         | 2011-01-26T19:01:12Z                                                                    |
| __updated_at*__         | _string_                                         | 2011-01-26T19:14:43Z                                                                    |
| __allow_rebase_merge*__ | _boolean_                                        | true                                                                                    |
| __allow_squash_merge*__ | _boolean_                                        | true                                                                                    |
| __allow_merge_commit*__ | _boolean_                                        | true                                                                                    |
| __subscribers_count*__  | _number_                                         | 42                                                                                      |
| __network_count*__      | _number_                                         | 0                                                                                       |
| __topics*__             | _string[]_                                       | ["octocat", "atom", "electron", "API"]                                                  |
| __permissions*__        | _{admin: boolean, push: boolean, pull: boolean}_ |                                                                                         |
| __language*__           | _string_                                         |                                                                                         |
| __owner*__              | _[Owner](#type-owner)_                           |                                                                                         |


<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true" width="15"></a></p>

### `async delete(`<br/>&nbsp;&nbsp;`owner: string,`<br/>&nbsp;&nbsp;`name: string,`<br/>`): void`

Delete a repository.



<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>

## Types

These are the types used across the API.

__<a name="type-owner">`Owner`</a>__

|           Name           |   Type    |                         Description                         |
| ------------------------ | --------- | ----------------------------------------------------------- |
| __login*__               | _string_  | octocat                                                     |
| __id*__                  | _number_  | 1                                                           |
| __node_id*__             | _string_  | MDQ6VXNlcjE=                                                |
| __avatar_url*__          | _string_  | https://github.com/images/error/octocat_happy.gif           |
| __gravatar_id*__         | _string_  |                                                             |
| __url*__                 | _string_  | https://api.github.com/users/octocat                        |
| __html_url*__            | _string_  | https://github.com/octocat                                  |
| __followers_url*__       | _string_  | https://api.github.com/users/octocat/followers              |
| __following_url*__       | _string_  | https://api.github.com/users/octocat/following{/other_user} |
| __gists_url*__           | _string_  | https://api.github.com/users/octocat/gists{/gist_id}        |
| __starred_url*__         | _string_  | https://api.github.com/users/octocat/starred{/owner}{/repo} |
| __subscriptions_url*__   | _string_  | https://api.github.com/users/octocat/subscriptions          |
| __organizations_url*__   | _string_  | https://api.github.com/users/octocat/orgs                   |
| __repos_url*__           | _string_  | https://api.github.com/users/octocat/repos                  |
| __events_url*__          | _string_  | https://api.github.com/users/octocat/events{/privacy}       |
| __received_events_url*__ | _string_  | https://api.github.com/users/octocat/received_events        |
| __type*__                | _string_  | User                                                        |
| __site_admin*__          | _boolean_ | false                                                       |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true"></a></p>

## Copyright

Documentation descriptions by GitHub.

(c) [Rqt][1] 2018

[1]: https://rqt.biz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>