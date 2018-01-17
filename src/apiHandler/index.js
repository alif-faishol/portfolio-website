import json from './static-json'

const apiProvider = json

export default {
  getPortfolioItems: (args) => {
    let defaultArgs = {
      sort: 'ASC',
      perPage: 9,
      page: 1
    }
    args = {
      ...defaultArgs,
      ...args
    }
    return apiProvider.getPortfolioItems(args.sort, args.perPage, args.page)
  },
}
