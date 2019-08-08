export const state = () => ({
    active: false,
    message: []
})

export const mutations = {
    snackBar(state, payload) {
        state.active = payload.active
        state.message = payload.message
    }
}