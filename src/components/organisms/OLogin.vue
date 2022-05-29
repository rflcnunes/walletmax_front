<template>
  <div class="container">
    <b-form @submit.prevent="submit">
      <div>
        <b-form-group
            id="username-input-label"
            label="Email address:"
            label-for="username-input"
        >
          <b-form-input
              id="username-input"
              v-model="form.username"
              type="email"
              placeholder="Enter email"
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedback"
              :state="state"
              trim
              autocomplete="off"
              required
          ></b-form-input>
        </b-form-group>
      </div>
      <b-form-group
          id="password-input-label"
          label="Password:"
          label-for="password-input"
      >
        <b-form-input
            id="password-input"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            :invalid-feedback="invalidFeedbackPassword"
            :state="statePassword"
            trim
            aria-autocomplete="none"
            required
        ></b-form-input>
      </b-form-group>
      <b-button class="btn" type="submit">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import Cookie from 'js-cookie';

export default {
  name: "OLogin",
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    state() {
      return this.form.username.length >= 5
    },
    invalidFeedback() {
      if (this.form.username.length > 0) {
        return 'Enter at least 5 characters.'
      }
      return 'Please enter something.'
    },
    statePassword() {
      return this.form.password.length >= 5
    },
    invalidFeedbackPassword() {
      if (this.form.password.length > 0) {
        return 'Enter at least 5 characters.'
      }
      return 'Please enter something.'
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

<style scoped>
h1 {
  text-align: center;
}

.container {
  max-width: 50%;
  min-width: 25%;
  margin-top: 20%;
}

#username-input-label, #password-input-label {
  margin: 15px;
  max-width: 100%;
  min-width: 30%;
}

.btn {
  max-width: 100%;
  min-width: 25%;
  border: 0;
  margin: 0 50% 0 37%;
  background-color: #2c3e50;
}
</style>