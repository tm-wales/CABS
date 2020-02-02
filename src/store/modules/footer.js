import footer from '../../data/footer'

const state = {
    footer: {}
}

const mutations = {
    'SET_FOOTER' (state, footer) {
        state.footer = footer
    }
}

const actions = {
    initFooter: ({ commit }) => {
        commit('SET_FOOTER', footer)
    }
}

const getters = {
    footer: state => {
        return state.footer
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
