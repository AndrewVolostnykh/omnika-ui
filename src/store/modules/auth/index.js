import mutations from "@/store/modules/auth/mutations";
import getters from "@/store/modules/auth/getters";
import actions from "@/store/modules/auth/actions";

export default {
  namespaced: true,
  state() {
    return {
      accessToken: '',
      refreshToken: '',
      userId: '',
      email: '',
      organizationId: '',
      authority: '',
      expiresAt: ''
    };
  },
  mutations,
  getters,
  actions
}