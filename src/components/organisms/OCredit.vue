<template>
  <div>
    <b-form class="w-50">
    <b-input-group>
      <b-form-input @submit="withdraw"
                    class="mb-3 col-sm"
                    v-model="withdrawValue" v-money="money"
                    placeholder="Enter credit value">
      </b-form-input>
    </b-input-group>
    <b-button type="submit" @click="withdraw()">Credit</b-button>
  </b-form>
  </div>
</template>

<script>
import { VMoney } from "v-money";
import Cookie from "js-cookie";
import {default as axios} from "axios";

export default {
  name: "OCredit",
  data() {
    return {
      withdrawValue: '',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: ' #',
        precision: 2,
        masked: false
      }

    }
  },
  directives: {money: VMoney},
  methods: {
    withdraw() {
      const token = Cookie.get('_my_app_token');
      console.log(token)
      axios({
        method: 'post',
        url: 'http://localhost/api/credit',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },
        data: {
          value: this.withdrawValue.replace(/[^0-9,]*/g, '').replace(',', '.')
        }
      }).then(res => {
        console.log(res);
        window.location.reload()
      })
    }
  }
}
</script>

<style scoped>

</style>