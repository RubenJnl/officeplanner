<template>
  <div class="modal">
    <div class="modalview">
        <h2>Toevoegen aan {{readableDate}}</h2>
        <label for="nameInput">Naam</label>
        <input ref="name" id="nameInput" @keydown="changeInput" v-model="employeeName" type="text" />

        <div class="button-row">
            <button class="" @click="cancelAdd">Annuleren</button>
            
            <button class="add-to" @click="addTo" submit>Toevoegen</button>
        </div>
    </div>
  </div>
</template>

<script>

import * as moment from 'moment';
import axios from 'axios';

export default {
  name: 'Add',
  props: {
      addDate: Date,
      employeeName : String,
      months: Array,
      days: Array
  },
  data() {
      return {
        readableDate : 'geen'
      }
  },
  methods: {
      changeInput: function(e){
          if (e.keyCode == 13 || e.key == 'Enter'){
              this.addTo()
          }
      },
      addTo: function(){
        let employee = this.employeeName;

        axios.post('http://'+window.location.hostname +':9000/addEmployee', {
            "employee": employee,
            "date" : this._props.addDate
        }) .then(res => {
            this.$set(this.$root.$children[0]._props, 'showAdd', false);
            this.$root.$children[0].getRegistered()
        })
          
      },
      cancelAdd: function() {
        this.$set(this.$root.$children[0]._props, 'showAdd', false);
      }
  },
  mounted: function() {
    // console.log('change mounted!', this._props.addDate)
    let d = this._props.addDate,
        days = this._props.days,
        months = this._props.months;
    this.readableDate = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
    console.log(this.$refs.name.focus())
    this.$refs.name.$el.focus();

  }
}
</script>

<style lang="scss">
.modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.2);

}
.modalview {
    padding: 0 32px;
    margin: 0 auto;
    width: 50%;
    min-width: 300px;
    height: 50%;
    min-height: 300px;
    border: 1px solid #401465;
    border-radius: 5px;
    background: white;
    top: 50%;
    transform: translateY(50%);

    label {
        margin-right: 16px;
    }
}

.button-row {
    margin-top: 32px;
}

button {
    background: lighten(#401465, 70%);
    font-size: 100%;
    border: 1px solid #401465;
    pointer-events: none;
    transition: all .25s ease-in;
    border-radius: 5px;
    cursor: pointer;
    pointer-events: initial;
    padding: 3px 8px;

    &[submit] {
        background: lighten(#401465, 10%);
        color: white;
    }

    + button {
        margin-left: 16px;
    }
}
</style>
