import axios from 'axios'

const state = {
  msg: 'Select a Seat...',
  fixedPrice: 8,
  Seats: ['A', 'B', 'C', ' ', 'D', 'E', 'F', ' ', 'G', 'H', 'I'],
  seat: '',
  seatPrice: 0,
  totalPrice: 0,
  clickedButton: '',
  isActive: false,
  activeModal: false,
  user: ''
}

const getters = {}

const mutations = {
  pickSeat (state, selectedSeat) {
    state.seat = selectedSeat
  },
  SET_USER (state, user) {
    state.user = user
  }
}
const actions = {
  selectSeat ({commit}, selectedSeat) {
    commit('pickSeat', selectedSeat)
    state.clickedButton = state.seat
    state.isActive = true
    if (state.seat[0] == 'A' || state.seat[0] == 'I') {
      state.seatPrice = 10
    }
    if (state.seat[0] == 'C' || state.seat[0] == 'D' || state.seat[0] == 'F' || state.seat[0] == 'G') {
      state.seatPrice = 8
    }
    if (state.seat[0] == 'B' || state.seat[0] == 'E' || state.seat[0] == 'H') {
      state.seatPrice = 5
    }
    if (state.seat[2]) {
      state.seat = state.seat[0] + '-' + state.seat[1] + state.seat[2]
    } else {
      state.seat = state.seat[0] + '-' + state.seat[1]
    }
    state.totalPrice = state.seatPrice + state.fixedPrice
    state.msg = 'Selected Seat:'
    console.log(selectedSeat)
    state.activeModal = true
  },
  fetchUser ({ commit }) {
    axios.get('http://localhost:3030/user/fetch')
      .then(response => {
        this.name = response.data.name
        let user = this.name
        commit('SET_USER', user)
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  onSubmit ({ commit }, newUser) {
    axios.post('http://localhost:3030/user/add', newUser)
      .then((response) => {
        console.log(response.data)
        window.location = 'http://localhost:8080/#/checkin'
      })
      .catch((error) => {
        console.log(error)
      })
  },
  changeData ({ commit }, randomNums) {
    console.log(randomNums)
    state.seat = state.Seats[randomNums[0]] + randomNums[1]
    state.fixedPrice = 0
    state.seatPrice = 0
    state.totalPrice = 0
    state.msg = 'Selected Seat:'
    this.disablebutton = true
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
