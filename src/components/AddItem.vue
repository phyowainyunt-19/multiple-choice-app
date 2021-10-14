<template lang="html">
  <section class="add-item">
    <div class="container">
      
      <md-field>
        <label>Type Question...</label>
        <md-textarea v-model="newExamItem.Question"></md-textarea>
      </md-field>

      <div>
        <md-list>
          <md-list-item v-for="item in newExamItem.Answers" :key="item.text">
            <md-radio v-model="radio" :value="item.text"/>
            <span class="md-list-item-text">{{item.text}} </span>

                <label class="ma-2" @click="deleteAns(item)">
                  X
                </label>
              

          </md-list-item>
        </md-list>
      </div>

      <md-field>
        <label></label>
        <md-icon>add</md-icon>
        <md-input placeholder="Add a solution" v-model="new_solution" @keyup.enter="addNewSolution()"></md-input>
      </md-field>
      <md-button class="md-raised primary-color pull-right" @click="addExam()" id='saveBtn'>Save</md-button>
    </div>

  </section>

</template>

<script lang="js">
  import { database } from '../config/firebase'
  export default {
    name: 'add-item',
    firebase: {
      exams: database.ref('exams'),
      examObject: {
        source: database.ref('exams'),
        asObject: true
      }
    },

    props: [],
    mounted() {
      console.log('mounted add item');
      if(this.$route.params.id) {
        let requestedExamItem = this.examObject[this.$route.params.id]
        this.newExamItem = requestedExamItem
        this.radio = requestedExamItem.Answers.find(item => item.right).text
        document.getElementById('saveBtn').textContent = 'Update'
      }
    },
    data() {
      return {
        newExamItem: {
          Question: '',
          Answers: [],
        },
        radio: '',
        new_solution: '',
      }
    },
    methods: {
      deleteAns(_ans){
        let index = this.newExamItem.Answers.indexOf(_ans)
        this.newExamItem.Answers.splice(index, 1)

        let is_any_right_answer=this.newExamItem.Answers.some((item)=>item.right == true)
        let last_index=this.newExamItem.Answers.slice(-1)[0]

        if(!is_any_right_answer)
          this.radio=last_index.text


        
      },
      // post to firebase
      addExam() {
        // assign right answer to true
        this.newExamItem.Answers.map(item => {
          item.right = (item.text === this.radio) ? true : false
        })
        // update firebase data
        if(this.$route.params.id){
          console.log('updating...', this.$route.params.id);
          this.$firebaseRefs.exams.child(this.$route.params.id).set(this.newExamItem)
          this.$router.push('/index')
          return;
        }
        // insert firebase data
        this.$firebaseRefs.exams.push({
          Question: this.newExamItem.Question,
          Answers: this.newExamItem.Answers
        })
        this.newExamItem.Question = ''
        this.newExamItem.Answers = []
        this.$router.push('/index')
      },
      
      updateExamItem() {
        this.$firebaseRefs.exams.child(this.$route.params.id).set(this.newExamItem)
        this.$router.push('/index')
      },
      // local ui update
      addNewSolution() {
        if(!this.new_solution)
          return;
        let arr = this.newExamItem.Answers;
        arr.push({
          text: this.new_solution,
          right: false
        })
        this.radio = this.new_solution
        this.new_solution = ''
      }
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
.add-item {
  .primary-color {
    background-color: #33b5e5 !important;
    color: #fff !important;
  }

  md-radio {
    display: flex;
  }

  .pull-right {
    float: right;
  }
}


</style>