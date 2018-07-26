<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm>
          {{msg}}<h1>{{seat}}</h1>
          Seat Price <h1>{{seatPrice}} €</h1>
          Check-in Price<h1>{{fixedPrice}} €</h1>
          Total Price<h1>{{totalPrice}} €</h1>
        </b-col>
        <span class="rowNumber" v-for="seats in 12" :key="seats">
          <span class="rowLetter" v-if="seats % 4 !== 0">{{Seats[seats-1]}}</span>
            <b-col v-if="seats % 4 == 0" sm>
              <span v-if="seats == 12" v-for="seat in 21" :key="seat">
                <span class="rowLetter" v-if="seat != 0"  :key="seat">
                  {{seat-1}}<br>
                </span>
              </span>
            </b-col>
            <b-col sm v-else>
              <span v-for="seat in 20" :key="seat">
                <button v-if="clickedButton == Seats[seats-1]+seat" v-bind:class="{button_clicked: isActive}" :disabled="disablebutton" class="button" @click="selectSeat(Seats[seats-1]+seat)"></button>
                <button v-else :disabled="disablebutton" class="button" @click="selectSeat(Seats[seats-1]+seat)"></button><br>
              </span>
            </b-col>
        </span>
        <b-col sm>
          <h2>Welcome</h2>
          <h3>{{ user }}</h3>
            Time Left to Check-out<h3>{{minute}}.{{second}}</h3>
              <!-- <b-button v-if="checkout_button" class="button_space" variant="success">Check-out</b-button> -->
              <b-button class="button_space" :disabled="disablebutton" @click="random">Continue without selecting seat</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-modal ref="myModalRef" hide-footer title="Pick This Seat">
        <div class="d-block text-center">
          <h3>Are you sure to select {{seat}}?</h3>
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">NO</b-btn>
        <b-btn z variant="outline-success" block @click="startTimer">YES</b-btn>
    </b-modal>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      selectedSeat: '',
      email: '',
      second: 0,
      minute: 3,
      duration: 0,
      // checkout_button: false,
      disablebutton: false
    }
  },
  mounted () {
    this.$store.dispatch('fetchUser')
  },
  computed: {
    ...mapState([
      'msg',
      'fixedPrice',
      'Seats',
      'seat',
      'seatPrice',
      'totalPrice',
      'clickedButton',
      'isActive',
      'activeModal',
      'user'
    ])
  },
  watch: {
    activeModal (show, hide) {
      if (hide) {
        this.$refs.myModalRef.hide()
      }
      if (!show) return
      this.$refs.myModalRef.show()
    }
  },
  methods: {
    ...mapActions([
      'selectSeat'
    ]),
    startTimer () {
      this.checkout_button = true
      this.duration = 0
      this.disablebutton = true
      this.$refs.myModalRef.hide()
      setInterval(this.timer, 1000)
    },
    timer () {
      if (this.duration < 180) {
        if (this.second == 0) {
          this.minute = this.minute - 1
          this.second = 59
          if (this.minute == -1) {
            this.minute = 2
            this.second = 59
          }
          this.duration++
        } else {
          this.second -= 1
          this.duration++
        }
      } else {
        this.disablebutton = false
        this.second = 0
        this.minute = 3
        this.isActive = true
        window.location.reload()
      }
    },
    random () {
      let ran1 = Math.floor(Math.random() * (7 - 1 + 1)) + 1
      let ran2 = Math.floor(Math.random() * (20 - 1 + 1)) + 1
      let randomNums = [ran1, ran2]
      if (randomNums[0] !== 3 && randomNums[1] !== 7) {
        this.$store.dispatch('changeData', randomNums)
        this.startTimer()
      }
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$store.state.isActive = false
      this.$store.state.seatPrice = 0
      this.$store.state.fixedPrice = 8
      this.$store.state.totalPrice = 0
      this.$store.state.msg = 'Select a Seat...'
      this.$store.state.seat = ''
      this.$store.state.activeModal = false
      this.$refs.myModalRef.hide()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rowLetter {
    font-weight: 800;
    text-align: center;
}
.button_space {
  margin: 1em
}
.button {
  background-color: rgb(179, 184, 189);
  border-radius: 3px;
  height: 1em;
  width: 1em;
}
.button_clicked {
    background-color: rgb(199, 42, 120);
    border-radius: 3px;
    height: 1em;
    width: 1em;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
