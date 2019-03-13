import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Settings from '@/components/Settings'
import {FirebaseAuthenticationAPI} from "@/services/FirebaseAuthenticationAPI";
const firebase = require('firebase');


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: Settings,
      props: true,
      meta: {
        requiresAuth: true
      }
    }

  ]
});

let firebaseAuth = new FirebaseAuthenticationAPI();
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (!firebaseAuth.isLoggedIn()){
      alert('tried to access restricted page while not logged in');
      next(Login);
    }else{
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    if (firebaseAuth.isLoggedIn()){
      alert('logged in already');
      next('/');
    }else{
      next();
    }
  }



});

export default router;
