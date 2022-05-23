<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col">
        <form @submit.stop.prevent="deposit">
          <h1>Deposit</h1>
          <div class="input-group mb-3 col-sm">
            <span class="input-group-text">$</span>
            <input type="number" v-model="depositValue" class="form-control"
                   aria-label="Amount (to the nearest dollar)">
            <span class="input-group-text">.00</span>
          </div>
        </form>
      </div>
      <div class="col">
        <form @submit.stop.prevent="withdraw">
          <h1>Withdraw</h1>
          <div class="input-group mb-3 col-sm">
            <span class="input-group-text">$</span>
            <input v-model="withdrawValue" type="number" class="form-control" aria-label="Amount (to the nearest dollar)">
            <span class="input-group-text">.00</span>
          </div>
        </form>
      </div>
    </div>
    <div class="mb-3 formBtn">
      <div class="btn-group" role="group">
        <button type="submit" @click="deposit()" class="btn btn-primary">Deposit</button>
        <button type="submit" @click="withdraw()" class="btn btn-primary">Withdraw</button>
      </div>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Type</th>
        <th scope="col">Value</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in historic" v-bind:key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.type }}</td>
        <td>U${{ item.value }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Cookie from "js-cookie";

const axios = require('axios').default;

export default {
  name: "HomePageView",
  data() {
    return {
      historic: [],
      depositValue: '',
      withdrawValue: '',
    }
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      const token = Cookie.get('_my_app_token');
      axios.get('http://localhost/api/balance', {
        headers: {
          'Authorization': "Bearer " + token,
        }
      }).then(response => {
        console.log(response.data.data);

        this.historic = response.data.data;

      }).catch(function (error) {
        console.log(error);
      })
    },

    deposit() {
      const token = Cookie.get('_my_app_token');
      console.log(token)
      axios({
        method: 'post',
        url: 'http://localhost/api/debit',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },
        data: {
          value: this.depositValue
        }
      }).then(res => {
        console.log(res);
      })
    },
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
          value: this.withdrawValue
        }
      }).then(res => {
        console.log(res);
      })
    }

  }
}
</script>

<style scoped>

</style>