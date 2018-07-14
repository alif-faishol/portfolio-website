const root = '/static-data';
const url = `${root}/cms-json/data.json`;

const getPortfolioItems = args => new Promise((resolve, reject) => {
  const resolved = (data) => {
    const sorter = (a, b) => {
      const check = () => {
        if (a[args.sortBy] < b[args.sortBy]) {
          return -1;
        }
        if (a[args.sortBy] > b[args.sortBy]) {
          return 1;
        }
        return 0;
      };
      return args.sort === 'ASC' ? check() : -check();
    };

    const filterer = item => (args.filter[item.category] !== undefined
      ? args.filter[item.category]
      : true
    );

    const resData = (
      JSON.parse(data).portfolio.map((item, index) => ({
        id: index,
        title: item.name,
        thumbnail: root + item.images[0],
        category: item.category,
        videos: item.videos,
        tools: item.tools_used,
        body: item.body,
        images: item.images.map(image => (
          root + image
        )),
      }))
    )
      .filter(filterer)
      .sort(sorter);

    return {
      meta: {
        totalData: resData.length,
        totalPage: Math.ceil(resData.length / args.perPage),
      },
      data: resData.slice(
        args.perPage * (args.page - 1),
        args.perPage * (args.page - 1) + args.perPage,
      ),
    };
  };

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => resolve(resolved(xhr.responseText));
  xhr.onerror = () => reject(xhr.statusText);
  xhr.send();
});

export default {
  getPortfolioItems,
};
