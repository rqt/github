import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import github from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await github({
      text: input,
    })
    return res
  },
  context: Context,
})

export default ts