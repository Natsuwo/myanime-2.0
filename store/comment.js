import { getComment, add, reply, edit, remove, attachHeart, unHeart } from "../services/Comment"

const GET = 'get'
const HEART = 'heart'
const UNHEART = 'unheart'
const ADD = 'add'
const SHOW = 'show'
const SHOWEDIT = 'showedit'
const EDIT = 'edit'
const DELETE = 'delete'

export const state = () => ({
    comments: [],
    total: 0,
    replyId: null
})

export const actions = {
    async get({ commit }, data) {
        var response = await getComment(data)
        return commit(GET, { data: response.data })
    },
    async show({ commit }, item) {
        return commit(SHOW, { item })
    },
    async showEdit({ commit }, data) {
        return commit(SHOWEDIT, { data })
    },
    async add({ commit }, data) {
        var response = await add(data.headers, data.form)
        return commit(ADD, { data: response.data })
    },
    async reply({ commit, dispatch }, data) {
        var response = await reply(data.headers, data.form)
        dispatch('show', data.item)
        return commit(ADD, { data: response.data })
    },
    async edit({ commit }, data) {
        var response = await edit(data.headers, data.form)
        commit(EDIT, { item: data.item, comment: data.form.comment })
        return response.data
    },
    async removeComment({ commit }, data) {
        var response = await remove(data.headers, data.form)
        commit(DELETE, { item: data.item })
        return response.data
    },
    async attachHeart({ commit }, data) {
        var response = await attachHeart(data.headers, data.form)
        commit(HEART, { item: data.item })
        return response.data
    },
    async unHeart({ commit }, data) {
        var response = await unHeart(data.headers, data.form)
        commit(UNHEART, { item: data.item })
        return response.data
    }
}

export const mutations = {
    replyId(state, payload) {
        state.replyId = payload
    },
    [GET](state, { data }) {
        state.comments = data.comments
        state.total = data.total
    },
    [ADD](state, { data }) {
        state.comments.unshift(data.result)
        state.total += 1
    },
    [SHOW](state, { item }) {
        var index = state.comments.indexOf(item)
        state.comments[index].show = !state.comments[index].show
    },
    [EDIT](state, { item, comment }) {
        var index = state.comments.indexOf(item)
        state.comments[index].comment = comment
        state.comments[index].edit = false
    },
    [SHOWEDIT](state, { data }) {
        var index = state.comments.indexOf(data.item)
        state.comments[index].edit = data.active
    },
    [DELETE](state, { item }) {
        var index = state.comments.indexOf(item)
        state.comments.splice(index, 1);
        return state.total -= 1
    },
    [HEART](state, { item }) {
        var index = state.comments.indexOf(item)
        state.comments[index].hearts += 1
        state.comments[index].isHeart = true
    },
    [UNHEART](state, { item }) {
        var index = state.comments.indexOf(item)
        state.comments[index].hearts -= 1
        state.comments[index].isHeart = false
    }
}