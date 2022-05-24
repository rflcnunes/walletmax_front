<template>
  <b-breadcrumb class="menu">
    <b-breadcrumb-item>
      <b-icon class="link-item-icon" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      <router-link class="link-item" to="/homepage">Home</router-link>
    </b-breadcrumb-item>
    <b-breadcrumb-item>
      <b-icon class="link-item-icon" icon="power" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      <b-link class="link-item" @click.prevent="RemoveCookie">Exit</b-link>
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>
import Cookie from "js-cookie";

export default {
  name: "NavbarComponent",
  methods: {
    RemoveCookie() {
      Cookie.remove('_my_app_token');
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.menu {
  border-radius: 20px;
  margin: 20px 0 20px 0;
}

.link-item-icon {
  color: #2c3e50;
}

.link-item {
  background: none;
  color: black;
  text-decoration: none;
  margin-left: 10px;
}

</style>