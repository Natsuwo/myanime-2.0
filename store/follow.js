import { follow, unFollow, getNoti, unNoti } from "@/services/Follow"
const FOLLOW = 'folow'
const UNFOLLOW = 'unfollow'
const GETNOTI = 'getnoti'
const UNNOTI = 'unnoti'

export const actions = {
    async follow({ commit }, data) {
        var response = await follow(data.headers, data.form)
        if (response.data.success) {
            commit(FOLLOW, { data: response.data.result })
            this.commit("auth/follow", response.data.anime)
        }
        return response
    },
    async unFollow({ commit }, data) {
        var response = await unFollow(data.headers, data.form)
        if (response.data.success) {
            commit(UNFOLLOW)
            this.commit("auth/unfollow", data.form)
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
    [FOLLOW](state, { data }) {
        this.state.anime.anime.followers += 1
        this.state.auth.usermeta.push(data)
    },
    [UNFOLLOW]() {
        this.state.anime.anime.followers -= 1
        var index = this.state.auth.usermeta.findIndex(x => x.meta_key === 'follow')
        this.state.auth.usermeta.splice(index, 1);
    },
    [GETNOTI]() {
        var index = this.state.auth.usermeta.findIndex(x => x.meta_key === 'follow')
        this.state.auth.usermeta[index].meta_value = true
    },
    [UNNOTI]() {
        var index = this.state.auth.usermeta.findIndex(x => x.meta_key === 'follow')
        this.state.auth.usermeta[index].meta_value = false
    }
}