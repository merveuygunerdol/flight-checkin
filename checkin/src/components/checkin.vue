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
          <div v-for="row in seatsList[1]" :key="row"> {{ row[1]}} <br></div>
            <div v-for="(seats, index) in seatsList" :key="index">
              <div v-if="seats != 'empty-column'"><br>
                <div v-for="seat in seats" :key="seat">
                  <button v-bind:class="{button_hidden: seat == 'e'}"  class="button" :disabled="disablebutton"  @click="selectSeat(seat)">{{seat[0]}}{{seat[1]}}</button><br>
                </div>
              </div>
            </div>
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
      'seatsList',
      'seats',
      'seatPrice',
      'totalPrice',
      'clickedButton',
      'isActive',
      'activeModal',
      'user',
      'seat'
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
        this.$store.dispatch('reload')
      }
    },
    random () {
      this.$store.dispatch('randomNumbers')
      console.log(this.$store.state.randomNums[1])
      console.log(this.$store.state.randomNums[0])
      this.$store.dispatch('randomSeat')
      this.startTimer()
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      let data = {
        isActive: false,
        seatPrice: 0,
        fixedPrice: 8,
        totalPrice: 0,
        msg: 'Select a Seat...',
        seat: '',
        activeModal: false
      }
      this.$store.dispatch('changeData', data)
      this.$refs.myModalRef.hide()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button_hidden {
  visibility: hidden
}
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
  height: 25px;
  width: 25px;
  color: white;
  margin: 8px 8px 0;
  border-color:darkgrey;
  display: inline-block;
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
