import Vue from 'vue'
import VueRouter from 'vue-router'
import JoinRoom from "../views/Join/JoinRoom.vue";
import Room from "../views/Room/Room.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'JoinRoom',
    component: JoinRoom
  },
  {
    path: '/room/:roomName',
    name: 'Room',
    component: Room,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
