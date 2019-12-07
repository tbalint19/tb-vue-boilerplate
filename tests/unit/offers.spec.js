import { testStore } from './helper/testStore.js'
import api from './helper/api.js'
import router from './helper/router.js'
import { defaultContent, defaultPrimaryOffer } from './helper/content.js'

describe('Offers module tests', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should show all offers without loaded purchased packages', () => {
    // given
    const content = defaultContent()
    const primaryOffer = defaultPrimaryOffer()
    content.demo.offer.push(primaryOffer)

    // when
    const store = testStore(content)

    // then
    expect(store.getters['offers/primaryOffers']).toEqual(content.demo.offer)
  })

  it('should show all related offers with filter applied', async () => {
    // given
    const primaryOffer1 = defaultPrimaryOffer()
    primaryOffer1.title = "offer1"

    const primaryOffer2 = defaultPrimaryOffer()
    primaryOffer2.title = "offer2"

    const primaryOffer3 = defaultPrimaryOffer()
    primaryOffer3.title = "offer3"

    const primaryOffer4 = defaultPrimaryOffer()
    primaryOffer4.title = "stuff3"

    const content = defaultContent()
    content.demo.offer = [ primaryOffer1, primaryOffer2, primaryOffer3, primaryOffer4 ]

    const store = testStore(content)

    store.dispatch('offers/updateFilterParam', "3")

    api.services.packageService
      .onGet('/api/packages')
      .reply(200, [ primaryOffer4 ])

    // when
    await store.dispatch('offers/loadPurchasedPackages')

    // then
    expect(store.getters['offers/personalizedOffers']).toHaveLength(1)
    expect(store.getters['offers/personalizedOffers']).toEqual([primaryOffer3])
    expect(store.getters['offers/isLoading']).toBe(false)
  })

  it('should be loading when package response has not arrived', async () => {
    // given
    const store = testStore()
    api.services.packageService
      .onGet('/api/packages')
      .reply(200, [ ])

    // when
    store.dispatch('offers/loadPurchasedPackages')

    // then
    expect(store.getters['offers/isLoading']).toBe(true)
  })

  it('should not be loading when package response lead to network error', async () => {
    // given
    const store = testStore()
    api.services.packageService
      .onGet('/api/packages')
      .networkError()

    // when
    await store.dispatch('offers/loadPurchasedPackages', "3")

    // then
    expect(store.getters['offers/isLoading']).toBe(false)
  })

})
