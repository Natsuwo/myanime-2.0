const ANIMES = 'animes'
const ANIME = 'anime'
const ANIMEMETA = 'animemta'

export const state = () => ({
    animes: [],
    anime: [],
    animemeta: [],
    terms: [],
})

export const actions = {
    async animesData({ commit }, data) {
        return commit(ANIMES, { data })
    },
    async animeData({ commit }, data) {
        return commit(ANIME, { data })
    },
    async animemetaData({ commit }, data) {
        return commit(ANIMEMETA, { data })
    },
}

export const mutations = {
    [ANIMES](state, { data }) {
        return state.animes = data;
    },
    [ANIME](state, { data }) {
        return state.anime = data;
    },
    [ANIMEMETA](state, { data }) {
        return state.animemeta = data;
    },
    getTerms(state, data) {
        return state.terms = data;
    }

}