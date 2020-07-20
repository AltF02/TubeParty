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
  }
]

const router = new VueRouter({
  routes
})

export default router
