<template>
  <div class="container">
    <NavbarComponent></NavbarComponent>
    <div class="row align-items-center">
      <div>
        <h5>Hello, {{ userName }}</h5>
        <h5>Total balance: <money disabled class="inputBalance" v-model="totalBalance" v-bind="money"></money></h5>
      </div>
      <b-form class="w-50">
        <b-input-group prepend="$" append=".00">
          <b-form-input @submit="deposit"
                        class="mb-3 col-sm"
                        v-model="depositValue"
                        placeholder="Enter debit value">
          </b-form-input>
        </b-input-group>
      </b-form>
      <b-form class="w-50">
        <b-input-group prepend="$" append=".00">
          <b-form-input @submit="withdraw"
                        class="mb-3 col-sm"
                        v-model="withdrawValue"
                        placeholder="Enter credit value">
          </b-form-input>
        </b-input-group>
      </b-form>
    </div>
    <div class="row align-items-center mb-5">
      <b-button-group>
        <b-button type="submit" @click="deposit()">Debit</b-button>
        <b-button type="submit" @click="withdraw()">Credit</b-button>
      </b-button-group>
    </div>
    <b-table :per-page="perPage"
             id="historicList"
             :current-page="currentPage"
             striped hover
             :fields="fields"
             :items="historic">
      <template v-slot:cell(value)="data">
<!--        v-bind:value="!!data.value.is_active"-->
        <h6><money disabled class="inputBalance" v-model="data.value" v-bind="money"></money></h6>
      </template>
    </b-table>
    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="historicList"
        align="center"
        class="paginate"
    >
      <template #first-text><span class="text-success">First</span></template>
      <template #prev-text><span class="text-danger">Prev</span></template>
      <template #next-text><span class="text-warning">Next</span></template>
      <template #last-text><span class="text-info">Last</span></template>
    </b-pagination>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import moment from "moment";
import { Money } from "v-money";
import NavbarComponent from "@/components/NavbarComponent";

const axios = require('axios').default;

export default {
  name: "HomePageView",
  components: {
    Money,
    NavbarComponent,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      historic: [],
      totalBalance: '',
      userName: '',
      depositValue: '',
      withdrawValue: '',
      fields: [
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'type',
          label: 'TYPE'
        },
        {
          key: 'value',
          label: 'VALUE'
        },
        {
          key: 'date',
          label: 'DATE',
          formatter: (value) => this.formatterDate(value),
        },
      ],
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
  created() {
    this.getAll();
    this.getBalance();
  },
  computed: {
    rows() {
      return this.historic.length
    }
  },
  methods: {
    formatterDate(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    getAll() {
      const token = Cookie.get('_my_app_token');
      axios.get('http://localhost/api/balance', {
        headers: {
          'Authorization': "Bearer " + token,
        }
      }).then(response => {
        console.log(response.data);

        this.historic = response.data.data;

      }).catch(function (error) {
        console.log(error);
      })
    },

    getBalance() {
      const token = Cookie.get('_my_app_token');
      axios.get('http://localhost/api/balance/json', {
        headers: {
          'Authorization': "Bearer " + token,
        }
      }).then(response => {
        console.log(response.data.data.value);

        this.userName = response.data.data.username;
        this.totalBalance = response.data.data.value;

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
        window.location.reload()
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
        window.location.reload()
      })
    }

  }
}
</script>

<style scoped>
.inputBalance {
  border: 0;
  background: none;
  color: black;
}
</style>