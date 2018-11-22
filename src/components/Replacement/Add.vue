<template>
<div class="scroll">
  <div v-if="page=='default'">
    <h3>Add a replacement class</h3>
    <div id="addField" class="stu_list">
      <v-container fluid>
        <v-layout row>
          <v-flex xs4 class="additem">
            <v-text-field required
              label="Description"
              v-model="newRDesc"
              hint="Short Description"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="additem">
            <v-text-field required disabled
              label="Subject"
              v-model="newSubjectFULL"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 class="additem">
            <v-btn color="info" @click="page='subject'">Edit</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs1 class="additem">
            <h3 class="label">Class:</h3>
          </v-flex>
          <v-flex xs2 class="additem">
            <v-select required
              :items="classItems"
              v-model="newTitle"
              label="Class"
              single-line
              item-value="text"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 class="additem">
            <h3>Replacement for Week:</h3>
          </v-flex>
          <v-flex xs1 class="additem">
            <v-select required
              :items="weekItems"
              v-model="newWeek"
              label="Week"
              single-line
              item-value="text"
            ></v-select>
          </v-flex>
        </v-layout>
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
          <v-flex xs1 class="additem"><h4 class="label">START TIME</h4></v-flex>
          <v-flex xs2 class="additem">
            <v-select
              :items="hourItems"
              v-model="newHour1"
              label="Start Hour"
              single-line
              item-value="value"
            ></v-select>
          </v-flex>
          <v-flex xs1 class="additem">
            <v-select
              :items="minuteItems"
              v-model="newMin1"
              label="Minute"
              single-line
              item-value="value"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs1 class="additem"><h4 class="label">FINISH TIME</h4></v-flex>
          <v-flex xs2 class="additem">
            <v-select
              :items="hourItems"
              v-model="newHour2"
              label="Finish Hour"
              single-line
              item-value="value"
            ></v-select>
          </v-flex>
          <v-flex xs1 class="additem">
            <v-select
              :items="minuteItems"
              v-model="newMin2"
              label="Minute"
              single-line
              item-value="value"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="additem">
            <v-text-field required disabled
              label="Classroom"
              v-model="newRoom"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 class="additem">
            <v-btn color="info" @click="page='class'">Edit</v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-btn color="success" @click="addReplacement()">Add Replacement</v-btn>
        </v-layout>
      </v-container>
    </div>
  </div>

  <div v-if="page=='subject'">
    <h3>Pick A Subject</h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Code</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr class="selectable list" v-for="(sub,s_index) of subjects" @click="selSubj(s_index)">
          <td>{{s_index+1}}</td>
          <td>{{sub.id}}</td>
          <td>{{sub.title}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="page=='class'">
    <h3>Pick A Classroom</h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Desc</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cr,cr_index) of crs" @click="selRoom(cr_index)">
          <td>{{cr_index+1}}</td>
          <td>{{cr.id}}</td>
          <td>{{cr.desc}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { subjectRef } from './../../firebase'
import { classroomRef } from './../../firebase'
import { replacementRef } from './../../firebase'
import { weekRef } from './../../firebase'
export default {
  firebase: {
    subjects: subjectRef.orderByChild('id'),
    crs: classroomRef.orderByChild('id'),
    replacements: replacementRef,
    weeks: weekRef.orderByChild('index')
  },
  data() {
    return {
      page:'default',
      newRDesc:'',
      newWeek:1,
      newTitle:"",
      newRoom:'',
      newSubjectFULL:'',
      newSubjectID:'',
      newSubjectDesc:'',
      newSubjectKey:'',
      newD:1,
      newM:1,
      newY:2018,
      newRoom:"",
      roomIndex:"",
      newHour1:8,
      newMin1:0,
      newHour2:9,
      newMin2:0,
      classItems:[],
      weekItems:[],
      dItems:[
        {text:1},{text:2},{text:3},{text:4},{text:5},{text:6},{text:7},{text:8},{text:9},{text:10},
        {text:11},{text:12},{text:13},{text:14},{text:15},{text:16},{text:17},{text:18},{text:19},{text:20},
        {text:21},{text:22},{text:23},{text:24},{text:25},{text:26},{text:27},{text:28},{text:29},{text:30},{text:31}
      ],
      mItems:[
        {text:1},{text:2},{text:3},{text:4},{text:5},{text:6},
        {text:7},{text:8},{text:9},{text:10},{text:11},{text:12}
      ],
      hourItems:[
        {text:'AM 08',value:8},
        {text:'AM 09',value:9},
        {text:'AM 10',value:10},
        {text:'AM 11',value:11},
        {text:'PM 12',value:12},
        {text:'PM 01',value:13},
        {text:'PM 02',value:14},
        {text:'PM 03',value:14},
        {text:'PM 04',value:16},
        {text:'PM 05',value:17},
        {text:'PM 06',value:18},
        {text:'PM 07',value:19},
        {text:'PM 08',value:20}
      ],
      minuteItems:[
        {text:':00',value:0},
        {text:':30',value:30},
      ]
    }
  },
  methods: {
    calculateHours() {
      var start = 0.0
      var end = 0.0

      if(this.newMin1==30)
        start+=0.5
      if(this.newMin2==30)
        end+=0.5
      start+=this.newHour1
      end+=this.newHour2

      return end-start
    },
    selRoom(index) {
      this.page='default'
      this.newRoom=this.crs[index].id
    },
    selSubj(index) {
      this.page='default'
      this.newSubjectFULL=this.subjects[index].id+"-"+this.subjects[index].title
      this.newSubjectID=this.subjects[index].id
      this.newSubjectDesc=this.subjects[index].title
      this.newSubjectKey=this.subjects[index]['.key']
      this.loadClass(index)
    },
    loadClass(index){
      this.classItems=[]
      var count = Object.keys(this.subjects[index].class).length
      for(var i=0;i<count;i++)
      {
        var key = Object.keys(this.subjects[index].class)[i]
        this.classItems.push({ text:this.subjects[index].class[key].title })
      }
      this.weekItems=[]
      for(var i=0;i<this.weeks.length;i++)
      {
        this.weekItems.push({ text:i+1 })
      }
    },
    addReplacement() {
      if (this.newRDesc==""||this.newTitle==""||this.newRoom==""||this.newD==""||this.newM==""||this.newY=="")
      {
        alert("Fill in the empty field(s)")
      }
      else if (this.newHour1>this.newHour2)
      {
        alert("Invalid time range")
      }
      else if (this.newHour1==this.newHour2 && this.newMin1>=this.newMin2)
      {
        alert("Invalid time range")
      }
      else {
        replacementRef.push({ desc:this.newRDesc,
                              subject:this.newSubjectID,
                              title:this.newTitle,
                              D:parseInt(this.newD),
                              M:parseInt(this.newM),
                              Y:parseInt(this.newY),
                              week:parseInt(this.newWeek),
                              startH:this.newHour1,
                              startM:this.newMin1,
                              endH:this.newHour2,
                              endM:this.newMin2,
                              room:this.newRoom,
                              hours:this.calculateHours()})
        this.newRDesc=""
        this.newSubjectFULL=""
        this.newTitle=""
        this.newD=1
        this.newM=1
        this.newY=2018
        this.newHour1=8
        this.newMin1=0
        this.newHour2=8
        this.newMin2=0
        this.newRoom=""
      }
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  margin-top: 20px;
}
.scroll {
  overflow-y: auto!important;
  height:         calc(100vh - 500px);
}
.stu_list {
  overflow-y: auto;
  height:         calc(100vh - 210px);
}
#addField {
  width: 100%;
  margin-top: 0px;
  margin-bottom: -30px;
}
.additem {
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: -20px;
}
table {
  margin: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-collapse: collapse;
}
tbody {
  display: block;
  height: 280px;
  overflow-y: auto;
}
thead {
  display: block;
}
table, td, th {

}
td, th {
  text-align: left;
  padding:5px;
  padding-left: 10px;
  padding-right: 10px;
}
.selectable:hover {
  cursor: pointer;
  color: blue;
  font-weight: 600;
}
th {
  background-color: #35435b;
  color: white;
}
.list > td:nth-child(1), th:nth-child(1) {
  width: 60px;
}
.list > td:nth-child(2), th:nth-child(2) {
  width: 160px;
}
.list > td:nth-child(3), th:nth-child(3) {
  width: 220px;
}
.list:nth-child(even) {
  background-color: #cecece;
}
.list:nth-child(odd) {
  background-color: white;
}
</style>
