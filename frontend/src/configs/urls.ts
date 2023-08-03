const baseURL = "/api";

const items = "/items";
const urls = {
  items: {
    base: items,
    byId: (id: number): string => `${items}/${id} `
  }
};

export {
  baseURL,
  urls
};