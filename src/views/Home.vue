<template>
  <div id="nav" class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon class="micon">menu</md-icon>
      </md-button>
      <router-link to="/">
        <span class="md-title">Quizlet</span>
      </router-link>
      <div class="md-toolbar-section-end"></div>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <md-icon>public</md-icon>
      </md-toolbar>

      <md-list>
          <md-list-item class="list-item">
            <md-icon>search</md-icon>
            <span class="md-list-item-text">Search</span>
          </md-list-item>
          
          <md-list-item class="list-item">
            <md-icon>add</md-icon>
            <span class="md-list-item-text">Contribute</span>
          </md-list-item>

      </md-list>
    </md-drawer>
    <md-content>
      <quiz-item />
    </md-content>
  </div>
</template>

<script>
// @ is an alias to /src
import QuizItem from "../components/QuizItem.vue";
import Firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      showNavigation: false,
      showSidepanel: false,
    };
  },
  components: {
    QuizItem,
  },
  /* methods: {
    logout() {
      // code to logout
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }, 
  },*/
};
</script>

<style lang="scss" scoped>
$primary-color: #d50000;
body {
  font-family: sans-serif;
}

#nav {
  padding: 0px;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.list-item{
  cursor: not-allowed;
}

.md-title {
  font-size: 1.8em;
}

.md-primary {
  background-color: $primary-color !important;
}

.page-container {
  position: relative;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  position: fixed !important;
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-content {
  padding: 16px;
  height: -webkit-fill-available;
  position: relative;
}

router-link {
  text-decoration: none;
}
</style>
