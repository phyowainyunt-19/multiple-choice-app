export default {
    name: 'item',
    components: {},
    props: {
        item: Object,
        index: Number,
        render: Boolean
    },
    data() {
        return {
            answer: '',
            buttonText: 'Submit',
            beforeSubmit: true,
            beforeAnswer: true,
        }
    },
    computed: {

    },
    mounted() {
        console.log('mouted');

    },
    updated() {

    },
    methods: {
        checkSolution() {
            if (!this.beforeSubmit) {
                this.beforeSubmit = true
                this.buttonText = 'Submit'
                this.answer = ''
                this.$emit('next-item');
                return;

            }
            this.beforeSubmit = false;
            this.buttonText = 'Next';
            let rightAnswer = this.item.Answers.find(answer => answer.right).text;
            let chooseAnswer = this.answer;
            if (rightAnswer === chooseAnswer) {
                this.$emit('set-tracked-item', { isDone: true, wrongAnswer: '' })
            } else {
                this.$emit('set-tracked-item', { isDone: true, wrongAnswer: chooseAnswer })
            }

        },

        checkButtonAnswer(_answer) {
            if (this.item.isDone && !this.answer) return;
            this.answer = _answer
            if (!this.beforeAnswer) {
                this.beforeAnswer = true
                this.$emit('next-item');
                return;
            }
            this.beforeAnswer = false;
            let rightAnswer = this.item.Answers.find(answer => answer.right).text;
            let chooseAnswer = this.answer;
            if (rightAnswer === chooseAnswer) {
                this.$emit('set-tracked-item', { isDone: true, wrongAnswer: '' })
            } else {
                this.$emit('set-tracked-item', { isDone: true, wrongAnswer: chooseAnswer })
            }


        }



    },
    watch: {
        item() {
            this.answer = ''
        }
    },
}