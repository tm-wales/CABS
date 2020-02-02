import pages from '../../data/pages'

const state = {
    pages: []
}

const mutations = {
    'SET_PAGES' (state, pages) {
        state.pages = pages
    }
}

const actions = {
    initPages: ({ commit }) => {
        commit('SET_PAGES', pages)
    }
}

const getters = {
    pages: state => {
        return state.pages
    },
    page: state => {
        return keyword => state.pages.filter(item => {
            return item.name === keyword
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
