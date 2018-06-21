import json from './static-json'

const apiProvider = json

export default {
  getPortfolioItems: (args) => {
    let defaultArgs = {
      sort: 'ASC',
      sortBy: 'title',
      perPage: 6,
      filter: undefined,
      page: 1
    }
    return apiProvider.getPortfolioItems({...defaultArgs, ...args})
  },
}
