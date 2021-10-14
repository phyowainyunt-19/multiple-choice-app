import { database } from '../../config/firebase'
export default {
  name: 'view-all',
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
