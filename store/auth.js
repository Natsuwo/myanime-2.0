const USERMETA = 'usermeta'

export const state = () => {
    return {
        isLogin: false,
        userToken: "",
        user_id: null,
        usermeta: []

    }
}

export const actions = {
    async userMetaData({ commit }, data) {
        return commit(USERMETA, { data })
    }
}

export const mutations = {
    [USERMETA](state, { data }) {
        state.usermeta = data
    }
}