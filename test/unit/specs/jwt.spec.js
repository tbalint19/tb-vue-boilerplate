import { parse } from '../../../src/util/jwt'

describe('JWT tests', () => {

  it('Should return null for invalid JWT', () => {
    // given
    let invalidJWT = "xyz"

    // when
    let payload = parse(invalidJWT)

    // then
    expect(payload).to.equal(null)
  })

  it('Should parse valid JWT', () => {
    // given
    let validJWT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9." +
      "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW" +
      "4iOnRydWUsImp0aSI6ImE0NzY0YmE0LTFkNjctNDZiOC04MjFmLWE0NmFkN" +
      "TI3ZjMwYiIsImlhdCI6MTU1ODQyMzk0MywiZXhwIjoxNTU4NDI3NTcyfQ." +
      "RRiFKQtrOzQLRRLDnKTh4wdJGg6-8tXB46b1WiGrNQw"

    // when
    let payload = parse(validJWT)

    // then
    expect(payload["sub"]).to.equal("1234567890")
    expect(payload["name"]).to.equal("John Doe")
    expect(payload["admin"]).to.equal(true)
    expect(payload["jti"]).to.equal("a4764ba4-1d67-46b8-821f-a46ad527f30b")
    expect(payload["iat"]).to.equal(1558423943)
  })

})
