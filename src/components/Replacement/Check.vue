<template>
  <div class="scroll">
    <div v-if="page==1">
      <div>
        <h3 style="display: inline;">Selected Subject: {{selected}}</h3>&nbsp;
        <v-btn color="info" @click="page=2"><v-icon>filter_list</v-icon>&nbsp;Filter</v-btn>
      </div>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Class</th>
            <th>Replacement for</th>
            <th>Date</th>
            <th>Time</th>
            <th>Classroom</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <template v-if="showAll">
          <tbody>
            <tr class="list" v-for="(rpls,rpls_index) of replacements">
              <td>{{rpls.subject}}</td>
              <td>{{rpls.title}}</td>
              <td>Week {{rpls.week}}</td>
              <td>{{rpls.D}}/{{rpls.M}}/{{rpls.Y}}</td>
              <td><template v-if="rpls.startH<10">0</template>{{rpls.startH}}:<template v-if="rpls.startM<10">0</template>{{rpls.startM}} ~ <template v-if="rpls.endH<10">0</template>{{rpls.endH}}:<template v-if="rpls.endM<10">0</template>{{rpls.endM}}</td>
              <td>{{rpls.room}}</td>
              <td>{{rpls.desc}}</td>
              <td><button @click="delClass(rpls['.key'])">Remove</button></td>
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tbody>
            <tr class="list" v-for="(rpls,rpls_index) of replacements" v-if="rpls.subject==seledctedID">
              <td>{{rpls.subject}}</td>
              <td>{{rpls.title}}</td>
              <td>Week {{rpls.week}}</td>
              <td>{{rpls.D}}/{{rpls.M}}/{{rpls.Y}}</td>
              <td><template v-if="rpls.startH<10">0</template>{{rpls.startH}}:<template v-if="rpls.startM<10">0</template>{{rpls.startM}} ~ <template v-if="rpls.endH<10">0</template>{{rpls.endH}}:<template v-if="rpls.endM<10">0</template>{{rpls.endM}}</td>
              <td>{{rpls.room}}</td>
              <td>{{rpls.desc}}</td>
              <td><button @click="delClass(rpls['.key'])">Remove</button></td>
            </tr>
          </tbody>
        </template>
      </table>
    </div>

    <div v-if="page==2">
      <h3>Filter</h3>
      <table class="stud_list">
        <tr>
          <th></th>
          <th>Code</th>
          <th>Title</th>
        </tr>
        <tr class="list selectable" v-for="(subject,sub_index) of subjects" @click="selSub(subject.id,subject.title);">
          <td>{{sub_index+1}}</td>
          <td>{{subject.id}}</td>
          <td>{{subject.title}}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:right;"><v-btn color="info" @click="selAll()">Show all</v-btn></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { subjectRef } from './../../firebase'
import { classroomRef } from './../../firebase';
import { replacementRef } from './../../firebase'
export default {
  firebase: {
    subjects: subjectRef.orderByChild('id'),
    crs: classroomRef.orderByChild('id'),
    replacements: replacementRef,
  },
  data() {
    return {
      page:1,
      selected: 'All',
      seledctedID:'',
      selectedDesc:'',
      showAll: true
    }
  },
  methods: {
    delClass(key) {
      var r = confirm("Press OK to REMOVE");
      if (r == true) {
        replacementRef.child(key).remove()
      }
    },
    selSub(id,desc){
      this.seledctedID=id
      this.selectedDesc=desc
      this.showAll=false
      this.selected=id+" -"+desc
      this.page=1
    },
    selAll(){
      this.seledctedID=""
      this.selectedDesc=""
      this.showAll=true
      this.selected="All"
      this.page=1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttons {
  margin: 10px;
}
.scroll {
  overflow-y: auto;
  height:         calc(100vh - 180px);
}
#addField {
  width: 100%;

  margin-top: 20px;
  margin-bottom: 20px;
}
#backBtn {
  margin: 10px;
}
#delBtn {
  margin: 10px;
  display: block;
}
table {
  margin: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-collapse: collapse;
}
table, td, th {
   border: 1px solid black;
}
td, th {
  padding: 5px;
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
.list:nth-child(even) {
  background-color: #cecece;
}
.list:nth-child(odd) {
  background-color: white;
}
.selectable > td:nth-child(1), th:nth-child(1) {
  width: 60px;
}
.selectable > td:nth-child(2), th:nth-child(2) {
  width: 160px;
}
.selectable > td:nth-child(3), th:nth-child(3) {
  width: 220px;
}
</style>
