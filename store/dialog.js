export const state = () => ({
    signIn: false
})

export const mutations = {
    signIn(state, payload) {
        state.signIn = payload
    }
}