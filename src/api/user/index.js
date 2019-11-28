/**
 * Start the repo as logged in user.
 * @param {string} name
 * @param {string} org
 */
async function star(name, org) {
  const n = `${org}/${name}`
  const endpoint = `user/starred/${n}`
  const { headers } = await this._request({
    method: 'PUT',
    data: {},
    endpoint,
  })
  if (headers.status != '204 No Content') {
    throw new Error(`Could not star the ${n} repository`)
  }
}

export default {
  star,
}