import Vue from 'vue'
import Router from 'vue-router'
import Model from '@/components/model'
import ModelsList from '@/components/modelsList'
import Product from '@/components/product'
import home from '@/components/home'
import opusdb from '@/components/opusdb'
import search from '@/components/search'

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
      path: '/models-list/',
      name: 'models-list',
      component: ModelsList
    },
    {
      path: '/product/',
      name: 'product',
      component: Product
    },
    {
      path: '/search/',
      name: 'search',
      component: search
    },
    {
      path: '/opusdb/',
      name: 'opusdb',
      component: opusdb
    }
  ]
})
