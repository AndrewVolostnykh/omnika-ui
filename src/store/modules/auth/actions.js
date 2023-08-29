import {
  LOGIN_ACTION, LOGOUT_ACTION,
  SET_USER_TOKEN_DATA_MUTATION,
  SIGNUP_ACTION
} from "@/store/storeConstants";
import axios from "axios";
import {LOGIN_URL, SIGNUP_URL} from "@/backendurls";
import parseJwtPrincipal from "@/services/parseJwtPrincipal";

export default {
  async [LOGIN_ACTION](context, payload) {
    let postData = {
      username: payload.email,
      password: payload.password
    }

    await axios({
      method: 'post',
      url: LOGIN_URL,
      data: postData
    })
    .then(response => {
      let principal = parseJwtPrincipal(response.data.accessToken);
      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        email: principal.username,
        userId: principal.user_id,
        organizationId: principal.organization_id,
        authority: principal.authority,
        expiresAt: principal.exp
      });
    })
    .catch(error => {
      throw error.response
    });
  },

  async [SIGNUP_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      name: payload.organizationName,
      password: payload.password
    };

    await axios({
      method: 'post',
      url: SIGNUP_URL,
      data: postData
    })
    .then(response => {
      let principal = parseJwtPrincipal(response.data.accessToken);
      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        email: principal.username,
        userId: principal.user_id,
        organizationId: principal.organization_id,
        authority: principal.authority,
        expiresAt: principal.exp
      });
    })
    .catch(error => {
      throw error.response;
    });
  },

  [LOGOUT_ACTION](context) {
    context.commit(SET_USER_TOKEN_DATA_MUTATION, {
      accessToken: null,
      refreshToken: null,
      email: null,
      userId: null,
      organizationId: null,
      authority: null,
      expiresAt: null
    });
  }
};