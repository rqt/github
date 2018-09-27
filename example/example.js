/* yarn example/ */
import GitHub from '../src'
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