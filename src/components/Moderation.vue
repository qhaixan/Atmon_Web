<template>
  <div class="moderation">
    <template v-if="$store.state.role==1">
    <div style="padding:15px;background-color:#2196F3;color:white;"><h1>Moderation</h1></div>
    <v-tabs
      v-model="active"
      color="blue"
      dark
      slider-color="yellow"
    >
      <v-tab v-for="(item,i) in tabs" :key="item.text" @click="changeTab(i)" ripple>
        {{item.text}}
      </v-tab>
    </v-tabs>
    <div style="max-height:300px;">
      <student v-if="curTab==0"/>
      <subject v-if="curTab==1"/>
      <classroom v-if="curTab==2"/>
      <ap v-if="curTab==3"/>
      <week v-if="curTab==4"/>
      <user v-if="curTab==5"/>
    </div>
  </template>
  <h2 v-else>You are unauthorized to view this page.</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Student from './Moderation/Student.vue'
import Subject from './Moderation/Subject.vue'
import Classroom from './Moderation/Classroom.vue'
import AP from './Moderation/AP.vue'
import Week from './Moderation/Week.vue'
import User from './Moderation/User.vue'
export default {
  data() {
    return {
      active:null,
      tabs:[
        { text: 'Student' },
        { text: 'Subject' },
        { text: 'Classroom' },
        { text: 'Access Point' },
        { text: 'Week Schedules' },
        { text: 'Users' },
      ]
    }
  },
  watch: {
    curTab: function(v, o) {
      if (v) {
        this.active = v.toString()
      }else if(o)
      {
        this.active = "0"
      }

    }
  },
  mounted(){
    this.active = this.curTab.toString()
  },
  methods: {
    changeTab(i){
      this.$store.dispatch('newTab',i)
    }
  },
  components: {
    'student': Student,
    'ap': AP,
    'subject': Subject,
    'classroom': Classroom,
    'week': Week,
    'user' : User
  },
  computed: mapState([
    'curTab'
  ]),
  computed:
  {
    curTab: function() {
      return this.$store.state.curTab
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moderation {

}
</style>
