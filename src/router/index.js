import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminManagement from '../views/AdminManagement.vue'
import Home from '../views/Home.vue'
import RoomInfo from '../views/RoomInfo.vue'
import UserConter from '../views/UserConter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
	 path: "/admin/login",
	 name: "AdminLogin",
	 component: AdminLogin
  },
  {
	  path: "/admin/management",
	  name: 'AdminManagement',
	  component: AdminManagement
  },{
	  path: "/home",
	  name: 'Home',
	  component: Home
  },{
	  path: "/home/room/:roomNumber",
	  name: "RoomInfo",
	  component: RoomInfo
  },{
	  path:'/user/center',
	  name: 'UserConter',
	  component: UserConter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
