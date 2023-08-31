import axios from "axios";
import store from '../store/store';
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";

export const get = (url, params) => {
  let token = store.getters[`auth/${USER_ACCESS_TOKEN_GETTER}`];
  return axios({
    method: 'get',
    url: url,
    params: params,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const post = (url, body) => {
  let token = store.getters[`auth/${USER_ACCESS_TOKEN_GETTER}`];
  return axios({
    method: 'post',
    url: url,
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const put = (url, body, params) => {
  let token = store.getters[`auth/${USER_ACCESS_TOKEN_GETTER}`];
  return axios({
    method: 'put',
    url: url,
    data: body,
    params: params,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}