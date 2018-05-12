import Vue from 'vue'
import Router from 'vue-router'
import Model from '@/components/model'
import Product from '@/components/product'
import home from '@/components/home'
import opusdb from '@/components/opusdb'
import step from '@/components/step'
import family from '@/components/family'
import analogs from '@/components/analogs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/model/',
      name: 'model',
      component: Model
    },
    {
      path: '/product/',
      name: 'product',
      component: Product
    },
    {
      path: '/opusdb/',
      name: 'opusdb',
      component: opusdb
    },
    {
      path: '/step/',
      name: 'step',
      component: step
    },
    {
      path: '/family/',
      name: 'family',
      component: family
    },
    {
      path: '/analogs/',
      name: 'analogs',
      component: analogs
    }
  ]
})
