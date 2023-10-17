const baseURL = "/api";

const auth = '/auth'
const items = "/items"
const sold = "/sold"
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
    byId: (id: number): string => `${items}/${id}`,
  },
  sold: {
    base: sold
  },
  users: {
    base  : users
  },
  categories: {
    base: categories,
    byId: (id: number): string => `${categories}/${id}`
  }
};

export {
  baseURL,
  urls
};