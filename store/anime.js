const ANIMES = 'animes'
const ANIME = 'anime'
const ANIMEMETA = 'animemta'
const EPISODES = 'episodes'
const LOADMORE = 'loadmorechannel'
const ANIMESEASONS = 'animeseasons'

export const state = () => ({
    animes: [],
    animeSeasons: [],
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
    },
    async animeSeasons({ commit }, res) {
        return commit(ANIMESEASONS, res.data)
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
    [ANIMESEASONS](state, data) {
        state.animeSeasons = data
    },
    getTerms(state, data) {
        return state.terms = data;
    },
    loadSeasons(state, response) {
        var newAnimes = state.animeSeasons.animes.concat(response.data.animes)
        var newEps = state.animeSeasons.totalEps.concat(response.data.totalEps)
        var newViews = state.animeSeasons.views.concat(response.data.views)
        state.animeSeasons.animes = newAnimes
        state.animeSeasons.totalEps = newEps
        state.animeSeasons.views = newViews
    }

}