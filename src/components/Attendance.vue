<template>
  <div>
    <div style="padding:15px;background-color:#2196F3;color:white;"><h1>Attendances</h1></div>
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
      <findBy v-if="curTab==0"/>
      <statistic v-if="curTab==1"/>
    </div>
    <!--
    <h1>Attendance</h1>
    <ul class="breadcrumb">
      <li v-for="(item,i) in tabs">
        <a @click="changeTab(i)" v-if="curTab!=i">{{item.text}}</a>
        <template v-if="curTab==i">{{item.text}}</template>
      </li>
    </ul>
    <findBy v-if="curTab==0"/>
    <statistic v-if="curTab==1"/>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Find from './Attendance/Find.vue'
import Stat from './Attendance/Stat.vue'
export default {
  data() {
    return {
      active:null,
      tabs:[
        { text: 'Find By' },
        { text: 'Statistics' }
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
  components: {
    'findBy': Find,
    'statistic': Stat
  },
  methods: {
    changeTab(i){
      this.$store.dispatch('newTab',i)
    }
  },
  computed: mapState([
    'curTab'
  ]),
  computed:
  {
    curTab: function() {
      return this.$store.state.curTab
    }
  },
  mounted(){
    this.active = this.curTab.toString()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul.breadcrumb {
    padding: 10px 16px;
    list-style: none;
    background-color: #eee;
}
ul.breadcrumb li {
    display: inline;
    font-size: 18px;
    font-weight: bold;
}
ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}
ul.breadcrumb li a {
    color: #0275d8;
    text-decoration: none;
}
ul.breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
    cursor: pointer;
}
</style>
