<template>
<div>
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
import { Money } from "v-money";
import Cookie from "js-cookie";
import {default as axios} from "axios";
import moment from "moment";
export default {
  name: "OHistoric",
  components: {
    Money,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      historic: [],
      userName: '',
      totalBalance: '',
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
  },
  computed: {
    rows() {
      return this.historic.length
    },
  },
  methods: {
    formatterDate(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    getAll() {
      const token = Cookie.get('_my_app_token');
      axios.get('https://walletmax-api.herokuapp.com/api/historic', {
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