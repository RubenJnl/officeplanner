<template>
  <div class="modal">
    <div class="modalview">
        <h2>Toevoegen aan {{date}} {{readableDate}}</h2>
        <label for="nameInput">Naam</label>
        <input id="nameInput" type="text" />

        <div class="button-row">
            <button class="add-to" @click="addTo" >Toevoegen</button>
            <button class="" @click="cancelAdd">Annuleren</button>
        </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Add',
  props: {
      date: Object
  },
  data() {
      return {
          readableDate : 'geen'
      }
  },
  methods: {
      addTo: function(){
          console.log('add')
      },
      cancelAdd: function() {
        //   console.log('click cancel')
        this.$set(this.$root.$children[0]._props, 'showAdd', false);
      }
  },
  beforeUpdate: function() {
  console.log('change before update!')
        readableDate = moment(date).format('ll');
  },
  updated: function () {
      console.log('change!')
    this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been re-rendered
        console.log('change!')
        readableDate = moment(date).format('ll');
    })
  },
  watch : {
      date: function (date) { //date, olddate
      console.log('newdate', date)
    }
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
}
</style>
