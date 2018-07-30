import axios from 'axios'
import VueRouter from 'vue-router'
import Vue from 'vue'
import checkin from '../components/checkin'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/checkin',
      name: 'checkin',
      component: checkin
    }
  ]
})
const state = {
  msg: 'Select a Seat...',
  fixedPrice: 8,
  seatsList: {
    'A': ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16', 'A17', 'A18', 'A19', 'A20'],
    'B': ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20'],
    'C': ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', 'C19', 'C20'],
    'D': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18', 'D19', 'D20'],
    'E': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17', 'E18', 'E19', 'E20'],
    'F': ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20'],
    'G': ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13', 'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20'],
    'H': ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17', 'H18', 'H19', 'H20'],
    'I': ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'I12', 'I13', 'I14', 'I15', 'I16', 'I17', 'I18', 'I19', 'I20']
  },
  rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  seatPrice: 0,
  totalPrice: 0,
  clickedButton: '',
  isActive: false,
  activeModal: false,
  user: '',
  randomNums: []
}

const getters = {}

const mutations = {
  SET_SEAT (state, selectedSeat) {
    state.seat = selectedSeat
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_SEATPRICE (state, seatp) {
    state.seatPrice = seatp
  },
  SET_FIXEDPRICE (state, fixedp) {
    state.fixedPrice = fixedp
  },
  SET_TOTALPRICE (state, totalp) {
    state.totalPrice = totalp
  },
  SET_MSG (state, msg) {
    state.msg = msg
  },
  SET_MODAL (state, status) {
    state.activeModal = status
  },
  SET_RANDOMSEAT (state, seat) {
    state.seat = seat
    state.fixedPrice = 0
    state.seatPrice = 0
    state.totalPrice = 0
    state.msg = 'Selected Seat:'
  },
  SET_ACTIVITY (state, status) {
    state.isActive = status
  },
  SET_RANDOMNUMS (state, nums) {
    state.randomNums = [nums[0], nums[1]]
  },
  SET_BUTTON (state, button) {
    state.clickedButton = button
  }
}
const actions = {
  selectSeat ({commit}, selectedSeat) {
    commit('SET_ACTIVITY', true)
    commit('SET_BUTTON', selectedSeat)
    if (selectedSeat[0] == 'A' || selectedSeat[0] == 'I') {
      commit('SET_SEATPRICE', 10)
    }
    if (selectedSeat[0] == 'C' || selectedSeat[0] == 'D' || selectedSeat[0] == 'F' || selectedSeat[0] == 'G') {
      commit('SET_SEATPRICE', 8)
    }
    if (selectedSeat[0] == 'B' || selectedSeat[0] == 'E' || selectedSeat[0] == 'H') {
      commit('SET_SEATPRICE', 5)
    }
    if (selectedSeat[2]) {
      commit('SET_SEAT', selectedSeat[0] + '-' + selectedSeat[1] + selectedSeat[2])
    } else {
      commit('SET_SEAT', selectedSeat[0] + '-' + selectedSeat[1])
    }
    commit('SET_TOTALPRICE', state.seatPrice + state.fixedPrice)
    commit('SET_MSG', 'Selected Seat:')
    commit('SET_MODAL', true)
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
        router.push('checkin')
        router.go('checkin')
        commit('SET_ACTIVITY', false)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  randomNumbers ({ commit }) {
    let ran1 = Math.floor(Math.random() * (7 - 1 + 1)) + 1
    let ran2 = Math.floor(Math.random() * (20 - 1 + 1)) + 1
    commit('SET_RANDOMNUMS', [ran1, ran2])
  },
  randomSeat ({ commit }, randomNums) {
    let letter = state.rows[state.randomNums[0]]
    commit('SET_RANDOMSEAT', letter + '-' + state.randomNums[1])
    this.disablebutton = true
  },
  changeData ({ commit }, data) {
    commit('SET_ACTIVITY', data.isActive)
    commit('SET_SEATPRICE', data.seatPrice)
    commit('SET_FIXEDPRICE', data.fixedPrice)
    commit('SET_TOTALPRICE', data.totalPrice)
    commit('SET_MSG', data.msg)
    commit('SET_SEAT', data.seat)
    commit('SET_MODAL', data.activeModal)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
