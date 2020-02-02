import ourwork from '../../data/work'

const state = {
    work: []
}

const mutations = {
    'SET_WORKS' (state, ourwork) {
        state.work = ourwork
    }
}

const actions = {
    initWork: ({ commit }) => {
        commit('SET_WORKS', ourwork)
    }
}

const getters = {
    works: state => state.work.reverse(),
    featuredWork: state => (num) => {
        const filtered = state.work.filter(item => {
            return item.featured === true // filtered for featured
        })
        const shuffled = filtered.sort(() => 0.5 - Math.random()) // shuffle
        const selected = shuffled.slice(0, num) // get sub-array of first n elements AFTER shuffle

        return selected
    },
    work: state => {
        return keyword => state.work.filter(item => {
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
