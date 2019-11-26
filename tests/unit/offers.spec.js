import { testStore } from './helper/testStore.js'
import apiMock from './helper/apiMock.js'
import routerMock from './helper/routerMock.js'
import { defaultContent, defaultPrimaryOffer } from './helper/defaultContent.js'

describe('Offers module tests', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should show all offers without loaded purchased packages', () => {
    // given
    const content = defaultContent()
    const primaryOffer = defaultPrimaryOffer()
    content.primaryOffers.push(primaryOffer)

    // when
    const store = testStore(content)

    // then
    expect(store.getters['offers/primaryOffers']).toEqual(content.primaryOffers)
  })

  it('should show all related offers with filter applied', async () => {
    // given
    const primaryOffer1 = defaultPrimaryOffer()
    primaryOffer1.name = "offer1"

    const primaryOffer2 = defaultPrimaryOffer()
    primaryOffer2.name = "offer2"

    const primaryOffer3 = defaultPrimaryOffer()
    primaryOffer3.name = "offer3"

    const primaryOffer4 = defaultPrimaryOffer()
    primaryOffer4.name = "stuff3"

    const content = defaultContent()
    content.primaryOffers = [ primaryOffer1, primaryOffer2, primaryOffer3, primaryOffer4 ]

    const store = testStore(content)

    store.dispatch('offers/updateFilterParam', "3")

    apiMock.mockServices.packageService
      .onGet('/api/packages')
      .reply(200, [ primaryOffer4 ])

    // when
    await store.dispatch('offers/loadPurchasedPackages', "3")

    // then
    expect(store.getters['offers/personalizedOffers']).toHaveLength(1)
    expect(store.getters['offers/personalizedOffers']).toEqual([primaryOffer3])
  })

})
