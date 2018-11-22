<template>
  <div class="scroll">
    <div v-if="page==1">
      <div class="stu_list">
        <h2>Access Points</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Mac Address</th>
            </tr>
          </thead>
          <tbody>
            <tr class="selectable list" v-for="(ap,ap_index) of aps" v-bind:key="ap['.key']" @click="selStudent(ap_index);key=ap['.key']">
              <td>{{ap_index+1}}</td>
              <td>{{ap.name}}</td>
              <td>{{ap.add}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="addField">
        <v-container fluid>
          <v-layout row>
            <v-flex xs4 class="additem">
              <v-text-field required
                label="AP Name"
                v-model="newName"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 class="additem">
              <v-text-field required
                label="Mac Address"
                v-model="newAdd"
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

        <table class="stud_profile">
          <tr style="background-color: #35435b;color: white;">
            <td>Name:</td>
            <td>Mac Address:</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <input :disabled="!editMode" type="text" v-model="selName" />
            </td>
            <td>
              <input :disabled="!editMode" type="text" v-model="selAdd" />
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
        <h3 style="display:inline;">Classroom covered :</h3>&nbsp;<v-btn color="info" @click="page=3">Add classroom</v-btn>
        <hr/>
        <table style="border: none!important;">
          <tr class="list" style="border: none!important;" v-for="(clr,ki,i) in aps[index].classroom">
            <td style="border: none!important;">{{i+1}}.</td>
            <td style="border: none!important;">{{clr.id}}</td>
            <td style="border: none!important;text-align:center;"><v-btn color="error" @click="deleteConn(ki)">X</v-btn></td>
          </tr>
        </table>
      </div>
    </div>

    <div v-if="page==3">
      <table class="stud_list">
        <tr>
          <th></th>
          <th>ID</th>
          <th>Desc</th>
        </tr>
        <tr v-for="(cr,cr_index) of crs" @click="addClass(cr.id,cr.desc);">
          <td>{{cr_index+1}}</td>
          <td>{{cr.id}}</td>
          <td>{{cr.desc}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { apRef } from './../../firebase';
import { classroomRef } from './../../firebase';
export default {
  firebase: {
    aps: apRef.orderByChild('name'),
    crs: classroomRef.orderByChild('id')
  },
  data() {
    return {
      page:1,

      newName: "",
      newAdd: "",

      index:0,
      key:"",

      selName: "",
      selAdd: "",
      defName: "",
      defAdd: "",
      editMode: false
    }
  },
  methods: {
    deleteConn(key){
      apRef.child(this.key).child('classroom').child(key).remove()
    },
    addClass(id,name) {
      apRef.child(this.key).child('classroom').push({ id:id, desc:name })
      this.page=2
    },
    addStudent() {
      apRef.push({ name:this.newName, add:this.newAdd })
      this.newAdd=""
      this.newName=""
    },
    selStudent(index) {
      this.page=2
      this.editMode=false
      this.index=index
      this.selAdd=this.aps[index].add
      this.selName=this.aps[index].name
    },
    delStudent() {
      var r = confirm("Press OK to DELETE");
      if (r == true) {
        apRef.child(this.key).remove()
        this.page=1
      }
    },
    editName() {
      apRef.child(this.key).update({add:this.selAdd})
      apRef.child(this.key).update({name:this.selName})
      this.defAdd=this.selAdd
      this.defName=this.selName
      this.switchEdit()
    },
    switchEdit() {
      if (this.editMode)
      {
        this.editMode=false
        this.selAdd=this.defAdd
        this.selName=this.defName
      } else {
        this.editMode=true
        this.defAdd=this.selAdd
        this.defName=this.selName
      }
    }
  }
}
</script>

<style scoped>
@import './../../../static/styles/moderation.css';
</style>
