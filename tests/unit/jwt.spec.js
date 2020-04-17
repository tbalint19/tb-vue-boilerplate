import jsonwebtoken from 'jsonwebtoken'
import { parse } from '../../src/util/jwt'

describe('Jwt tests', () => {

  it('should parse proper jwt', () => {
    // given
    const properJwt = jsonwebtoken.sign(
      {
        name: "bela"
      },
    'secret-key')

    // when
    const payload = parse(properJwt)

    // then
    expect(payload.name).toBe("bela")
  })
})
