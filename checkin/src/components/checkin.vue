<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="../assets/airline.png">
      </div>
      <div class="header__title">
      <h1>Welcome to HelloAirlines Checkin Service! </h1>
      </div>
    </div>
    <div class="row">
      <div class="column side">
        <h2>{{msg}} {{seat}}</h2>
        <span class="bold">Seat Price: </span>{{seatPrice}} €<br>
        <span class="bold">Check-in Price: </span> {{fixedPrice}} €<br>
        <span class="bold">Total Price: </span>{{totalPrice}} €<br>
        <div>
          <h4>Time Left to Check-in:  {{minute}}.{{second}}</h4>
            <button :disabled="disablebutton" @click="random() + startTimer()">Continue without selecting seat</button>
        </div>
      </div>
      <div class="column middle">
        <h2>Seat Plan:</h2>
        <div v-for="(seats, index) in seatsList" :key="index">
          <div v-if="seats != 'empty-column'"><br>
            <div class="listSeat" v-for="seat in seats" :key="seat">
              <button v-bind:class="{button_hidden: seat == 'e'}"  class="button" :disabled="disablebutton"  @click="selectSeat(seat) + startTimer()">{{seat}}</button><br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import { mapState, mapActions } from 'vuex'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'checkin'
    }
  ]
})

export default {
  data () {
    return {
      name: '',
      email: '',
      second: 0,
      minute: 3,
      duration: 0,
      disablebutton: false
    }
  },
  // mounted () {
  //   this.$store.dispatch('fetchUser')
  // },
  computed: {
    ...mapState([
      'msg',
      'fixedPrice',
      'seatsList',
      'seats',
      'seatPrice',
      'totalPrice',
      'selectedSeat',
      'isActive',
      'user',
      'seat'
    ])
  },
  methods: {
    ...mapActions([
      'selectSeat',
      'random'
    ]),
    reload () {
      router.go()
    },
    startTimer () {
      this.duration = 0
      this.disablebutton = true
      setInterval(this.timer, 1000)
    },
    timer () {
      if (this.duration >= 180) return this.reload()
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
    }
    // random () {
    //   // this.startTimer()
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin: 0;
  box-sizing: border-box;
  display: grid;
}
.header {
  padding-left: 3%;
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  grid-gap: 10px
}
.logo {
  grid-column: span 1;
}
.header__title {
  grid-column: span 5;
}
.column {
  float: left;
  padding: 10px;
}
.column.side {
  width: 25%;
}
.column.middle {
  width: 50%;
}
.row {
  padding-left: 3%;
  margin-top: 60px;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.bold {
  font-weight: bold
}
.listSeat {
  display: inline-block;
}
.button_hidden {
  visibility: hidden
}
.rowLetter {
  font-weight: 800;
  text-align: center;
}
.button {
  background-color: rgb(179, 184, 189);
  border-radius: 3px;
  height: 25px;
  width: 25px;
  color: white;
  margin: 8px 8px 0;
  padding: 0;
  border:0;
  border-color:darkgrey;
  display: inline-block;
}
h1 {
  font-weight: bold;
}
h2 {
  font-weight: normal;
}
@media screen and (max-width: 600px) {
    .column.side, .column.middle {
        width: 100%;
    }
}
</style>
