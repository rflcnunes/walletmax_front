<template>
<div class="home">
  <div class="container">
    <o-login></o-login>
  </div>
</div>
</template>

<script>
import OLogin from "@/components/organisms/OLogin";

export default {
  name: "LoginView",
  components: {
    OLogin
  }
}
</script>

<style scoped>

</style>