import axios from 'axios'
const state = {
  msg: 'Please Select a Seat...',
  fixedPrice: 8,
  seatsList: [
    ['1A', '1B', '1C', 'e', '1D', '1E', '1F'],
    ['2A', '2B', '2C', 'e', '2D', '2E', '2F'],
    ['3A', '3B', '3C', 'e', '3D', '3E', '3F'],
    ['4A', '4B', '4C', 'e', '4D', '4E', '4F'],
    ['5A', '5B', '5C', 'e', '5D', '5E', '5F'],
    ['6A', '6B', '6C', 'e', '6D', '6E', '6F']
  ],
  cols: ['A', 'B', 'C', 'D', 'E', 'F'],
  seatPrice: 0,
  totalPrice: 0,
  selectedSeat: '',
  isActive: false,
  seat: '',
  priceMap: {
    A: 10,
    B: 5,
    C: 8,
    D: 8,
    E: 5,
    F: 10
  }
}
const getters = {}

const Methods = {
  SET_DATA: 'SET_DATA',
  SET_RANDOM_SEAT: 'SET_RANDOM_SEAT'
}

const mutations = {
  [Methods.SET_DATA] (state, {key, value}) {
    state[key] = value
  },
  [Methods.SET_RANDOM_SEAT] (state) {
    let ran1 = Math.floor(Math.random() * (5 - 1 + 1)) + 1
    let ran2 = Math.floor(Math.random() * (5 - 0 + 1)) + 1
    let randomNums = [ran1, ran2]
    let letter = state.cols[randomNums[0]]
    state.fixedPrice = 0
    state.seatPrice = 0
    state.totalPrice = 0
    let randomSeat = randomNums[1] + '-' + letter
    state.seat = randomSeat
  }
}
const actions = {
  selectSeat ({commit}, selectedSeat) {
    commit(Methods.SET_DATA, { key: 'isActive', value: true })
    commit(Methods.SET_DATA, { key: 'selectedSeat', value: selectedSeat })
    commit(Methods.SET_DATA, { key: 'msg', value: 'Selected Seat:' })
    commit(Methods.SET_DATA, { key: 'seatPrice', value: state.priceMap[selectedSeat[1]] })
    if (selectedSeat[2]) {
      commit(Methods.SET_DATA, { key: 'seat', value: selectedSeat[0] + '-' + selectedSeat[1] + selectedSeat[2] })
    } else {
      commit(Methods.SET_DATA, { key: 'seat', value: selectedSeat[0] + '-' + selectedSeat[1] })
    }
    commit(Methods.SET_DATA, { key: 'totalPrice', value: state.seatPrice + state.fixedPrice })
    let Seat = {
      column: selectedSeat[1],
      number: selectedSeat[0],
      price: state.seatPrice,
      reserved: true
    }
    axios.post('http://localhost:3000/seat-plan', Seat)
      .then((response) => {
        console.log(response.data)
        commit('SET_DATA', Seat)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  random ({commit}) {
    commit(Methods.SET_RANDOM_SEAT)
    commit(Methods.SET_DATA, { key: 'msg', value: 'Selected Seat:' })
  }
  // fetchUser ({ commit }) {
  //   axios.get('http://localhost:3030/user/fetch')
  //     .then(response => {
  //       this.name = response.data.name
  //       let user = this.name
  //       commit('SET_USER', user)
  //     })
  //     .catch(e => {
  //       this.errors.push(e)
  //     })
  // },
  // onSubmit ({ commit }, newUser) {
  //   axios.post('http://localhost:3030/user/add', newUser)
  //     .then((response) => {
  //       console.log(response.data)
  //       commit('SET_ACTIVITY', false)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // },
}

export default {
  state,
  getters,
  mutations,
  actions
}
