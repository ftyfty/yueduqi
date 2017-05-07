import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	linkActiveClass:"is-active",
  routes: [
    {
        path:'/',
        name:'home',
        component:resolve => require(['../pages/home'],resolve)
    },
    {
        path:'/search',
        name:'search',
        component:resolve => require(['../pages/search'],resolve)
    },
    {
    	path:'/details/:id',
    	name:'details',
    	component:resolve => require(['../pages/bookDetails'],resolve)
    },
    {
    	path:'/catalog/:bookId',
    	name:'catalog',
    	component:resolve => require(['../pages/bookCatalog'],resolve)
    },
	{
    	path:'/read',
    	name:'read',
    	component:resolve => require(['../pages/bookRead'],resolve)
    }
  ]
})
