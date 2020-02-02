import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/components/landing/Index.vue'
import About from '@/components/about/Index.vue'
import DivisionsContainer from '@/components/divisions/Index.vue'
import Divisions from '@/components/divisions/Divisions.vue'
import Division from '@/components/divisions/division/Index.vue'
import Service from '@/components/divisions/service/Index.vue'
import OurWork from '@/components/work/Index.vue'
import WorkList from '@/components/work/WorkList.vue'
import Work from '@/components/work/Work.vue'
import News from '@/components/news/Index.vue'
import NewsList from '@/components/news/NewsList.vue'
import NewsItem from '@/components/news/News.vue'
import ContactUs from '@/components/contactus/Index.vue'
import Policy from '@/components/policies/Index.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Landing,
            name: 'home'
        },
        {
            path: '/about',
            component: About,
            name: 'about'
        },
        {
            path: '/divisions',
            component: DivisionsContainer,
            children: [
                {
                    path: '',
                    component: Divisions,
                    name: 'divisions'
                },
                {
                    path: ':division',
                    component: Division,
                    name: 'division'
                },
                {
                    path: ':division/:service',
                    component: Service,
                    name: 'service'
                }
            ]
        },
        {
            path: '/our-work',
            component: OurWork,
            children: [
                {
                    path: '',
                    component: WorkList,
                    name: 'work-list'
                },
                {
                    path: ':work',
                    component: Work,
                    name: 'work'
                }
            ]
        },
        {
            path: '/news',
            component: News,
            children: [
                {
                    path: '',
                    component: NewsList,
                    name: 'news-list'
                },
                {
                    path: ':news',
                    component: NewsItem,
                    name: 'news'
                }
            ]
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: ContactUs
        },
        {
            path: '/policies/:policy',
            component: Policy,
            name: 'policies'
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        let position = { x: 0, y: 0 }
        // Workaround for transitions scrolling to the top of the page
        // However, there are still some problems being fixed by the vue team
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Keep scroll position when using browser buttons
            if (savedPosition) {
                position = savedPosition
            }
            resolve(position)
          }, 500)
        })
    }
})
