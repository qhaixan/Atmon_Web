<template>
<div class="scroll">
  <div v-if="page==1">
    <div class="stu_list">
      <h2>Subject List</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Code</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr class="list selectable" v-for="(subject,sub_index) of subjects" v-bind:key="subject['.key']" @click="selStudent(sub_index);key=subject['.key']">
            <td>{{sub_index+1}}</td>
            <td>{{subject.id}}</td>
            <td>{{subject.title}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="addField">
      <v-container fluid>
        <v-layout row>
          <v-flex xs4 class="additem">
            <v-text-field required
              label="Subject Code"
              v-model="newID"
            ></v-text-field>
          </v-flex>
          <v-flex xs4 class="additem">
            <v-text-field required
              label="Subject Title"
              v-model="newName"
            ></v-text-field>
          </v-flex>
          <v-btn class="addbtn" color="success" @click="addStudent()">Add</v-btn>
        </v-layout>
      </v-container>
    </div>
  </div>
<!-------------------------------------------------------------------------------------------------------------------->
  <div v-if="page==2">

    <div class="buttons">
      <v-btn color="info" @click="page=1">Back</v-btn>
      <v-btn color="error" @click="delStudent()">Delete</v-btn>
    </div>
    <h2>Subject Details</h2>
    <table class="stud_profile">
      <tr style="background-color: #35435b;color: white;">
        <td>Code:</td>
        <td>Title:</td>
        <td></td>
      </tr>
      <tr>
        <td>
          <input :disabled="!editMode" type="text" v-model="selID" />
        </td>
        <td>
          <input :disabled="!editMode" type="text" v-model="selName" />
        </td>
        <td>
          <template v-if="!editMode">
            <v-btn color="warning" @click="switchEdit()">Edit</v-btn>
          </template>
          <template v-if="editMode">
            <v-btn @click="switchEdit()">Cancel</v-btn>
            <v-btn color="success" @click="editName()">Update</v-btn>
          </template>
        </td>
      </tr>
    </table>

    <h3>Schedules:</h3>

      <table class="stud_list">
        <tr>
          <th></th>
          <th>Title</th>
          <th>Day</th>
          <th>Time</th>
          <th>Classroom</th>
          <th></th>
        </tr>
        <tr class="list" v-for="(subclass,class_key,class_index) of subjects[index].class">
          <td>{{class_index+1}}</td>
          <td>{{subclass.title}}</td>
          <td>{{subclass.day}}</td>
          <td><template v-if="subclass.startH<10">0</template>{{subclass.startH}}:<template v-if="subclass.startM<10">0</template>{{subclass.startM}} ~ <template v-if="subclass.endH<10">0</template>{{subclass.endH}}:<template v-if="subclass.endM<10">0</template>{{subclass.endM}}</td>
          <td>{{subclass.room}}</td>
          <td><button @click="delClass(class_key)">Remove</button></td>
        </tr>
      </table>

    <h3>Add new class:</h3><br/>
    <div id="addField">
      <v-container fluid>
        <v-layout row>
          <v-flex xs4 class="additem">
            <v-text-field required
              label="Title"
              v-model="newTitle"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 class="additem">
            <v-select required
              :items="dayItems"
              v-model="newDay"
              label="Day"
              single-line
              item-value="text"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs1 class="additem">START TIME</v-flex>
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
          <v-flex xs1 class="additem">FINISH TIME</v-flex>
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
            <v-text-field required
              label="Classroom"
              v-model="newRoom"
              disabled
            ></v-text-field>
          </v-flex>
          <v-flex xs4 class="additem">
            <v-btn color="info" @click="page=3">Choose classroom</v-btn>
          </v-flex>

        </v-layout>
        <v-layout row>
          <v-btn color="success" @click="addClass()">Add</v-btn>
        </v-layout>
      </v-container>
    </div>
  </div>
<!-------------------------------------------------------------------------------------------------------------------->
  <div v-if="page==3">
    <div class="buttons">
      <v-btn color="info" @click="page=2">Back</v-btn>
    </div>
    <h2>Classroom</h2>
    <table>
      <tr>
        <th></th>
        <th>ID</th>
        <th>Desc</th>
      </tr>
      <tr class="list selectable" v-for="(cr,cr_index) of crs" @click="selRoom(cr_index)">
        <td>{{cr_index+1}}</td>
        <td>{{cr.id}}</td>
        <td>{{cr.desc}}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import { subjectRef } from './../../firebase';
import { classroomRef } from './../../firebase';
import { weekRef } from './../../firebase';
export default {
  firebase: {
    subjects: subjectRef.orderByChild('id'),
    crs: classroomRef.orderByChild('id'),
    weeks: weekRef.orderByChild('index')
  },
  data() {
    return {
      page:1,

      newName: "",
      newID: "",

      index:0,
      key:"",

      selName: "",
      selID: "",
      defName: "",
      defID: "",
      editMode: false,

      newTitle:"",
      newDay:"",
      newRoom:"",
      roomIndex:"",
      newHour1:8,
      newMin1:0,
      newHour2:9,
      newMin2:0,

      dayItems:[
        {text:'Monday'},
        {text:'Tuesday'},
        {text:'Wednesday'},
        {text:'Thursday'},
        {text:'Friday'},
        {text:'Saturday'},
        {text:'Sunday'}
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
    selRoom(index) {
      this.page=2
      this.roomIndex=index
      this.newRoom=this.crs[index].id
    },
    delClass(class_key) {
      var r = confirm("Press OK to REMOVE");
      if (r == true) {
        subjectRef.child(this.key).child('class').child(class_key).remove()
      }
    },
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
    addClass() {
      if (this.newTitle==""||this.newDay==""||this.newRoom=="")
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
        subjectRef.child(this.key).child('class').push({ title:this.newTitle,
                                                            day:this.newDay,
                                                            startH:this.newHour1,
                                                            startM:this.newMin1,
                                                            endH:this.newHour2,
                                                            endM:this.newMin2,
                                                            room:this.newRoom,
                                                            hours:this.calculateHours()})
        this.newTitle=""
        this.newDay=""
        this.newHour1=8
        this.newMin1=0
        this.newHour2=8
        this.newMin2=0
        this.newRoom=""
      }
    },
    addStudent() {
      subjectRef.push({ title:this.newName, id:this.newID })
      this.newID=""
      this.newName=""
    },
    selStudent(index) {
      this.page=2
      this.editMode=false
      this.index=index
      this.selID=this.subjects[index].id
      this.selName=this.subjects[index].title
    },
    delStudent() {
      var r = confirm("Press OK to DELETE");
      if (r == true) {
        subjectRef.child(this.key).remove()
        this.page=1
      }
    },
    editName() {
      subjectRef.child(this.key).update({id:this.selID})
      subjectRef.child(this.key).update({title:this.selName})
      this.defID=this.selID
      this.defName=this.selName
      this.switchEdit()
    },
    switchEdit() {
      if (this.editMode)
      {
        this.editMode=false
        this.selID=this.defID
        this.selName=this.defName
      } else {
        this.editMode=true
        this.defID=this.selID
        this.defName=this.selName
      }
    }
  }
}
</script>

<style scoped>
@import './../../../static/styles/moderation.css';
</style>
