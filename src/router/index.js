import Vue from 'vue'
import Router from 'vue-router'
import Model from '@/components/model'
import ModelsList from '@/components/modelsList'
import Product from '@/components/product'
import home from '@/components/home'

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
    }
  ]
})
