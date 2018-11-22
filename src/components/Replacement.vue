<template>
  <div class="replacement">
    <div style="padding:15px;background-color:#2196F3;color:white;"><h1>Replacement Class</h1></div>
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
      <add v-if="curTab==0"/>
      <check v-if="curTab==1"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Add from './Replacement/Add.vue'
import Check from './Replacement/Check.vue'

export default {
  components: {
    'add': Add,
    'check': Check
  },
  data() {
    return {
      active:null,
      tabs:[
        { text: 'Add' },
        { text: 'View Replacements' }
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
.buttons {
  margin: 10px;
}
.scroll {
  height:100vh;
min-height:100vh;
  overflow-y: auto;
  margin-top: 0px;
  height: -webkit-calc(100vh - 140px);
  height:    -moz-calc(100vh - 140px);
  height:         calc(100vh - 140px);
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
.stud_list > tr:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}
th {
  background-color: #35435b;
  color: white;
}
.stud_list > tr:nth-child(even) {
  background-color: #a4b6d6;
}
.stud_list > tr:nth-child(odd) {
  background-color: #b5cfff;
}
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
