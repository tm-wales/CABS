import config from '../../data/config'

const state = {
    config: {
        loaded: false,
        pageLoaded: true
    }
}

const mutations = {
    'SET_CONFIG' (state, config) {
        state.config = config
    },
    'SET_PROPERTY' (state, payload) {
        state.config[payload.property] = payload.value
    }
}

const actions = {
    initConfig: ({ commit }) => {
        commit('SET_CONFIG', config)
    },
    setProperty: ({ commit }, payload) => {
        commit('SET_PROPERTY', payload)
    }
}

const getters = {
    config: state => {
        return state.config
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
