import { aqt } from 'rqt'
import { format } from 'url'

const reduceErrors = (errors) => {
  const reduced = errors.reduce((acc, error) => {
    let errMsg
    if (typeof error == 'string') {
      errMsg = error
    } else {
      errMsg = `${error['resource']}: ${error['message']}`
    }
    return `${errMsg}\n${acc}`
  }, '').trim()
  return reduced
}

const USER_AGENT = [
  'Mozilla/5.0',
  '(Node.JS; @rqt/github)',
  'https://github.com/rqt/github',
].join(' ')

export default async function request({
  data,
  token,
  method,
  endpoint,
  headers: he = {},
}) {
  if (!endpoint) throw new Error('Missing endpoint')
  const h = {
    Authorization: `token ${token}`,
    'User-Agent': USER_AGENT,
    ...he,
  }
  const url = format({
    protocol: 'https',
    host: 'api.github.com',
    pathname: endpoint,
  })
  const { body, headers, statusCode, statusMessage } = await aqt(url, {
    headers: h,
    data,
    method,
  })
  if (Array.isArray(body.errors)){
    const err = reduceErrors(body.errors)
    throw new Error(err)
  } else if (body.message == 'Bad credentials') {
    throw new Error(body.message)
  } else if (statusCode == 403) {
    throw new Error(`${body.message} ${body.documentation_url}`)
  }
  return { body, headers, statusMessage, statusCode }
}