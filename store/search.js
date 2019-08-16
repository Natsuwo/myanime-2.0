

const SEARCH = 'search'

export const state = () => {
    return {
        results: [],
        animes: [],
        counts: 0
    }
}

export const actions = {
    async searchQuery({ commit }, response) {
        return commit(SEARCH, { res: response.data })
    }
}

export const mutations = {
    [SEARCH](state, { res }) {
        state.results = res.results
        state.animes = res.animes
        state.counts = res.counts
    }
}