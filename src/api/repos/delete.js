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

export default del