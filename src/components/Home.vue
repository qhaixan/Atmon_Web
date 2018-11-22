<template>
  <div>
    <h1>Attendance Monitoring System</h1>
    <div v-if="$store.state.role==1">
    Server Status :
    <template v-if="server"><span style="color:green;font-weight:bold;">ON</span>
      <v-btn color="info" v-on:click="serverOFF">Switch</v-btn>
    </template>
    <template v-else><span style="color:grey;font-weight:bold;">OFF</span>
      <v-btn color="info" v-on:click="serverON">Switch</v-btn>
    </template><br/>
    Server time : {{serverR[2].Hour}}:<template v-if="serverR[2].Minute<10">0</template>{{serverR[2].Minute}}:<template v-if="serverR[2].Second<10">0</template>{{serverR[2].Second}}
      [{{serverR[0].Date}}/{{serverR[0].Month}}/{{serverR[0].Year}}]
    </div>

    <template v-if="$store.state.role==1">
      <h2>Moderation</h2>
      <div class="card" v-for="(item,i) in itemA" :key="item.title" @click="moderates(i)"><img :src="item.image">
        <div class="c-title"><h3>{{item.title}}</h3></div>
      </div>
    </template>

    <template>
      <h2>Attendance</h2>
      <div class="card" v-for="(item,i) in itemB" :key="item.title" @click="attendance(i)"><img :src="item.image">
        <div class="c-title"><h3>{{item.title}}</h3></div>
      </div>
    </template>

    <template>
      <h2>Replacement</h2>
      <div class="card" v-for="(item,i) in itemC" :key="item.title" @click="replacement(i)"><img :src="item.image">
        <div class="c-title"><h3>{{item.title}}</h3></div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { serverRef } from './../firebase'
export default {
  firebase: {
    serverR: serverRef
  },
  data() {
    return {
      itemA:[
        { title: 'Student Moderation', image: './../../static/homeImage/student.jpg'},
        { title: 'Subject Moderation', image: './../../static/homeImage/subject.jpg'},
        { title: 'Classrooms', image: './../../static/homeImage/class.jpg'},
        { title: 'Access Points', image: './../../static/homeImage/AP.jpg'},
        { title: 'Week Schedules', image: './../../static/homeImage/week.jpg'}
      ],
      itemB:[
        { title: 'Check Attendance', image: './../../static/homeImage/attendance.jpg'},
        { title: 'Graph and Statistics', image: './../../static/homeImage/graph.jpg'}
      ],
      itemC:[
        { title: 'Replacements', image: './../../static/homeImage/replacement.jpg'}
      ],
    }
  },
  mounted() {

  },
  computed: mapState([
    'server'
  ]),
  computed:
  {
    server: function() {
      return this.$store.state.server
    }
  },
  methods: {
    serverSwitch() {
      if(server)
      {
        this.serverON()
      }else{
        this.serverOFF()
      }
    },
    serverON() {
      this.$store.dispatch('sON')
    },
    serverOFF() {
      this.$store.dispatch('sOFF')
    },
    menu(funNo,subWindow) {
      this.$store.state.curTab = subWindow
      if(funNo==0)
        this.$router.push({ name: 'Moderation' })
      else if(funNo==1)
        this.$router.push({ name: 'Attendance' })
      else {
        this.$router.push({ name: 'Replacement' })
      }
    },
    moderates(tab){
      this.$store.dispatch("newTab",tab)
      this.$router.push({ name: 'Moderation' })
    },
    attendance(tab){
      this.$store.dispatch("newTab",tab)
      this.$router.push({ name: 'Attendance' })
    },
    replacement(tab){
      this.$store.dispatch("newTab",tab)
      this.$router.push({ name: 'Replacement' })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './../../static/styles/card.css';
</style>
