import {
  ORGANIZATION_ID_GETTER,
  USER_ACCESS_TOKEN_GETTER
} from "@/store/storeConstants";

export default {
  [USER_ACCESS_TOKEN_GETTER]: state => {
    return state.accessToken;
  },

  [ORGANIZATION_ID_GETTER]: state => {
    return state.organizationId;
  }

};