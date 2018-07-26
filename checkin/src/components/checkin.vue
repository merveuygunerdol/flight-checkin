<template>
    <div>
        <b-container>
            <b-row>
              <b-col sm>{{msg}}<h1>{{seat}}</h1>
                Seat Price <h1>{{seatprice}} €</h1>
                  Check-in Price<h1>{{fixedprice}} €</h1>
                  Total Price<h1>{{totalprice}} €</h1>
              </b-col>
                <span class="rowNumber" v-for="seats in 12" :key="seats">
                <span class="rowLetter" v-if="seats % 4 !== 0">{{Seats[seats-1]}}</span>
                    <b-col v-if="seats % 4 === 0">
                        <span v-if="seats == 12" v-for="n in 21" :key="n">
                            <span class="rowLetter" v-if="n != 0"  :key="n">
                        {{n-1}}<br>
                            </span>
                        </span>
                    </b-col>
                    <b-col sm v-else>
                        <span v-for="n in 20" :key="n">
                        <button @click="selectSeat(Seats[seats-1]+n)"></button><br>
                        </span>
                    </b-col>
                </span>
                <b-col sm>
                  <b-button class="gon" variant="success">Check-out</b-button>
                  <b-button class="gon">Continue without selecting seat</b-button>
                    </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  data () {
    return {
      Seats: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
      seat: '',
      msg: 'Select a Seat...',
      fixedprice: 8,
      totalprice: 0,
      seatprice: 0
    }
  },
  methods: {
    selectSeat (seat) {
      if (seat[0] === 'A' || seat[0] === 'K') {
        this.seatprice = 10
      }
      if (seat[0] === 'C' || seat[0] === 'D' || seat[0] === 'F' || seat[0] === 'G') {
        this.seatprice = 8
      }
      if (seat[0] === 'B' || seat[0] === 'E' || seat[0] === 'H') {
        this.seatprice = 5
      }
      this.seat = seat[0] + '-' + seat[1]
      this.msg = 'Selected Seat'
      this.totalprice = this.seatprice + this.fixedprice
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
.gon {
    margin: 1em;
}
button:focus {
    background-color: rgb(55, 0, 255);
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
