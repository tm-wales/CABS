import newsData from '../../data/news'

const state = {
    news: []
}

const mutations = {
    'SET_NEWS' (state, news) {
        state.news = news
    }
}

const actions = {
    initNews: ({ commit }) => {
        commit('SET_NEWS', newsData)
    }
}

const getters = {
    news: state => state.news.reverse(),
    newsItem: state => {
        return keyword => state.news.filter(item => {
            return item.name === keyword
        })
    },
    newsLimited: state => (num) => {
        const filtered = state.news.filter(item => {
            return item.featured === true // filtered for featured
        })
        const reversed = filtered.reverse()
        const selected = reversed.slice(0, num) // get sub-array of first n elements AFTER shuffle

        return selected
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
