<template>
  <div id="app">
    <div v-if="auth==true">
      <!--
      <sideMenu class="sideMenu"/>
      <router-view class="content"/>-->
      <vframe class="frame"></vframe>
    </div>
    <div v-else>
      <login></login>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Login from './components/Login.vue'
import Frame from './components/Frame.vue'
import { serverRef } from './firebase'
export default {
  firebase: {
    serverR: serverRef
  },
  data() {
    return {
      serverEnabled:false,
      session:"",
    }
  },
  created() {

  },
  mounted() {
    this.tick()
    setInterval(this.tick.bind(this) , 1000)
    if(this.server)
        this.serverEnabled=true
      else {
        this.serverEnabled=false
      }
    this.session=this.randomString()
  },
  components: {
    'login': Login,
    'vframe':Frame
  },
  methods: {
    tick() {
        if(this.serverEnabled)
        {
          if(this.checkSession())
          {
            var d = new Date();
            var sec = d.getSeconds()
            var min = d.getMinutes()
            var hour = d.getHours()
            var date = d.getDate()
            var mon = d.getMonth()+1
            var year = d.getFullYear()
            serverRef.child("time").child("Second").set(sec)
            serverRef.child("time").child("Minute").set(min)
            serverRef.child("time").child("Hour").set(hour)
            serverRef.child("date").child("Date").set(date)
            serverRef.child("date").child("Month").set(mon)
            serverRef.child("date").child("Year").set(year)
            serverRef.child("session").set(this.session)
          }
        }
    },
    checkSession(){
      if(this.session == this.serverR[1]['.value'])
      {
        return true
      }else{
        if (confirm('New session found. Continue will remove other server, cancel to leave it as is.')) {
            // Kick it!
            return true
        } else {
            // Do nothing!
            this.$store.dispatch('sOFF')
            return false
        }
      }
    },
    randomString() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 9; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
  },
  watch: {
    server: function(v, o) {
      if (v) {
        this.serverEnabled=true
      }else if(o)
      {
        this.serverEnabled=false
      }

    }
  },
  computed: mapState([
    'auth',
    'server'
  ]),
  computed:
  {
    auth: function() {
      return this.$store.state.auth
    },
    server: function() {
      return this.$store.state.server
    }
  }
}
</script>

<style>

</style>
