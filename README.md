# @rqt/github

[![npm version](https://badge.fury.io/js/%40rqt%2Fgithub.svg)](https://www.npmjs.com/package/@rqt/github)

`@rqt/github` is a _GitHub API_ implementation in _Node.JS_.

```sh
yarn add @rqt/github
```

<kbd>📙 [Read all API documentation in Wiki](../../wiki)</kbd>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`constructor(token?: string): GitHub`](#constructortoken-string-github)
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



## Copyright

Documentation descriptions by _GitHub_.

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