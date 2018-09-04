// import axios from 'axios'
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
  activeModal: false,
  user: '',
  randomNums: [],
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
  SET_SELECTED_SEAT: 'SET_SELECTED_SEAT',
  SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
  SET_MSG: 'SET_MSG',
  SET_SEAT_PRICE: 'SET_SEAT_PRICE',
  SET_SEAT: 'SET_SEAT',
  SET_USER: 'SET_USER',
  SET_FIXED_PRICE: 'SET_FIXED_PRICE',
  SET_MODAL: 'SET_MODAL',
  SET_RANDOM_SEAT: 'SET_RANDOM_SEAT',
  SET_ACTIVITY: 'SET_ACTIVITY',
  SET_RANDOM_NUMS: 'SET_RANDOM_NUMS'
}

const mutations = {
  [Methods.SET_RANDOM_NUMS] (state, nums) {
    state.randomNums = [nums[0], nums[1]]
  },
  [Methods.SET_SELECTED_SEAT] (state, seat) {
    state.selectedSeat = seat
  },
  [Methods.SET_TOTAL_PRICE] (state, totalp) {
    state.totalPrice = totalp
  },
  [Methods.SET_MSG] (state, msg) {
    state.msg = msg
  },
  [Methods.SET_SEAT_PRICE] (state, seatp) {
    state.seatPrice = seatp
  },
  [Methods.SET_SEAT] (state, selectedSeat) {
    state.seat = selectedSeat
  },
  [Methods.SET_USER] (state, user) {
    state.user = user
  },
  [Methods.SET_FIXED_PRICE] (state, fixedPrice) {
    state.fixedPrice = fixedPrice
  },
  [Methods.SET_MODAL] (state, status) {
    state.activeModal = status
  },
  [Methods.SET_RANDOM_SEAT] (state, seat) {
    state.seat = seat
    state.fixedPrice = 0
    state.seatPrice = 0
    state.totalPrice = 0
  },
  [Methods.SET_ACTIVITY] (state, status) {
    state.isActive = status
  }
}
const actions = {
  selectSeat ({commit}, selectedSeat) {
    commit(Methods.SET_ACTIVITY, true)
    commit(Methods.SET_SELECTED_SEAT, selectedSeat)
    commit(Methods.SET_TOTAL_PRICE, state.seatPrice + state.fixedPrice)
    commit(Methods.SET_MSG, 'Selected Seat:')
    commit(Methods.SET_MODAL, true)
    commit(Methods.SET_SEAT_PRICE, state.priceMap[selectedSeat[1]])
    if (selectedSeat[2]) {
      commit(Methods.SET_SEAT, selectedSeat[0] + '-' + selectedSeat[1] + selectedSeat[2])
    } else {
      commit(Methods.SET_SEAT, selectedSeat[0] + '-' + selectedSeat[1])
    }
  },
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
  randomNumbers ({ commit }) {
    let ran1 = Math.floor(Math.random() * (5 - 1 + 1)) + 1
    let ran2 = Math.floor(Math.random() * (5 - 0 + 1)) + 1
    commit(Methods.SET_RANDOM_NUMS, [ran1, ran2])
  },
  randomSeat ({ commit }, randomNums) {
    let letter = state.cols[state.randomNums[0]]
    commit(Methods.SET_RANDOM_SEAT, state.randomNums[1] + '-' + letter)
    this.disablebutton = true
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
