import { follow, unFollow, getNoti, unNoti } from "@/services/Follow"
const FOLLOW = 'folow'
const UNFOLLOW = 'unfollow'
const GETNOTI = 'getnoti'
const UNNOTI = 'unnoti'

export const actions = {
    async follow({ commit }, data) {
        var response = await follow(data.headers, data.form)
        if (response.data.success) {
            commit(FOLLOW)
        }
        return response
    },
    async unFollow({ commit }, data) {
        var response = await unFollow(data.headers, data.form)
        if (response.data.success) {
            commit(UNFOLLOW)
        }
        return response
    },
    async getNoti({ commit }, data) {
        var response = await getNoti(data.headers, data.form)
        if (response.data.success) {
            commit(GETNOTI)
        }
        return response
    },
    async unNoti({ commit }, data) {
        var response = await unNoti(data.headers, data.form)
        if (response.data.success) {
            commit(UNNOTI)
        }
        return response
    }
}

export const mutations = {
    [FOLLOW]() {
        this.state.episode.episode.anime.followers += 1
        this.state.episode.episode.user_follow.follow = true
    },
    [UNFOLLOW]() {
        this.state.episode.episode.anime.followers -= 1
        this.state.episode.episode.user_follow.follow = false
    },
    [GETNOTI]() {
        this.state.episode.episode.user_follow.noti = true
    },
    [UNNOTI]() {
        this.state.episode.episode.user_follow.noti = false
    }
}