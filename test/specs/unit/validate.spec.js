import { getError } from '@/util/validate'

describe('Validation tests', () => {

  let empty = {
    "errorKey": "validation.empty",
    "regex": "^(?!\\s*$).+"
  }

  let lessThen3 = {
    "errorKey": "validation.lessThen3",
    "regex": "(?:\\w{3,}|[\\$\\@()+.])+"
  }

  it('Should return null if related validations is empty list', () => {
    // given
    let validations = []

    // when
    let errorKey = getError("", validations)

    // then
    expect(errorKey).to.equal(null)
  })

  it('Should return null for valid string', () => {
    // given
    let validations = [ empty, lessThen3 ]

    // when
    let errorKey = getError("bela", validations)

    // then
    expect(errorKey).to.equal(null)
  })

  it('Should return first error key even if more errors exist', () => {
    // given
    let validations = [ empty, lessThen3 ]

    // when
    let errorKey = getError("", validations)

    // then
    expect(errorKey).to.equal("validation.empty")
  })

  it('Should return last error key if only last fails', () => {
    // given
    let validations = [ empty, lessThen3 ]

    // when
    let errorKey = getError("b", validations)

    // then
    expect(errorKey).to.equal("validation.lessThen3")
  })

})
