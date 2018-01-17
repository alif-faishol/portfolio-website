const root = '/static-data'
const data = root + '/cms-json/data.json'

const getPortfolioItems = (sort, perPage, page) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", data);
    xhr.onload = () => resolve(resolved(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();

    const resolved = data => (
      JSON.parse(data).portfolio.map((item, index) => ({
        id: index,
        title: item.name,
        thumbnail: root + item.images[0],
        images: item.images.map(item => (
          root + item
        ))
      }))
    )
  })
}

export default {
  getPortfolioItems
}
