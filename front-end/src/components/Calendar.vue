<template>
<div>
    <!--<label for="monthSelect"> Maand </label>
    <select id="monthSelect">
        <option v-for="m in months" :key="m"  :selected="months[month] == m ? true : false">
            {{m}}
        </option>
    </select>

    <label for="yearSelect"> Jaar </label>
    <select id="yearSelect">
        <option v-for="y in years" :key="y"  :selected="years[year] == y ? true : false">
            {{y}}
        </option>
    </select>-->
    <h3>{{months[month]}} {{year}}</h3>
    <div class="month">
        <div  v-for="(day) in Number(weekDayOfMonth)" :key="'empty' + day">
            <div class="day">
            </div>
        </div> 
        <div v-for="(currday) in Number(daysInMonth)" :key="currday">
            <div class="day" v-if="new Date(year, month, currday).getDay() !== 0 && new Date(year, month, currday).getDay() !== 6">
                <button class="add" @click="add(new Date(year, month, currday))" title="add">+</button>
                <div class="day__header">
                <!--{{year}}-{{month}}-{{currday}}
                utc:{{new Date(year, month, currday).getUTCDay()}}-->
                    {{days[new Date(year, month, currday).getDay()]}} {{currday}}
                </div>
                <ul class="list" v-if='typeof registered != "undefined"'>
                    <li 
                        v-for="register in registered.savedDates" :key="register.employee + register.date"
                        v-if="register.date && 
                            new Date(register.date).getDate() == new Date(year, month, currday).getDate() && 
                            new Date(register.date).getMonth() == new Date(year, month, currday).getMonth()">
                        <button class="text" @click="remove(register.employee, register.date)" :title="'Verwijder ' + register.employee">{{register.employee}} <span> - </span></button>
                    </li>
                </ul>
            </div>
            <div class="day day--weekend" v-else>
                <div class="day__header">
                    {{days[new Date(year, month, currday).getDay()]}} {{currday}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import * as moment from 'moment';
import 'moment/locale/nl';
import axios from 'axios';

export default {
  name: 'Calendar',
  props: {
      registered: Object,
      showAdd: Boolean,
      months: Array,
      days: Array
  },
  methods : {
    add: function(date) {
        console.log('add to', date);
        // this.$emit("showAdd", true);
        // console.log(this.$root.$children[0])
        this.$set(this.$root.$children[0]._props, 'showAdd', true);
        this.$set(this.$root.$children[0]._props, 'addDate', date);
        // this.$emit("addDate", date);
    },
    remove: function(employee, date) {
        if (confirm(`Wil je ${employee} echt verwijderen van ${this._props.days[new Date(date).getUTCDay()]} ${new Date(date).getDate()} ${this._props.months[new Date(date).getUTCMonth()]}?`)){
            axios.post('http://'+window.location.hostname +':9000/removeEmployee', {
                "employee": employee,
                "date" : date
            }) .then(res => {
                // alert('success!')
                this.$root.$children[0].getRegistered()
            })
        }
    }
  },
  computed: {
    dateTime() {
        return new Date();
    },
    year() {
        return this.dateTime.getFullYear()
    },
    // years() {
    //     return [2020, 2021, 2022]
    // },
    month() {
        return this.dateTime.getUTCMonth();
    },
    weekDayOfMonth() {
        return new Date(this.year, this.month, 1).getDay()
    },
    daysInMonth() {
        return new Date(this.year, this.month, 0).getDate()
    },
    weekDay() {
        return this.dateTime.getDay()
    },
  }
}

</script>

<style lang="scss">
    .month {
        display: grid;
        grid-template-columns: repeat(7, minmax(125px, 1fr));
        gap: 6px;
    }
    .day {
        height: 100%;
        min-height: 100px;
        border: 1px solid #401465;
        border-radius: 5px 5px 0 0;
        position: relative;

        &--empty {
            border-color: transparent;
        }

        &--weekend {
            background: #ededed;
            opacity: .5
        }

        &__header {
            background: #401465;
            color: white;
            padding: 2px 4px;
            font-size: 90%;
        }
    }
    
    .list {
        padding: 4px;
    }

    .add {
        // background: rgba(#401465, .2);
        background: lighten(#401465, 70%);
        font-size: 120%;
        position: absolute;
        top: 1px;
        right: 1px;
        padding: 0 5px 3px;
        line-height: .9em;
        border: 1px solid #401465;
        opacity: 0;
        pointer-events: none;
        transition: all .25s ease-in;
        border-radius: 5px;
        // z-index: 2;

        &:hover {
            cursor: pointer;
        }
    }

    .text {
        background: none;
        border: none;
        padding: 0;
        color: #401465;
        display: block;
        width: 100%;
        text-align: left;

        span {
            float: right;
            border: 1px solid #401465;
            border-radius: 5px;
            padding: 0 5px 3px;
            line-height: 1em;
            opacity: 0;
        }

        &:hover {
            cursor: pointer;
            text-decoration: underline;

            span {
                opacity: 1;
            }
        }
        
    }

    .day:hover .add,
    .day:focus .add,
    .day:focus-within .add {
        opacity: 1;
        pointer-events: initial;
        transition: all .25s ease-in;
    }

    .list {
        margin: 0;
        list-style-type: none;
    }

</style>