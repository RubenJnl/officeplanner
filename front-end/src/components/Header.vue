<template>
  <header>
    <img alt="Vue logo" src="./../assets/logo.png">
    <h1> Office planner </h1>
  </header>
</template>

<script>


export default {
  name: 'Header',
  components: {
      
  }
}
</script>

<style>
header {
    display: grid;
    grid-template-columns:  minmax(70px, 87px) 11fr;
    gap: 18px;
    vertical-align: baseline;
    margin-bottom: 16px;
}

header img {
    max-width: 100%;
    vertical-align: middle;
}
</style>
