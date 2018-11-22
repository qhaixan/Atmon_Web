<template>
  <div class="scroll">
    <div v-if="page==1">
      <div class="stu_list">
        <h2>Classroom</h2>
        <table class="stud_list">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Desc</th>
            </tr>
          </thead>
          <tbody>
            <tr class="selectable list" v-for="(cr,cr_index) of crs" v-bind:key="cr['.key']" @click="selStudent(cr_index);key=cr['.key']">
              <td>{{cr_index+1}}</td>
              <td>{{cr.id}}</td>
              <td>{{cr.desc}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="addField">
        <v-container fluid>
          <v-layout row>
            <v-flex xs4 class="additem">
              <v-text-field required
                label="Room ID"
                v-model="newID"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 class="additem">
              <v-text-field required
                label="Room Description"
                v-model="newDesc"
              ></v-text-field>
            </v-flex>
            <v-btn class="addbtn" color="success" @click="addStudent()">Add</v-btn>
          </v-layout>
        </v-container>
      </div>
    </div>

    <div v-if="page==2">

      <div>

        <div class="buttons">
          <v-btn color="info" @click="page=1">Back</v-btn>
          <v-btn color="error" @click="delStudent()">Delete</v-btn>
        </div>

        <table>
          <tr style="background-color: #35435b;color: white;">
            <td>ID:</td>
            <td>Desc:</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <input :disabled="!editMode" type="text" v-model="selID" />
            </td>
            <td>
              <input :disabled="!editMode" type="text" v-model="selDesc" />
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

      </div>
    </div>
  </div>
</template>

<script>
import { classroomRef } from './../../firebase';
export default {
  firebase: {
    crs: classroomRef.orderByChild('id')
  },
  data() {
    return {
      page:1,

      newID: "",
      newDesc: "",

      index:0,
      key:"",

      selID: "",
      selDesc: "",
      defID: "",
      defDesc: "",
      editMode: false
    }
  },
  methods: {
    addStudent() {
      classroomRef.push({ id:this.newID, desc:this.newDesc })
      this.newID=""
      this.newDesc=""
    },
    selStudent(index) {
      this.page=2
      this.editMode=false
      this.index=index
      this.selID=this.crs[index].id
      this.selDesc=this.crs[index].desc
    },
    delStudent() {
      var r = confirm("Press OK to DELETE");
      if (r == true) {
        classroomRef.child(this.key).remove()
        this.page=1
      }
    },
    editName() {
      classroomRef.child(this.key).update({id:this.selID})
      classroomRef.child(this.key).update({desc:this.selDesc})
      this.defID=this.selID
      this.defDesc=this.selDesc
      this.switchEdit()
    },
    switchEdit() {
      if (this.editMode)
      {
        this.editMode=false
        this.selID=this.defID
        this.selDesc=this.defDesc
      } else {
        this.editMode=true
        this.defID=this.selID
        this.defDesc=this.selDesc
      }
    }
  }
}
</script>

<style scoped>
@import './../../../static/styles/moderation.css';
</style>
