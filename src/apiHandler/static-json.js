const root = '/static-data'
const data = root + '/cms-json/data.json'

const getPortfolioItems = (args) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", data);
    xhr.onload = () => resolve(resolved(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();

    const resolved = data => {
      const dataObj = (
        JSON.parse(data).portfolio.map(
          (item, index) => ({
            id: index,
            title: item.name,
            thumbnail: root + item.images[0],
            images: item.images.map(item => (
              root + item
            ))
          })
        )
      )
      const sorter = (a, b) => (
        a[args.sortBy] < b[args.sortBy]
        ? -1
        : (a[args.sortBy] > b[args.sortBy] ? 1 : 0)
      )
      return {
        meta: {
          totalData: dataObj.length,
          totalPage: Math.ceil(dataObj.length/args.perPage)
        },
        data: (
          dataObj
          .sort(sorter)
          .splice(
            args.perPage*(args.page-1),
            args.perPage*args.page
          )
        )
      }
    }
  })
}

export default {
  getPortfolioItems
}
