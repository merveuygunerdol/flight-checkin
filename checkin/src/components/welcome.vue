<template>
  <div>
    <b-container>
      <h1> {{ msg }} </h1>
      <b-row>
        <b-col sm></b-col>
        <b-col sm><b-form @submit="Send" v-if="show">
        <b-form-group id="exampleInputGroup2"
                      label="Your Name:"
                      label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="text"
                        v-model="name"
                        required
                        placeholder="Enter name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup1"
                      label="Email address:"
                      label-for="exampleInput1"
                      description="We'll never share your email with anyone else.">
          <b-form-input id="exampleInput1"
                        type="email"
                        v-model="email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleGroup4">
          <b-form-checkbox-group  id="exampleChecks">
            <b-form-checkbox id="checkbox1"
                            v-model="status"
                            value="checked">
                  I accept terms and conditions
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button :disabled="status[0] != 'checked'" type="submit" variant="primary">Continue</b-button>
      </b-form>
      </b-col>
      <b-col sm></b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Welcome to HelloAirlines Check-in Service',
      email: '',
      name: '',
      show: true,
      status: ['unchecked']
    }
  },
  methods: {
    Send (evt) {
      evt.preventDefault()
      let newUser = {
        fullname: this.name,
        email: this.email
      }
      console.log(newUser)
      this.$store.dispatch('onSubmit', newUser)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
