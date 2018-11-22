<template lang="html">
  <v-app id="inspire">
    <v-navigation-drawer dark
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"

      style="padding-bottom:0px;"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
          <div class="heading">
            <v-icon class="portrait">person</v-icon>
            <h1>{{$store.state.username}}</h1>
          </div>                                                                        <!--heading-->
          </v-layout>


          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.icon"
            :append-icon="item.model?item['icon-alt']:item['icon-alt']"
          >                                                                   <!--expandable-->
            <v-list-tile slot="activator"> <!--outter-->
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>


            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="linkTo(item.route,i)">                                    <!--inner-->
              <v-list-tile-action>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>


          </v-list-group>


          <v-list-tile v-else @click="linkTo(item.route)"> <!-- without children-->
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>


        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">ATMON</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
      <v-btn icon slot="activator" @click="downloadApp()">
        <v-icon>android</v-icon>
      </v-btn>
      <span>Download The App</span>
      </v-tooltip>

      <v-tooltip bottom>
      <v-btn icon slot="activator" @click="$store.dispatch('logoutF');">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
      <span>Logout</span>
      </v-tooltip>

    </v-toolbar>

    <v-content>
    <v-container fluid>
      <template v-if="$store.state.role<3">
        <router-view class="Rview"></router-view>
      </template>
      <h2 v-else>Your account is suspended, please contact the administrator.</h2>
    </v-container>
  </v-content>
  </v-app>
</template>

<script>
export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { heading:true },
        { icon: 'home', text: 'Home', route: 'Home' },
        {
          icon: 'mode_edit',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Moderation',
          route: 'Moderation',
          model: false,
          children: [
            { icon: 'group', text: 'Student' },
            { icon: 'book', text: 'Subject' },
            { icon: 'room', text: 'Classroom' },
            { icon: 'wifi_tethering', text: 'Access Point' },
            { icon: 'schedule', text: 'Week Schedule' },
            { icon: 'person', text: 'Users' }
          ]
        },
        {
          icon: 'playlist_add_check',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Attendance',
          route: 'Attendance',
          model: false,
          children: [
            { icon: 'search', text: 'Find' },
            { icon: 'trending_up', text: 'Statistics' }
          ]
        },
        {
          icon: 'replay',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Replacement',
          route: 'Replacement',
          model: false,
          children: [
            { icon: 'add', text: 'Add Replacement' },
            { icon: 'content_paste', text: 'View Replacement' }
          ]
        },
        { icon: 'power_settings_new', text: 'Logout', route: 'Logout' }
      ]
    }),
    methods: {
      linkTo(R,A){
        if(R=='Logout'){this.$store.dispatch('logoutF')}
        else{
          this.$store.dispatch("newTab",A)
          this.$router.push({ name: R })
        }
      },
      downloadApp(){
        window.open("https://drive.google.com/uc?export=download&id=1RMDOMr7ts8IQQpGoc014EZz4BkepmqcU")
      }
    },
    props: {
      source: String
    }
  }
</script>

<style lang="css">
.portrait {
  font-size: 50px;
}
#inspire {
  overflow-y: hidden;
}
.heading {
  width:100%;
  background-color:grey;
  margin-top:-4px;
  text-align: center;
  font-size: 12px;
}
.Rview {
  margin-left: -16px;
  margin-top: -16px;
  width: 102.4%;
}
</style>
