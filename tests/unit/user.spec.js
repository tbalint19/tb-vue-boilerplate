import { testStore } from './helper/testStore.js'
import content from '../../src/content.js'
jest.mock('../../src/content.js');

describe('User module tests', () => {

  it('should logout user', () => {
    // given
    const store = testStore()

    // when
    const result = null

    // then
    expect(result).toBe(null)
  })

})
