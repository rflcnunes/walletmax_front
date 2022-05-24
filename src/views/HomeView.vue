<template>
  <div class="home">
    <div class="container">
      <b-form @submit="submit">
        <b-form-group
            id="username-input-label"
            label="Email address:"
            label-for="username-input"
            description="We'll never share your email with anyone else."
        >
          <b-form-input
              id="username-input"
              v-model="form.username"
              type="email"
              placeholder="Enter email"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="password-input-label"
            label="Password:"
            label-for="password-input"
            description="Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
        >
          <b-form-input
              id="password-input"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
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
            this.$router.push('/homepage')
          })
    },
  }
}
</script>
