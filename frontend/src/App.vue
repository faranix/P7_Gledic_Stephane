<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// Service
import Service from '@/service/service.js';

export default {
  name: 'App',
  beforemount() {
    const storageUser = localStorage.getItem('user');

    // Permet de remettre les anciennes valeurs si le localstorage est modifier
    Service.blockLocalStorage(storageUser);
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>



