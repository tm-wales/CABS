import Vue from 'vue'
import Vuex from 'vuex'

import divisions from './modules/divisions'
import pages from './modules/pages'
import config from './modules/config'
import work from './modules/work'
import news from './modules/news'
import footer from './modules/footer'
import policies from './modules/policies'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        policies: policies,
        divisions: divisions,
        pages: pages,
        config: config,
        work: work,
        news: news,
        footer: footer
    }
})
