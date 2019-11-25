# @rqt/github

[![npm version](https://badge.fury.io/js/%40rqt%2Fgithub.svg)](https://www.npmjs.com/package/@rqt/github)

`@rqt/github` is a _GitHub API_ implementation in Node.js.

```sh
yarn add @rqt/github
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`constructor(token?: string): GitHub`](#constructortoken-string-github)
- [**Repositories**](#repositories)
  * [`async create(options: CreateRepository): Repository`](#async-createoptions-createrepository-repository)
  * [`async delete(owner: string, name: string)`](#async-deleteowner-stringname-string-void)
  * [`async edit(options: Edit)`](#async-editoptions-edit-void)
  * [`async generate(string: templateOwner, string: templateName, options: Generate): Repository`](#async-generatestring-templateownerstring-templatenameoptions-generate-repository)
- [**Activity**](#activity)
  * [`async star(owner: string, name: string)`](#async-starowner-stringname-string-void)
- [Types](#types)
  * [`Owner`](#type-owner)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import GitHub from '@rqt/github'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>constructor</ins>(</code><sub><br/>&nbsp;&nbsp;`token?: string,`<br/></sub><code>): <i>GitHub</i></code>

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

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## **Repositories**

These methods allow to work with repositories.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true" width="15">
</a></p>

### <code>async <ins>create</ins>(</code><sub><br/>&nbsp;&nbsp;`options: CreateRepository,`<br/></sub><code>): <i>Repository</i></code>

Create a new repository.

__<a name="type-createrepository">`CreateRepository`</a>__: Options to create a repository.

|        Name        |       Type       |                                                                                                                                           Description                                                                                                                                            | Default |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| org                | <em>string</em>  | The organisation on which to create the repository (if not adding to the user account).                                                                                                                                                                                                          | -       |
| __name*__          | <em>string</em>  | The name of the repository.                                                                                                                                                                                                                                                                      | -       |
| description        | <em>string</em>  | A short description of the repository.                                                                                                                                                                                                                                                           | -       |
| homepage           | <em>string</em>  | A URL with more information about the repository.                                                                                                                                                                                                                                                | -       |
| license_template   | <em>string</em>  | Choose an [open source license template](https://choosealicense.com/) that best suits your needs, and then use the [license keyword](https://help.github.com/articles/licensing-a-repository/#searching-github-by-license-type) as the license_template string. For example, "mit" or "mpl-2.0". | -       |
| gitignore_template | <em>string</em>  | Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".                                                                                                                                                           | -       |
| auto_init          | <em>boolean</em> | Pass `true` to create an initial commit with empty README.                                                                                                                                                                                                                                       | `false` |

---

<details>
<summary>Show Return Type</summary>

__<a name="type-repository">`Repository`</a>__

|          Name           |                           Type                            |                                       Description                                       |
| ----------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| __id*__                 | <em>number</em>                                           | 1296269                                                                                 |
| __node_id*__            | <em>string</em>                                           | MDEwOlJlcG9zaXRvcnkxMjk2MjY5                                                            |
| __name*__               | <em>string</em>                                           | Hello-World                                                                             |
| __full_name*__          | <em>string</em>                                           | octocat/Hello-World                                                                     |
| __private*__            | <em>boolean</em>                                          | false                                                                                   |
| __html_url*__           | <em>string</em>                                           | https://github.com/octocat/Hello-World                                                  |
| __description*__        | <em>string</em>                                           | This your first repo!                                                                   |
| __fork*__               | <em>boolean</em>                                          | true                                                                                    |
| __url*__                | <em>string</em>                                           | https://api.github.com/repos/octocat/Hello-World                                        |
| __archive_url*__        | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}                  |
| __assignees_url*__      | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/assignees{/user}                        |
| __blobs_url*__          | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}                         |
| __branches_url*__       | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/branches{/branch}                       |
| __collaborators_url*__  | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}            |
| __comments_url*__       | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/comments{/number}                       |
| __commits_url*__        | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/commits{/sha}                           |
| __compare_url*__        | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}                 |
| __contents_url*__       | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/contents/{+path}                        |
| __contributors_url*__   | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/contributors                            |
| __deployments_url*__    | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/deployments                             |
| __downloads_url*__      | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/downloads                               |
| __events_url*__         | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/events                                  |
| __forks_url*__          | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/forks                                   |
| __git_commits_url*__    | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}                       |
| __git_refs_url*__       | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}                          |
| __git_tags_url*__       | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}                          |
| __git_url*__            | <em>string</em>                                           | git:github.com/octocat/Hello-World.git                                                  |
| __issue_comment_url*__  | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}                |
| __issue_events_url*__   | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/issues/events{/number}                  |
| __issues_url*__         | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/issues{/number}                         |
| __keys_url*__           | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/keys{/key_id}                           |
| __labels_url*__         | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/labels{/name}                           |
| __languages_url*__      | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/languages                               |
| __merges_url*__         | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/merges                                  |
| __milestones_url*__     | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/milestones{/number}                     |
| __notifications_url*__  | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating} |
| __pulls_url*__          | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/pulls{/number}                          |
| __releases_url*__       | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/releases{/id}                           |
| __ssh_url*__            | <em>string</em>                                           | git&#064;github.com:octocat/Hello-World.git                                             |
| __stargazers_url*__     | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/stargazers                              |
| __statuses_url*__       | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/statuses/{sha}                          |
| __subscribers_url*__    | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/subscribers                             |
| __subscription_url*__   | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/subscription                            |
| __tags_url*__           | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/tags                                    |
| __teams_url*__          | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/teams                                   |
| __trees_url*__          | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}                         |
| __clone_url*__          | <em>string</em>                                           | https://github.com/octocat/Hello-World.git                                              |
| __mirror_url*__         | <em>string</em>                                           | git:git.example.com/octocat/Hello-World                                                 |
| __hooks_url*__          | <em>string</em>                                           | http://api.github.com/repos/octocat/Hello-World/hooks                                   |
| __svn_url*__            | <em>string</em>                                           | https://svn.github.com/octocat/Hello-World                                              |
| __homepage*__           | <em>string</em>                                           | https://github.com                                                                      |
| __forks_count*__        | <em>number</em>                                           | 9                                                                                       |
| __stargazers_count*__   | <em>number</em>                                           | 80                                                                                      |
| __watchers_count*__     | <em>number</em>                                           | 80                                                                                      |
| __size*__               | <em>number</em>                                           | 108                                                                                     |
| __default_branch*__     | <em>string</em>                                           | master                                                                                  |
| __open_issues_count*__  | <em>number</em>                                           | 0                                                                                       |
| __has_issues*__         | <em>boolean</em>                                          | true                                                                                    |
| __has_projects*__       | <em>boolean</em>                                          | true                                                                                    |
| __has_wiki*__           | <em>boolean</em>                                          | true                                                                                    |
| __has_pages*__          | <em>boolean</em>                                          | false                                                                                   |
| __has_downloads*__      | <em>boolean</em>                                          | true                                                                                    |
| __archived*__           | <em>boolean</em>                                          | false                                                                                   |
| __pushed_at*__          | <em>string</em>                                           | 2011-01-26T19:06:43Z                                                                    |
| __created_at*__         | <em>string</em>                                           | 2011-01-26T19:01:12Z                                                                    |
| __updated_at*__         | <em>string</em>                                           | 2011-01-26T19:14:43Z                                                                    |
| __allow_rebase_merge*__ | <em>boolean</em>                                          | true                                                                                    |
| __allow_squash_merge*__ | <em>boolean</em>                                          | true                                                                                    |
| __allow_merge_commit*__ | <em>boolean</em>                                          | true                                                                                    |
| __subscribers_count*__  | <em>number</em>                                           | 42                                                                                      |
| __network_count*__      | <em>number</em>                                           | 0                                                                                       |
| __topics*__             | <em>string[]</em>                                         | ["octocat", "atom", "electron", "API"]                                                  |
| __permissions*__        | <em>{ admin: boolean, push: boolean, pull: boolean }</em> |                                                                                         |
| __language*__           | <em>string</em>                                           |                                                                                         |
| __owner*__              | <em>[Owner](#type-owner)</em>                             |                                                                                         |
</details>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/4.svg?sanitize=true" width="15">
</a></p>

### <code>async <ins>delete</ins>(</code><sub><br/>&nbsp;&nbsp;`owner: string,`<br/>&nbsp;&nbsp;`name: string,`<br/></sub><code>): <i>void</i></code>

Delete a repository.



### <code>async <ins>edit</ins>(</code><sub><br/>&nbsp;&nbsp;`options: Edit,`<br/></sub><code>): <i>void</i></code>

Makes changes to the repository.

<strong><a name="type-_githubrepoedit">`_github.RepoEdit`</a></strong>: Options to edit a repository.

|        Name        |       Type       |                                                               Description                                                                | Default |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| name               | <em>string</em>  | The name of the repository.                                                                                                              | -       |
| description        | <em>string</em>  | A short description of the repository.                                                                                                   | -       |
| homepage           | <em>string</em>  | A URL with more information about the repository.                                                                                        | -       |
| private            | <em>boolean</em> | Either `true` to make the repository private or `false` to make it public. Creating private repositories requires a paid GitHub account. | `false` |
| has_issues         | <em>boolean</em> | Either `true` to enable issues for this repository or `false` to disable them.                                                           | `true`  |
| has_projects       | <em>boolean</em> | Either `true` to enable projects for this repository or `false` to disable them.                                                         | `true`  |
| has_wiki           | <em>boolean</em> | Either `true` to enable the wiki for this repository or `false` to disable it.                                                           | `true`  |
| is_template        | <em>boolean</em> | Either `true` to make this repo available as a template repository or `false` to prevent it.                                             | `false` |
| default_branch     | <em>string</em>  | Updates the default branch for this repository.                                                                                          | -       |
| allow_squash_merge | <em>boolean</em> | Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging.                                               | `true`  |
| allow_merge_commit | <em>boolean</em> | Either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits.        | `true`  |
| allow_rebase_merge | <em>boolean</em> | Either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging.                                               | `true`  |
| archived           | <em>boolean</em> | `true` to archive this repository. Note: You cannot unarchive repositories through the API.                                              | `false` |

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/5.svg?sanitize=true">
</a></p>

### <code>async <ins>generate</ins>(</code><sub><br/>&nbsp;&nbsp;`string: templateOwner,`<br/>&nbsp;&nbsp;`string: templateName,`<br/>&nbsp;&nbsp;`options: Generate,`<br/></sub><code>): <i>Repository</i></code>

Generates a new repository from the template.

<strong><a name="type-_githubgenerate">`_github.Generate`</a></strong>: Options to generate a repository from a template.

|    Name     |       Type       |                                       Description                                       |
| ----------- | ---------------- | --------------------------------------------------------------------------------------- |
| owner       | <em>string</em>  | The organisation on which to create the repository (if not adding to the user account). |
| __name*__   | <em>string</em>  | The name of the repository.                                                             |
| description | <em>string</em>  | A short description of the repository.                                                  |
| private     | <em>boolean</em> | Whether it is a private repository.                                                     |

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/6.svg?sanitize=true">
</a></p>

## **Activity**

These methods allow to work with activities.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/7.svg?sanitize=true" width="15">
</a></p>

### <code>async <ins>star</ins>(</code><sub><br/>&nbsp;&nbsp;`owner: string,`<br/>&nbsp;&nbsp;`name: string,`<br/></sub><code>): <i>void</i></code>

Star a repository.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/8.svg?sanitize=true">
</a></p>


## Types

These are the types used across the API.

__<a name="type-owner">`Owner`</a>__

|           Name           |       Type       |                         Description                         |
| ------------------------ | ---------------- | ----------------------------------------------------------- |
| __login*__               | <em>string</em>  | octocat                                                     |
| __id*__                  | <em>number</em>  | 1                                                           |
| __node_id*__             | <em>string</em>  | MDQ6VXNlcjE=                                                |
| __avatar_url*__          | <em>string</em>  | https://github.com/images/error/octocat_happy.gif           |
| __gravatar_id*__         | <em>string</em>  |                                                             |
| __url*__                 | <em>string</em>  | https://api.github.com/users/octocat                        |
| __html_url*__            | <em>string</em>  | https://github.com/octocat                                  |
| __followers_url*__       | <em>string</em>  | https://api.github.com/users/octocat/followers              |
| __following_url*__       | <em>string</em>  | https://api.github.com/users/octocat/following{/other_user} |
| __gists_url*__           | <em>string</em>  | https://api.github.com/users/octocat/gists{/gist_id}        |
| __starred_url*__         | <em>string</em>  | https://api.github.com/users/octocat/starred{/owner}{/repo} |
| __subscriptions_url*__   | <em>string</em>  | https://api.github.com/users/octocat/subscriptions          |
| __organizations_url*__   | <em>string</em>  | https://api.github.com/users/octocat/orgs                   |
| __repos_url*__           | <em>string</em>  | https://api.github.com/users/octocat/repos                  |
| __events_url*__          | <em>string</em>  | https://api.github.com/users/octocat/events{/privacy}       |
| __received_events_url*__ | <em>string</em>  | https://api.github.com/users/octocat/received_events        |
| __type*__                | <em>string</em>  | User                                                        |
| __site_admin*__          | <em>boolean</em> | false                                                       |

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/9.svg?sanitize=true">
</a></p>

## Copyright

Documentation descriptions by GitHub.

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a>Rqt</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>