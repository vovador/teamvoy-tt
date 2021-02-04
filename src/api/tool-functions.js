import { request } from "./api";

const functionWithPromise = item => {

  return request(item);
};
const anAsyncFunction = async (item) => {
  return functionWithPromise(item);
};
export const getData = async (urls) => {
  return Promise.all(urls.map(item => anAsyncFunction(item)));
};
export function wait(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
