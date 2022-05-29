<template>
  <div id="app">
    <h1>WALLET<b>MAX</b></h1>
    <router-view/>
  </div>
</template>

<style>
#app {
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
