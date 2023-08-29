import {createRouter, createWebHistory} from "vue-router";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import MainPage from "@/pages/MainPage";
import ChannelsPage from "@/pages/ChannelsPage";
import AgentsPage from "@/pages/AgentsPage";
import DepartmentsPage from "@/pages/DepartmentsPage";
import store from './store/store';
import {USER_ACCESS_TOKEN_GETTER} from "@/store/storeConstants";

const routes = [
  {path: '/login', component: LoginPage, meta: {auth: false}},
  {path: '/signup', component: SignupPage, meta: {auth: false}},
  {path: '/', component: MainPage, meta: {auth: true}},
  {path: '/channels', component: ChannelsPage, meta: {auth: true}},
  {path: '/agents', component: AgentsPage, meta: {auth: true}},
  {path: '/departments', component: DepartmentsPage, meta: {auth: true}}
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters[`auth/${USER_ACCESS_TOKEN_GETTER}`]) {
    next('/login');
  } else {
    next();
  }
});

export default router;