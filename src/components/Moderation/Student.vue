<template>
  <div class="scroll">
    <div v-if="page==1">
      <div class="stu_list">
        <h2>Student List</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr class="selectable list" v-for="(student,stud_index) of students" v-bind:key="student['.key']" @click="selStudent(stud_index);key=student['.key']">
              <td>{{stud_index+1}}</td>
              <td>{{student.id}}</td>
              <td>{{student.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="addField">
        <v-container fluid>
          <v-layout row>
            <v-flex xs4 class="additem">
              <v-text-field required
                label="Student ID"
                v-model="newID"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 class="additem">
              <v-text-field required
                label="Student Name"
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
      <div>
        <div class="buttons">
          <v-btn color="info" @click="page=1">Back</v-btn>
          <v-btn color="error" @click="delStudent()">Delete</v-btn>
        </div>
        <h2>Student Details</h2>
        <div style="display:flex;margin-left:50px;">
          <img style="height:200px;width:150px;" v-if="selImg==''" src="./../../../static/student/user.jpg"/>
          <img style="height:200px;width:150px;" alt="Failed to load Image" v-else :src="selImg"/>
        <table class="stud_profile">
          <tr>
            <td>ID:</td>
            <td>
              <input :disabled="!editMode" type="text" v-model="selID" />
            </td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              <input :disabled="!editMode" type="text" v-model="selName" />
            </td>
          </tr>
          <tr>
            <td>Portrait link:</td>
            <td>
              <input :disabled="!editMode" type="text" v-model="selImg" />
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:right;">
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
        </div>
        <h3>Currently Taking:</h3>
        <table>
          <tr>
            <th></th><th>Code</th><th>Title</th><th></th>
          </tr>
          <tr class="list" v-for="(curSub,idKey,count) of students[index].sub">
            <td>{{count+1}}</td><td>{{curSub.id}}</td><td>{{curSub.title}}</td>
            <td><button @click="delSub(idKey)">Drop</button></td>
          </tr>
          <tr>
            <td colspan="4" style="text-align:right;"><v-btn color="success" @click="addSub()">Add Subject</v-btn></td>
          </tr>
        </table>
      </div>
    </div>
<!-------------------------------------------------------------------------------------------------------------------->
    <div v-if="page==3">
      <div class="buttons">
        <v-btn color="info" @click="page=2">Back</v-btn>
      </div>
      <template v-if="selectedSub>-1">
        <h3>Subject schedule: {{subjects[selectedSub].id}} - {{subjects[selectedSub].title}}</h3>
        <table class="stud_list">
          <tr>
            <th></th>
            <th>Title</th>
            <th>Day</th>
            <th>Time</th>
            <th>Classroom</th>
            <th></th>
          </tr>
          <tr class="list" v-for="(subclass,class_key,class_index) of subjects[selectedSub].class">
            <td>{{class_index+1}}</td>
            <td>{{subclass.title}}</td>
            <td>{{subclass.day}}</td>
            <td><template v-if="subclass.startH<10">0</template>{{subclass.startH}}:<template v-if="subclass.startM<10">0</template>{{subclass.startM}} ~ <template v-if="subclass.endH<10">0</template>{{subclass.endH}}:<template v-if="subclass.endM<10">0</template>{{subclass.endM}}</td>
            <td>{{subclass.room}}</td>
            <td>
              <v-btn v-bind:id="class_key" @click="selSub(subclass,class_key);">Add</v-btn>
            </td>
          </tr>
        </table>
      </template>
      <template v-else>
        <h3>Available subjects</h3>
        <table>
          <tr>
            <th></th>
            <th>Code</th>
            <th>Title</th>
          </tr>
          <tr class="list selectable" v-for="(subject,sub_index) of subjects" v-bind:key="subject['.key']" @click="selectedSub=sub_index;subkey=subject['.key']">
            <td>{{sub_index+1}}</td>
            <td>{{subject.id}}</td>
            <td>{{subject.title}}</td>
          </tr>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
import { studentRef } from './../../firebase';
import { subjectRef } from './../../firebase';
import { weekRef } from './../../firebase';
export default {
  firebase: {
    students: studentRef.orderByChild('id'),
    subjects: subjectRef.orderByChild('id'),
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
      selImg: "",
      defName: "",
      defID: "",
      defImg:"",
      editMode: false,

      Subkey:"",
      selCode: "",
      selTitle: "",
      selectedSub:-1,
      subkey:"",

      addedClass:[]
    }
  },
  methods: {
    disablebtn(id) {
      id.disabled=true
      id.value="Added"
    },
    addStudent() {
      if(this.newID==""||this.newName=="")
        alert("Fill in all required fields")
      else{
        studentRef.push({ name:this.newName, id:this.newID, image:"" })
        this.newID=""
        this.newName=""
      }
    },
    addSub() {
      this.page=3
      this.selectedSub=-1
    },
    delSub(idKey) {
      var r = confirm("Press OK to DROP");
      if (r == true) {
        studentRef.child(this.key).child('sub').child(idKey).remove()
      }
    },
    selStudent(index) {
      this.page=2
      this.editMode=false
      this.index=index
      this.selID=this.students[index].id
      this.selName=this.students[index].name
      this.selImg=this.students[index].image
    },
    selSub(subclass,class_key) {
      document.getElementById(class_key).style.visibility = 'hidden'
      studentRef.child(this.key).child('sub').child(this.subkey).child('title').set(this.subjects[this.selectedSub].title)
      studentRef.child(this.key).child('sub').child(this.subkey).child('id').set(this.subjects[this.selectedSub].id)
      studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('hours').set(subclass.hours)
      studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('title').set(subclass.title)
      studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('startH').set(subclass.startH)
      studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('endH').set(subclass.endH)
      studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('startM').set(subclass.startM)
      studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('endM').set(subclass.endM)
      studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('day').set(subclass.day)
      studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('room').set(subclass.room)

      var weekKeys=[]
      for(var i=0;i<this.weeks.length;i++)
      {
        for(var j=0;j<this.weeks.length;j++)
        {
          if(this.weeks[j].index==i+1)
          {
            weekKeys[i]=this.weeks[j]['.key']
          }
        }
      }
      for(var i=0;i<this.weeks.length;i++)
      {
        studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('weekly').child(weekKeys[i]).child("index").set(i+1)
        studentRef.child(this.key).child('sub').child(this.subkey).child('class').child(class_key).child('weekly').child(weekKeys[i]).child("attended").set(false)
      }
    },
    delStudent() {
      var r = confirm("Press OK to DELETE");
      if (r == true) {
        studentRef.child(this.key).remove()
        this.page=1
      }
    },
    editName() {
      studentRef.child(this.key).update({id:this.selID})
      studentRef.child(this.key).update({name:this.selName})
      studentRef.child(this.key).update({image:this.selImg})
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
        this.selImg=this.defImg
      } else {
        this.editMode=true
        this.defID=this.selID
        this.defName=this.selName
        this.defImg=this.selImg
      }
    }
  }
}
</script>

<style scoped>
@import './../../../static/styles/moderation.css';
</style>
