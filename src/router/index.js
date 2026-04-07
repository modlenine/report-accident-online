import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import List from '@/views/List.vue'
import Add from '@/views/Add.vue'
import Viewdata from '@/views/Viewdata.vue'
import Service from '@/views/Service.vue'
import Report1 from '@/views/Report1.vue'
import Edit from '@/views/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/addData',
    name: 'Add',
    component: Add
  },
  {
    path:'/viewdata/:id',
    name:'Viewdata',
    component:Viewdata
  },
  {
    path:'/edit/:id',
    name:'Edit',
    component:Edit,
  },
  {
    path: '/serviceType',
    name: 'Service',
    component: Service
  },
  {
    path: '/report',
    name: 'Report1',
    component: Report1
  },
  // {
  //   path: '/list',
  //   name: 'List',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/List.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Navigation Guard สำหรับตรวจสอบ authentication
router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('userData') || 'null');
  
  // ตรวจสอบว่ามี userData และยังไม่หมดอายุ
  if (userData) {
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (userData.loginexpire && userData.loginexpire < currentTime) {
      // Session หมดอายุ - ลบและ redirect
      localStorage.removeItem('userData');
      
      if (process.env.NODE_ENV === 'production') {
        const returnUrl = encodeURIComponent(window.location.href);
        window.location.href = `/intranet/login?return_url=${returnUrl}`;
      } else {
        // Development mode - ปล่อยให้แสดงหน้า login
        next();
      }
    } else {
      // Session ยังไม่หมดอายุ - อนุญาตให้ผ่าน
      next();
    }
  } else {
    // ไม่มี session
    if (process.env.NODE_ENV === 'production') {
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `/intranet/login?return_url=${returnUrl}`;
    } else {
      // Development mode - ปล่อยให้แสดงหน้า login
      next();
    }
  }
});

export default router
