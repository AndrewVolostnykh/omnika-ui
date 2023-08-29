import {SET_USER_TOKEN_DATA_MUTATION} from "@/store/storeConstants";

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
        state.email = payload.email;
        state.userId = payload.userId;
        state.organizationId = payload.organizationId;
        state.authority = payload.authority;
        state.expiresAt = payload.expiresAt;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
    }


};