const ANIMES = 'animes'
const ANIME = 'anime'
const ANIMEMETA = 'animemta'
const EPISODES = 'episodes'
const LOADMORE = 'loadmorechannel'

export const state = () => ({
    animes: [],
    anime: [],
    animemeta: [],
    terms: [],
    episodes: []
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
    async episodesData({ commit }, data) {
        return commit(EPISODES, { data })
    },
    async loadMore({ commit }, res) {
        return commit(LOADMORE, { res })
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
    [EPISODES](state, { data }) {
        return state.episodes = data;
    },
    [LOADMORE](state, { res }) {
        var current = state.episodes.all
        var newData = res.data
        return state.episodes.all = current.concat(newData)
    },
    getTerms(state, data) {
        return state.terms = data;
    }

}