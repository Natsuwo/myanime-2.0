import { like, unlike, changeVote } from "../services/Vote"

const ADD = 'add'
const LIKE = 'like'
const DISLIKE = 'dislike'
const DELETE = 'delete'

export const actions = {
    async add({ commit }, data) {
        var response = await like(data.headers, data.form)
        return commit(ADD, { data: response.data, isLike: data.form.isLike })
    },
    async like({ commit }, data) {
        var response = await changeVote(data.headers, data.form)
        return commit(LIKE, { data: response.data })
    },
    async dislike({ commit }, data) {
        var response = await changeVote(data.headers, data.form)
        return commit(DISLIKE, { data: response.data })
    },
    async unlike({ commit }, data) {
        var response = await unlike(data.headers, data.form)
        return commit(DELETE, { isLike: data.form.isLike, data: response.data })
    }
}

export const mutations = {
    [ADD](state, { isLike, data }) {
        this.state.snackbar.active = true
        this.state.snackbar.message = data
        if (data.success) {
            this.state.auth.usermeta.push(data.result)
            if (isLike) {
                return this.state.episode.episode.likes += 1
            }
            return this.state.episode.episode.dislikes += 1
        }


    },
    [LIKE](state, { data }) {
        this.state.snackbar.active = true
        this.state.snackbar.message = data
        if (data.success) {
            var index = this.state.auth.usermeta.findIndex(x => x.meta_key === 'vote')
            this.state.auth.usermeta[index].meta_value = true
            this.state.episode.episode.likes += 1
            this.state.episode.episode.dislikes -= 1
        }

    },
    [DISLIKE](state, { data }) {
        this.state.snackbar.active = true
        this.state.snackbar.message = data
        if (data.success) {
            var index = this.state.auth.usermeta.findIndex(x => x.meta_key === 'vote')
            this.state.auth.usermeta[index].meta_value = false
            this.state.episode.episode.dislikes += 1
            this.state.episode.episode.likes -= 1
        }
    },
    [DELETE](state, { isLike, data }) {
        this.state.snackbar.active = true
        this.state.snackbar.message = data
        if (data.success) {
            var index = this.state.auth.usermeta.findIndex(x => x.meta_key === 'vote')
            this.state.auth.usermeta.splice(index, 1);
            if (isLike) return this.state.episode.episode.likes -= 1
            return this.state.episode.episode.dislikes -= 1
        }
    }
}