import type from '../owner'

const getType = (val) => {
  if (val === true || val === false) return 'boolean'
  if (typeof val == 'number') return 'number'
  if (typeof val == 'string') return 'string'
}

const skipped = []

console.log('<types>')
console.log('  <type name="Owner">')
Object.keys(type).forEach(key => {
  const val = type[key]
  const t = getType(val)
  if (!t) {
    skipped.push(key)
    return
  }
  console.log(`    <prop ${t} name="${key}">${val}</prop>`)
})
console.log('  </type>')
console.log('</types>')


console.error('skipped: %s', skipped.join(', '))