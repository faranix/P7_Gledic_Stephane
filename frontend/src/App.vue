<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// Les Services
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