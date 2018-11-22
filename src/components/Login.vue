<template>
  <div style="background-color: #c1c1c1;height:100vh;">

    <div class="login_window">
      <h1>Admin Login</h1>
      <div class="container">
        <label><b>ID</b></label>
        <input type="text" v-model="userID" required>

        <label><b>Password</b></label>
        <input type="password" v-model="userPass" v-on:keyup.enter="login" required>

        <button class="loginBtn" v-on:click="login">Login</button>
        <div class="warning">{{errorMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { userRef } from './../firebase';
export default {
  firebase: {
    users: userRef.orderByChild('id'),
  },
  data() {
    return {
      errorMsg: "",
      userID: "",
      userPass: "",
      test:""
    }
  },
  mounted() {

  },
  methods: {
    login() {
      var totalUsers=this.users.length
      var valid = false
      for(var i=0;i<totalUsers;i++)
      {
        if(this.users[i].id==this.userID)
        {
          if(this.users[i].pw==this.userPass)
          {
            this.$store.state.role=this.users[i].role
            this.$store.state.username=this.users[i].id
            this.$store.dispatch('loginF')
            valid = true
          }
        }
        if(totalUsers==(i+1)&&valid==false)
        {
          alert("Invalid login")
        }
      }
      if(totalUsers>0&&totalUsers==(i+1))
      {
        alert("Invalid login")
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_window {
  background-color: white;
  border: 1px solid #f1f1f1;
  width: 400px;
  box-shadow: 5px 10px 8px #888888;

  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
}

input[type=text],
input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button.loginBtn {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button.loginBtn:hover {
  opacity: 0.8;
}

.container {
  padding: 16px;
}

.login_window>h1 {
  text-align: center;
  margin: 20px;
}

.warning {
  width: 100%;
  text-align: center;
  font-size: 120%;
  color: red;
}
</style>
