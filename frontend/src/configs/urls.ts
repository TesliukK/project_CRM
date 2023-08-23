const baseURL = "/api";

const auth = '/auth'
const items = "/items"
const users = "/users"
const categories = "/categories"

const urls = {
  auth: {
    register: `${auth}/register`,
    login: `${auth}/login`,
    refresh: `${auth}/refresh`,
    passwordChange: `${auth}/password/change`,
    passwordForgot: `${auth}/password/forgot`,
  },
  items: {
    base: items,
    byId: (id: number): string => `${items}/${id}`
  },
  users: {
    base  : users
  },
  categories: {
    base: categories
  }
};

export {
  baseURL,
  urls
};