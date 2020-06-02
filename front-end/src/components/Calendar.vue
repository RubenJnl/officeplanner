<template>
<div>
   <label for="monthSelect"> Maand </label>
    <!--<select id="monthSelect">
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
    {{months[month - 1]}} {{year}}
    <div class="month">
        <!-- <div  v-for="(day) in Number(weekDayOfMonth)" :key="'empty' + day">
            <div >
            x;{{weekDayOfMonth}} {{days[weekDayOfMonth]}} {{x(day)}}
            
            </div>
        </div> -->
        <div v-for="(currday) in Number(daysInMonth)" :key="currday">
            <div class="day" v-if="new Date(year, month, currday).getDay() !== 0 && new Date(year, month, currday).getDay() !== 6">
                <button class="add" @click="add(new Date(year, month, currday))">+</button>
                <div class="day__header">
                    {{days[new Date(year, month, currday).getDay()]}} {{currday}}
                </div>
                <ul class="list" v-if='typeof registered != "undefined"'>
                    <li 
                        v-for="register in registered.savedDates" :key="register.name + register.date"
                        v-if="register.date && 
                            new Date(register.date).getDate() == new Date(year, month, currday).getDate() && 
                            new Date(register.date).getMonth() == new Date(year, month, currday).getMonth() - 1">
                        {{register.employee}}
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
// console.log(moment(), moment(weekday))

export default {
  name: 'Calendar',
  props: {
      registered: Object,
      showAdd: Boolean
  },
  data() {
      return {
        months : [
            "januari",
            "februari",
            "maart",
            "april",
            "mei",
            "juni",
            "juli",
            "augustus",
            "semptember",
            "oktober",
            "november",
            "december"
        ],
        days : [
            "zondag",
            "maandag",
            "dinsdag",
            "woensdag",
            "donderdag",
            "vrijdag",
            "zaterdag"
        ]
    }
  },
  methods : {
    add: function(date) {
        console.log('add to', date, this);
        // this.$emit("showAdd", true);
        console.log(this.$root.$children[0])
        this.$set(this.$root.$children[0]._props, 'showAdd', true);
        this.$set(this.$root.$children[0]._props, 'addDate', date);
        // this.$emit("addDate", date);
    }
//     getDaysInMonth: function (month, year) {
//         this.$set(this._props, 'daysInMonth', new Date(year, month, 0).getDate())
//     }
  },
  computed: {
    dateTime() {
        return new Date();
    },
    year() {
        // console.log(this.dateTime)
        
        return this.dateTime.getYear()
    },
    years() {
        return [2020, 2021, 2022]
    },
    month() {
        // console.log(this.dateTime, this.dateTime.getMonth())
        
        return this.dateTime.getMonth() + 1;
    },
    weekDayOfMonth() {
        console.log('dag', this.days[new Date(this.year, this.month, 0).getDay()]);
        return new Date(this.year, this.month, 0).getDay()
    },
    // x(y) {
    //     console.log(moment)
    //     return moment.prototype.date(y)
    // },
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
        font-size: 150%;
        position: absolute;
        top: 1px;
        right: 1px;
        padding: 0 10px 3px;
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