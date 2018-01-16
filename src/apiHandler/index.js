import json from './static-json'

const apiProvider = json

export default {
  getPortfolioItems: (short='ASC', perPage='9', page='1') => {
    return apiProvider.getPortfolioItems(short, perPage, page)
  },
}
