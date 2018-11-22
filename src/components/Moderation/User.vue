<template>
  <div class="scroll">
    <div class="stu_list">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr class="selectable list" v-for="(user,uin) of users" @click="sel(uin);uKey=user['.key']">
            <td>{{uin+1}}</td>
            <td>{{user.id}}</td>
            <td>{{role(user.role)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="addField">
      <v-container fluid>
        <v-layout row>
          <v-flex xs3 class="additem">
            <v-text-field required
              label="ID"
              v-model="newID1"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 class="additem">
            <v-text-field required
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              label="Password"
              v-model="newPassword1"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 class="additem">
            <v-select required
              :items="roleItems"
              v-model="newRole"
              label="Role"
              single-line
              item-value="value"
            ></v-select>
          </v-flex>
          <template v-if="uKey==null">
            <v-btn class="addbtn" color="success" @click="addStudent()">Add</v-btn>
          </template>
          <template v-else>
            <v-btn class="addbtn" @click="clear()">Clear</v-btn>
            <v-btn class="addbtn" color="warning" @click="editStudent()">Update</v-btn>
          </template>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import { userRef } from './../../firebase';
export default {
  firebase: {
    users: userRef.orderByChild('role')
  },
  data() {
    return {
      e1: true,
      newID1:"",
      newPassword1:"",
      newRole:3,
      uKey:null,
      edit:false,
      roleItems:[
        {text:'Admin',value:1},
        {text:'Lecturer',value:2},
        {text:'Inactive',value:3}
      ]
    }
  },
  methods: {
    clear(){
      this.uKey = null
      this.newID1=""
      this.newPassword1=""
      this.newRole=3
    },
    hasEmpty(){
      if(this.newID1==""||this.newPassword1=="")
      {
        alert("Please fill in empty blanks")
        return true
      }
      return false
    },
    sel(i){
      this.newID1 = this.users[i].id
      this.newPassword1 = this.users[i].pw
      this.newRole = parseInt(this.users[i].role)
      //this.edit = true
    },
    editStudent(){
      if(!this.hasEmpty())
      {
        userRef.child(this.uKey).child("id").set(this.newID1)
        userRef.child(this.uKey).child("pw").set(this.newPassword1)
        userRef.child(this.uKey).child("role").set(this.newRole)
        this.uKey = null
        this.newID1=""
        this.newPassword1=""
        this.newRole=3
      }
    },
    role(r){
      if(r==1)
        return 'Admin'
        else if(r==2)
        return 'Lecturer'
        else {
          return 'Inactive'
        }
    },
    addStudent() {
      if(!this.hasEmpty())
      {
        userRef.push({ id:this.newID1, pw:this.newPassword1 , role:this.newRole})
        this.newID1 = ""
        this.newPassword1 = ""
        this.newRole = 3
      }
    }
  }
}
</script>

<style scoped>
@import './../../../static/styles/moderation.css';
</style>
