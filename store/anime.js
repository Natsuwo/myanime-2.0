const ANIMES = 'animes'
const ANIME = 'anime'
const ANIMEMETA = 'animemta'
const TERM = 'term'

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
    async animeTermData({ commit }, data) {
        return commit(TERM, { data })
    }
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
    [TERM](state, { data }) {
        return state.terms = data;
    },

}