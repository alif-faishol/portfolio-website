import json from './static-json'

const apiProvider = json

export default {
  getPortfolioItems: (args) => {
    let defaultArgs = {
      sort: 'DESC',
      sortBy: 'category',
      perPage: 6,
      filter: {},
      page: 1
    }
    return apiProvider.getPortfolioItems({...defaultArgs, ...args})
  },
}
