<template>
  <div class="home">
    <div class="container">
      <form class="row align-items-center" @submit.stop.prevent="submit">
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Small" label-for="input-sm">
          <b-form-input v-model="form.username" id="input-sm" size="sm"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Small" label-for="input-sm">
          <b-form-input v-model="form.password" type="password" id="input-sm" size="sm"></b-form-input>
        </b-form-group>
        <b-button type="submit">Button</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';

export default {
  name: 'HomeView',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      const payload = {
        email: this.form.username,
        password: this.form.password,
      };
      const token = Cookie.get('_my_app_token');

      const headers = {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json',
        'Access': 'application/json'
      }

      fetch(`http://localhost/api/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      }).then(response => response.json())
          .then(res => {
            console.log(res);
            Cookie.set('_my_app_token', res.token);
          })
    },
  }
}
</script>
