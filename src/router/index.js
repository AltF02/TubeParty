import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Room from "../views/Room";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/room/:roomName',
      name: 'Room',
      component: Room,
      props: true
    }
]

const router = new VueRouter({
  routes
})

export default router
