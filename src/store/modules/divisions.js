import divisions from '../../data/divisions'

const state = {
    divisions: []
}

const mutations = {
    'SET_DIVISIONS' (state, divisions) {
        state.divisions = divisions
    }
}

const actions = {
    initDivisions: ({ commit }) => {
        commit('SET_DIVISIONS', divisions)
    }
}

const getters = {
    divisions: state => {
        return state.divisions
    },
    division: state => {
        return keyword => state.divisions.filter(item => {
            return item.name === keyword
        })
    },
    service: state => {
        return keyword => state.divisions.filter(item => {
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
