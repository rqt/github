/**
 * Start the repo as logged in user.
 * @param {string} org
 * @param {string} name
 */
async function star(org, name) {
  const n = `${org}/${name}`
  const endpoint = `user/starred/${n}`
  const { headers, body } = await this._request({
    method: 'PUT',
    data: {},
    endpoint,
  })
  if (headers.status != '204 No Content') {
    throw new Error(`Could not star the ${n} repository`)
  }
  return body
}

module.exports={
  star,
}