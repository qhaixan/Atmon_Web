<template>
<div class="scroll">
  <h4 v-for="p of percentage">{{p}}</h4>
  <div v-if="page==0">
    <div>
      <h2>Find Attendance By</h2>

      <div class="card" v-for="(item,i) in itemA" :key="item.title" @click="go(item.page)"><img :src="item.image">
        <div class="c-title"><h3>{{item.title}}</h3></div>
      </div>
    </div>
  </div>
<!-------------------------------------------------------------------------------------------------------------------->
  <div v-if="page>0">
    <div class="buttons">
      <v-btn color="info" @click="back()">Back</v-btn>
    </div>
<!-------------------------------------------------------------------------------------------------------------------->
    <div v-if="find=='student'">
      <div v-if="page==1">
        <h3>Pick a student</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr class="selectable list" v-for="(student,stud_index) of students" v-bind:key="student['.key']" @click="key=student['.key'];selStudent(stud_index,key);">
              <td>{{stud_index+1}}</td>
              <td>{{student.id}}</td>
              <td>{{student.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
<!-------------------------------------------------------------------------------------------------------------------->
      <div v-if="page==2">
        <h3>Subjects taken by {{selName}}:</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Code</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr class="selectable list" v-for="(curSub,idKey,count) of students[indexA].sub" @click="selSub=count;keyS=idKey;countPercent();">
              <td>{{count+1}}</td>
              <td>{{curSub.id}}</td>
              <td>{{curSub.title}}</td>
            </tr>
          </tbody>
        </table>

        <template v-for="(student,stud_Key) of students" v-if="stud_Key==indexA">
          <template v-for="(sub,subKey,subin) of student.sub" v-if="subin==selSub">
            <h3>{{sub.title}} [{{percent}}]</h3><v-btn color="warning" v-if="!updateAtt" @click="updateAtt=true">Edit</v-btn><v-btn color="success" v-else @click="updateAtt=false">Done</v-btn>
              <table class="attendance">
                <tr v-for="(cls,clsKey,clsID) of sub.class" v-if="clsID==0">
                  <th>Week :</th>
                  <th v-for="(w,wkey,wid) of cls.weekly">{{wid+1}}
                  </th>
                </tr>
                <tr v-for="(cls,clsKey) of sub.class">
                  <td><h3>{{cls.title}}</h3></td>
                    <td v-for="(w,wkey,wid) of cls.weekly">
                      <template v-if="!updateAtt">
                        <div style="color:green;" v-if="w.attended==true"><h3>Present</h3></div>
                        <div style="color:red;" v-else><h3>Absent</h3></div>
                      </template>
                      <template v-else>
                        <button @click="change(false,clsKey,wkey)" style="height:30px;color:green;font-size:160%;" v-if="w.attended==true">O</button>
                        <button @click="change(true,clsKey,wkey)"style="height:30px;color:red;font-size:160%;" v-else>X</button>
                      </template>
                    </td>
                  </tr>
                </table>
              </template>
            </template>
      </div>
    </div>
<!-------------------------------------------------------------------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------------------->
      <div v-if="find=='subject'">
        <div v-if="page==1">
          <h3>Pick a subject</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr class="list selectable" v-for="(subject,sub_index) of subjects" v-bind:key="subject['.key']" @click="selSubject(sub_index);key=subject['.key'];">
                <td>{{sub_index+1}}</td>
                <td>{{subject.id}}</td>
                <td>{{subject.title}}</td>
              </tr>
            </tbody>
          </table>
        </div>
<!-------------------------------------------------------------------------------------------------------------------->
        <div v-if="page==2">
          <h3>Students who taken {{selName}}:</h3>
          <v-btn color="warning" v-if="!updateAtt" @click="updateAtt=true">Edit</v-btn><v-btn color="success" v-else @click="updateAtt=false">Done</v-btn>
          <template v-for="(student,i,stud_Key) of students">
              <template v-for="(sub,subin) of student.sub" v-if="sub.id==selID">
                <h3>{{student.name}}</h3>
                  <table class="attendance">
                    <tr v-for="(cls,clsKey,clsID) of sub.class" v-if="clsID==0">
                      <th>Week :</th>
                      <th v-for="(w,wkey,wid) of cls.weekly">{{wid+1}}
                      </th>
                    </tr>
                    <tr v-for="(cls,clsKey) of sub.class">
                      <td><h3>{{cls.title}}</h3></td>
                      <td v-for="(w,wkey,wid) of cls.weekly">
                        <template v-if="!updateAtt">
                          <div style="color:green;" v-if="w.attended==true"><h3>Present</h3></div>
                          <div style="color:red;" v-else><h3>Absent</h3></div>
                        </template>
                        <template v-else>
                          <button @click="change2(false,student['.key'],subin,clsKey,wkey)" style="height:30px;color:green;font-size:160%;" v-if="w.attended==true">O</button>
                          <button @click="change2(true,student['.key'],subin,clsKey,wkey)"style="height:30px;color:red;font-size:160%;" v-else>X</button>
                      </template>
          </td>
          </tr>
          </table>
          </template>
          </template>

        </div>
      </div>
  </div>


</div>
</template>

<script>
import {
  studentRef
} from './../../firebase'
import {
  subjectRef
} from './../../firebase'
import {
  weekRef
} from './../../firebase'
export default {
  firebase: {
    students: studentRef.orderByChild('id'),
    subjects: subjectRef.orderByChild('id'),
    studentsObj: {
      source: studentRef,
      asObject: true
    },
    weeks: weekRef.orderByChild('index')
  },
  data() {
    return {
      find: "",
      page: 0,
      indexA: -1,
      indexS: 0,
      keyA: "",
      keyS: "",
      selID: "",
      selName: "",
      //selSubIndex:-1,
      selSub: -1,
      selStud: "",
      updateAtt: false,
      percent:"",
      itemA:[
        { title: 'Find by Students', image: './../../static/homeImage/student.jpg', page:'student'},
        { title: 'Find by Subjects', image: './../../static/homeImage/subject.jpg', page:'subject'}
      ]
    }
  },
  methods: {
    go(func){
      this.find=func
      this.page=1
    },
    back() {
      this.page -= 1
    },
    selStudent(index, key) {
      this.page = 2
      this.keyA = key
      this.indexA = index
      this.selID = this.students[index].id
      this.selName = this.students[index].name
    },
    selSubject(index, key) {
      this.page = 2
      //this.keyS=key
      this.indexS = index
      this.selID = this.subjects[index].id
      this.selName = this.subjects[index].title
    },
    change(bul, cKey, wKey) {
      //studentRef[this.indexA].child("sub")[this.indexS].child("weekly")[wid].set(bul)
      studentRef.child(this.keyA).child("sub").child(this.keyS).child("class").child(cKey).child("weekly").child(wKey).child("attended").set(bul)
      this.countPercent()
    },
    change2(bul, aKey, sKey, cKey, wKey) {
      studentRef.child(aKey).child("sub").child(sKey).child("class").child(cKey).child("weekly").child(wKey).child("attended").set(bul)
      //this.countPercent()
    },
    countPercent() {
      var classCount = Object.keys(this.students[this.indexA]["sub"][this.keyS]["class"]).length
      var weekCount = this.weeks.length
      var classKey = []
      var classDur = []
      var weekKeys = []
      var presentHours = 0
      var totalHours = 0
      //var

      for (var i = 0; i < classCount; i++) {
        classKey[i] = Object.keys(this.students[this.indexA]["sub"][this.keyS]["class"])[i]
        classDur[i] = this.studentsObj[this.keyA].sub[this.keyS].class[classKey[i]].hours
      }

      for (var j = 0; j < weekCount; j++) //get weekly key
      {
        weekKeys[j] = Object.keys(this.students[this.indexA]["sub"][this.keyS]["class"][classKey[0]]["weekly"])[j]
      }

      //this.test = Object.keys(this.students[this.indexA]["sub"][this.keyS]["class"][classKey[0]]["weekly"][weekKeys[0]]["attended"]).value
      for (var i = 0; i < classCount; i++) {
        for (var j = 0; j < weekCount; j++) {
          totalHours += classDur[i]
          if (this.studentsObj[this.keyA].sub[this.keyS].class[classKey[i]].weekly[weekKeys[j]].attended == true) {
            presentHours += classDur[i]
          }
        }
      }
      this.percent = parseFloat(Math.round((presentHours / totalHours * 100) * 100) / 100).toFixed(2) +"%"

    }
  }
}
</script>

<style scoped>
@import './../../../static/styles/card.css';
@import './../../../static/styles/moderation.css';
.attendance > tr > th, .attendance > tr > td {
  border: solid;
  border-width: thin;
  width:30px!important;
}
.attendance > tr > td > button {
  width:35px!important;
}
</style>
