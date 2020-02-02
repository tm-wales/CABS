import policies from '../../data/policies'

const state = {
    policies: []
}

const mutations = {
    'SET_POLICIES' (state, policies) {
        state.policies = policies
    }
}

const actions = {
    initPolicies: ({ commit }) => {
        commit('SET_POLICIES', policies)
    }
}

const getters = {
    allPolicies: state => {
        return state.policies
    },
    policy: state => {
        return keyword => state.policies.filter(item => {
            return item.route === keyword
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
