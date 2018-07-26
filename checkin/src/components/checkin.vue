<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm>
          {{msg}}<h1>{{seat}}</h1>
          Seat Price <h1>{{seatprice}} €</h1>
          Check-in Price<h1>{{fixedprice}} €</h1>
          Total Price<h1>{{totalprice}} €</h1>
        </b-col>
        <span class="rowNumber" v-for="seats in 12" :key="seats">
          <span class="rowLetter" v-if="seats % 4 !== 0">{{Seats[seats-1]}}</span>
            <b-col v-if="seats % 4 == 0" sm>
              <span v-if="seats == 12" v-for="n in 21" :key="n">
                <span class="rowLetter" v-if="n != 0"  :key="n">
                  {{n-1}}<br>
                </span>
              </span>
            </b-col>
            <b-col sm v-else>
              <span v-for="n in 20" :key="n">
                <button v-if="clicked_button == Seats[seats-1]+n" v-bind:class="{button_clicked: isActive}" :disabled="disablebutton" class="button" @click="selectSeat(Seats[seats-1]+n)"></button>
                <button v-else :disabled="disablebutton" class="button" @click="selectSeat(Seats[seats-1]+n)"></button><br>
              </span>
            </b-col>
        </span>
        <b-col sm>
          <h2>Welcome</h2>
          <h3>{{name}}</h3>
            Time Left to Check-out<h3>{{minute}}.{{second}}</h3>
              <b-button v-if="checkout_button" class="button_space" variant="success">Check-out</b-button>
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
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  data () {
    return {
      Seats: ['A', 'B', 'C', ' ', 'D', 'E', 'F', ' ', 'G', 'H', 'I'],
      seat: '',
      msg: 'Select a Seat...',
      fixedprice: 8,
      totalprice: 0,
      seatprice: 0,
      name: '',
      email: '',
      second: 0,
      minute: 3,
      clicked_button: '',
      i: 0,
      checkout_button: false,
      isActive: false,
      disablebutton: false
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    startTimer () {
      this.checkout_button = true
      this.i = 0
      this.disablebutton = true
      this.$refs.myModalRef.hide()
      setInterval(this.timer, 1000)
    },
    timer () {
      if (this.i < 180) {
        if (this.second == 0) {
          this.minute = this.minute - 1
          this.second = 59
          if (this.minute == -1) {
            this.minute = 2
            this.second = 59
          }
          this.i++
        } else {
          this.second -= 1
          this.i++
        }
      } else {
        this.disablebutton = false
        this.second = 59
        this.minute = 2
        this.isActive = true
      }
    },
    selectSeat (seat) {
      console.log(seat)
      this.clicked_button = seat
      this.isActive = true
      this.showModal()
      if (seat[0] == 'A' || seat[0] == 'I') {
        this.seatprice = 10
      }
      if (seat[0] == 'C' || seat[0] == 'D' || seat[0] == 'F' || seat[0] == 'G') {
        this.seatprice = 8
      }
      if (seat[0] == 'B' || seat[0] == 'E' || seat[0] == 'H') {
        this.seatprice = 5
      }
      if (seat[2]) {
        this.seat = seat[0] + '-' + seat[1] + seat[2]
      } else {
        this.seat = seat[0] + '-' + seat[1]
      }
      this.msg = 'Selected Seat'
      this.fixedprice = 8
      this.totalprice = this.seatprice + this.fixedprice
    },
    fetchUser () {
      axios.get('http://localhost:3030/user/fetch')
        .then(response => {
          this.name = response.data.name
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    random () {
      let ran1 = Math.floor(Math.random() * (7 - 1 + 1)) + 1
      let ran2 = Math.floor(Math.random() * (20 - 1 + 1)) + 1
      if (ran1 !== 3 && ran1 !== 7) {
        this.seat = this.Seats[ran1] + ran2
        this.selectSeat(this.seat)
        this.fixedprice = 0
        this.seatprice = 0
        this.totalprice = 0
      }
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.isActive = false
      this.seatprice = 0
      this.fixedprice = 8
      this.totalprice = 0
      this.msg = 'Select a Seat...'
      this.seat = ''
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
