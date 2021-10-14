<template>
<section class="view-all">
    <md-field md-clearable>
        <label>Search Question...</label>
        <md-input v-model="selectedQuestion" @keydown="filterQuestions"></md-input>
    </md-field>

    <md-card v-for="item of filteredItems" :key="item['.key']">
        <md-tooltip style="width: min-content;">{{item.Question}}</md-tooltip>
        <md-card-content class="mques">
            {{item.Question}}
        </md-card-content>
        <md-card-actions>
            <router-link :to="{name: 'Add', params: {id: item['.key']} }">
                <md-button class="md-dense">Edit</md-button>
            </router-link>
        </md-card-actions>
    </md-card>

    <div class="footer">
      <router-link to="/add">
        <md-button class="md-raised">
            + New
        </md-button>
      </router-link>
    </div>
</section>
    
</template>

<script>
import { database } from '../config/firebase'
export default {
  name: 'ViewAll',
  components: {},
  props: [],
  firebase: {
    items: database.ref('exams'),
  },
  data () {
    return {
      items: [],
      filteredItems: [],
      selectedQuestion: ""
    }
  },
  watch: {
    selectedQuestion () {
      if(!this.selectedQuestion)
        this.filteredItems = this.items
    }
  },
  computed: {
  },
  created() {

  },
  mounted () {
    this.filteredItems = this.items
  },
  methods: {
    filterQuestions() {
      if(this.selectedQuestion){
        this.filteredItems = this.items.filter(item => item.Question.toLowerCase().indexOf(this.selectedQuestion.toLowerCase()) > -1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view-all {
    @mixin overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
        text-align: left;
        overflow: hidden;
        .md-card-content {
            @include overflow;
            height: 3em;
        }
    }
    .mques {
        font-size: medium;
    }
    md-highlight-text {
        @include overflow;
    }
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        color: white;
        text-align: center;
        z-index: 1;
    }
}
</style>
