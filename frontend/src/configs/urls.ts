const baseURL = "/api/v1";

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