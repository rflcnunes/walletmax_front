<template>
  <div>
    <b-form class="w-50">
      <b-input-group>
        <b-form-input @submit="deposit"
                      class="mb-3 col-sm"
                      v-model="depositValue" v-money="money"
                      placeholder="Enter debit value">
        </b-form-input>
      </b-input-group>
    </b-form>
    <b-button-group>
      <b-button type="submit" @click="deposit()">Debit</b-button>
    </b-button-group>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { VMoney } from "v-money";
import {default as axios} from "axios";

export default {
  name: "ODebit",
  data() {
    return {
      depositValue: '',
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
    deposit() {
      const token = Cookie.get('_my_app_token');
      console.log(token)
      axios({
        method: 'post',
        url: 'https://walletmax-api.herokuapp.com/api/debit',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },
        data: {
          value: this.depositValue.replace(/[^0-9,]*/g, '').replace(',', '.')
        }
      }).then(res => {
        console.log(res);
        window.location.reload()
      })
    },
  }
}
</script>

<style scoped>

</style>