<template>
  <div id="app">
    <Header />

    <Calendar :registered="registered" :showAdd="showAdd" />
    
    <Add v-if="showAdd" :date="addDate" />
    
  </div>
</template>

<script>
import axios from 'axios';

import Header from './components/Header.vue';
import Calendar from './components/Calendar.vue';
import Add from './components/Add.vue';

export default {
  name: 'App',
  components: {
    Header,
    Calendar,
    Add
  },
  props: {
    registered: Object,
    showAdd : Boolean,
    addDate: Object
  },
  computed: {

  },
  methods: {
    getRegistered: function() {
      const _this = this;
      axios.get('http://'+window.location.hostname +':9000/registered')
      .then(res => {
        // console.log(res, res.data)
        _this.$set(_this._props, 'registered', res.data)
      });
    }
  },
  mounted() {
    this.$emit("showAdd", true) ;
    this.getRegistered();
  },
}


// axios.get('http://'+window.location.hostname +':9000/registered')
// .then(res => {
//   console.log(res, res.data)
//     // this.handlePlayerUpdate(res.data);
// })

// axios.get('http://'+window.location.hostname +':9000/games')
// .then(res => {
//     this.setState(
//         {recentGames: res.data});
// })

// let data = JSON.stringify(cars);
// fs.writeFileSync("/store/data.json", data);

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #401465;
}
</style>
