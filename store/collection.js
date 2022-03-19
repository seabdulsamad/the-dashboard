// The specified store is written to manage the all methods setters and getters dynamically.
// The data will be in key value pairs, see the example for implementation use the same keys like key & data

// Setter
// this.$store.dispatch({
//     type: "collection/setData",
//     key: "countries",
//     data: []
// });

// Getter
// this.$store.getters["collection/getDataByKey"]("countries");

export const state = () => ({
  countries: null,
})

export const mutations = {
  setData(state, data) {
    state[data.key] = data.data
  },
}
export const getters = {
  getDataByKey: (state) => (key) => {
    return state[key] || null
  },
  getAllData: (state) => {
    return state
  },
}
export const actions = {
  setData({ commit }, data) {
    commit('setData', data)
  },
}
