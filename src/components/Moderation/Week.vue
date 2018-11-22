<template>
  <div class="scroll">
    <h2>Week Schedule</h2>
    <div class="stu_list">
      <table>
        <tr>
          <th></th>
          <th>Week</th>
          <th>Date</th>
        </tr>
        <tr class="list" v-for="(week,week_index) of weeks" v-bind:key="week['.key']">
          <td>{{week_index+1}}</td>
          <td>{{week.name}}</td>
          <td>{{week.dateS}}</td>
        </tr>
      </table>
      <v-btn color="error" @click="deleteW()">Clear</v-btn>
    </div>
    <div>
      <h3>Set new semester date:</h3><br/>
      <div id="addField">
        <v-container fluid>
          <v-layout row>
            <v-flex xs4 class="additem">
              <h4>First Day of Semester</h4>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs1 class="additem">
              <v-select required
                :items="dItems"
                v-model="newD"
                label="Day"
                single-line
                item-value="text"
              ></v-select>
            </v-flex>

            <v-flex xs1 class="additem">
              <v-select required
                :items="mItems"
                v-model="newM"
                label="Month"
                single-line
                item-value="text"
              ></v-select>
            </v-flex>

            <v-flex xs1 class="additem">
              <v-text-field required
                label="Year"
                v-model="newY"
                mask="####"
              ></v-text-field>
            </v-flex>

          </v-layout>
          <v-layout row>
            <v-flex xs2 class="additem">
              <h4>Semester Duration:</h4>
            </v-flex>
            <v-flex xs1 class="additem">
              <v-text-field required
                label="week(s)"
                v-model="totalW"
                mask="##"
              ></v-text-field>
            </v-flex>
            <v-flex class="additem">
              <v-btn @click="calculate()" color="success">Set</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { weekRef } from './../../firebase';
export default {
  firebase: {
    weeks: weekRef
  },
  data() {
    return {
      newD:1,
      newM:1,
      newY:2018,
      strD:"",
      strM:"",
      strY:"",
      tempD:0,
      tempM:0,
      tempY:0,
      totalW:8,
      firstDay:"",
      dateS:"",
      dateE:"",
      dItems:[
        {text:1},{text:2},{text:3},{text:4},{text:5},{text:6},{text:7},{text:8},{text:9},{text:10},
        {text:11},{text:12},{text:13},{text:14},{text:15},{text:16},{text:17},{text:18},{text:19},{text:20},
        {text:21},{text:22},{text:23},{text:24},{text:25},{text:26},{text:27},{text:28},{text:29},{text:30},{text:31}
      ],
      mItems:[
        {text:1},{text:2},{text:3},{text:4},{text:5},{text:6},
        {text:7},{text:8},{text:9},{text:10},{text:11},{text:12}
      ]
    }
  },
  mounted() {

  },
  methods: {
    deleteW() {
      var r = confirm("Press OK to REMOVE");
      if (r == true) {
        weekRef.remove()
      }
    },
    calculate() {
      var r = confirm("This will overwrite current records");
      if (r == true)
      if(this.validate())
      {
        var day1 = new Date(this.newY,this.newM-1,this.newD)//long format
        var nextweek = new Date(day1)
        var thisweekEnd = new Date(day1)

        weekRef.remove()
        for(var i=0;i<this.totalW;i++)
        {
          thisweekEnd.setDate(nextweek.getDate()+6)
          this.tempD=thisweekEnd.getDate()
          this.tempM=thisweekEnd.getMonth()+1
          this.tempY=thisweekEnd.getFullYear()
          this.dateE = this.tempD.toString()+"/"+this.tempM.toString()+"/"+this.tempY.toString()
          this.tempD=nextweek.getDate()
          this.tempM=nextweek.getMonth()+1
          this.tempY=nextweek.getFullYear()
          this.dateS = this.tempD.toString()+"/"+this.tempM.toString()+"/"+this.tempY.toString()
          if(i<9)
            weekRef.push({ name:"week0"+(i+1),
                            index:i+1,
                            dateS:this.dateS,
                            dateE:this.dateE,
                            startD: nextweek.getDate(),
                            startM: nextweek.getMonth()+1,
                            startY: nextweek.getFullYear(),
                            endD: thisweekEnd.getDate(),
                            endM: thisweekEnd.getMonth()+1,
                            endY: thisweekEnd.getFullYear() })
          else
            weekRef.push({ name:"week"+(i+1),
                            index:i+1,
                            dateS:this.dateS,
                            dateE:this.dateE,
                            startD: nextweek.getDate(),
                            startM: nextweek.getMonth()+1,
                            startY: nextweek.getFullYear(),
                            endD: thisweekEnd.getDate(),
                            endM: thisweekEnd.getMonth()+1,
                            endY: thisweekEnd.getFullYear() })
          nextweek.setDate(nextweek.getDate()+7)
        }
      }
    },
    validate() {
      var check=0
      if(this.totalW>0&&this.totalW<21)
      {
        check+=1
      }
      if(this.newY>2017)
      {
        this.strY = this.newY.toString()
        check+=1
      }
      if(this.newM>0&&this.newM<13)
      {
        if(this.newM<10) {
          this.strM = "0"+this.newM.toString()
        }
        else {
          this.strM = this.newM.toString()
        }
        check+=1
      }
      if(this.newD>0&&this.newD<32)
      {
        if(this.newM<10) {
          this.strD = "0"+this.newD.toString()
        }
        else {
          this.strD = this.newD.toString()
        }
        check+=1
      }
      if(check==4)
      {
        this.firstDay = this.strY + "/" + this.strM + "/" + this.strD
        return true
      }
      else {
        alert("Please check the date & total weeks");
        return false
      }
    }
  }
}
</script>

<style scoped>
@import './../../../static/styles/moderation.css';
</style>
