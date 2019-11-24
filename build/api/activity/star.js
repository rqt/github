/**
 * Star a repository.
 * @param {string} owner
 * @param {string} repo
 */
async function del(owner, repo) {
  const endpoint = `/user/starred/${owner}/${repo}`
  const { statusCode } = await this._request({
    method: 'PUT',
    data: {},
    endpoint,
  })
  if (statusCode != 204) {
    throw new Error(`Unexpected status code ${statusCode}.`)
  }
}

module.exports=del