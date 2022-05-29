<template>
  <b-breadcrumb class="menu">
    <b-breadcrumb-item>
      <b-icon class="link-item-icon" icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      <router-link class="link-item" to="/homepage">Home</router-link>
    </b-breadcrumb-item>
    <b-breadcrumb-item>
      <b-icon class="link-item-icon" icon="arrow-down" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      <b-link class="link-item" @click="$bvModal.show('modal-debit')">Debit</b-link>
    </b-breadcrumb-item>
    <b-breadcrumb-item>
      <b-icon class="link-item-icon" icon="arrow-up" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      <b-link class="link-item" @click="$bvModal.show('modal-credit')">Credit</b-link>
    </b-breadcrumb-item>
    <b-breadcrumb-item>
      <b-icon class="link-item-icon" icon="power" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      <b-link class="link-item" @click.prevent="RemoveCookie">Exit</b-link>
    </b-breadcrumb-item>
    <b-modal id="modal-debit">
      <template #modal-header>
        <h5>Make a debit</h5>
      </template>

      <template>
        <o-debit></o-debit>
      </template>

      <template #modal-footer="{ close }">
        <b-button size="sm" variant="danger" @click="close()">
          Exit
        </b-button>
      </template>
    </b-modal>
    <b-modal id="modal-credit">
      <template #modal-header>
        <h5>Make a credit</h5>
      </template>

      <template>
        <o-credit></o-credit>
      </template>

      <template #modal-footer="{ close }">
        <b-button size="sm" variant="danger" @click="close()">
          Exit
        </b-button>
      </template>
    </b-modal>

  </b-breadcrumb>
</template>

<script>
import Cookie from "js-cookie";
import ODebit from "@/components/organisms/ODebit";
import OCredit from "@/components/organisms/OCredit";

export default {
  name: "NavbarComponent",
  components: {
    ODebit,
    OCredit
  },
  methods: {
    RemoveCookie() {
      Cookie.remove('_my_app_token');
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>
.menu {
  border-radius: 20px;
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