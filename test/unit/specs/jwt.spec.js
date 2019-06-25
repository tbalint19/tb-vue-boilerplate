import { parse } from '@/util/jwt'
var jwt = require('jsonwebtoken')

describe('JWT tests', () => {
  it('Should return null for invalid JWT', () => {
    // given
    let invalidJWT = 'abc'

    // when
    let payload = parse(invalidJWT)

    // then
    expect(payload).to.equal(null)
  })

  it('Should parse valid JWT', () => {
    // given
    let validJWT = jwt.sign({ foo: 'bar' }, 'secret-key')

    // when
    let payload = parse(validJWT)

    // then
    expect(payload['foo']).to.equal('bar')
  })
})
