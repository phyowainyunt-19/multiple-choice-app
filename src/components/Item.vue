<template>
  <section class="item" v-if="render">
    <div class="md-layout md-gutter md-alignment-center">
      <div
        class="
          md-layout-item md-medium-size-48 md-small-size-90 md-xsmall-size-100
        "
      >
        <md-toolbar class="md-accent md-dense border-rounded">
          <h3 class="md-title">Question # {{ index }}</h3>
        </md-toolbar>
        <md-card>
          <md-card-content class="text">{{ item.Question }}</md-card-content>
        </md-card>
      </div>

      <div
        class="
          md-layout-item md-medium-size-48 md-small-size-90 md-xsmall-size-100
        "
      >
        <md-toolbar class="md-accent md-dense border-rounded">
          <h3 class="md-title">Choose right option</h3>
        </md-toolbar>

        <md-card>
          <md-card-content align-center>
            <md-list v-for="Answer in item.Answers" :key="Answer.text">
              <md-list-item class="answer-list">
                <div class="wide-screen-responsive">
                  <md-radio
                    v-model="answer"
                    :value="Answer.text"
                    :disabled="!beforeSubmit || item.isDone"
                    >{{ Answer.text }}</md-radio
                  >
                  <md-icon v-if="(!beforeSubmit || item.isDone) && Answer.right"
                    >check</md-icon
                  >
                  <md-icon
                    v-if="
                      (!beforeSubmit &&
                        answer === Answer.text &&
                        answer !==
                          item.Answers.find((answer) => answer.right).text) ||
                      (item.isDone && item.wrongAnswer === Answer.text)
                    "
                    >close</md-icon
                  >
                </div>

                <div class="narrow-screen-responsive">
                  <button
                    :class="{
                      'right-class': item.isDone && Answer.right,
                      'wrong-class':
                        item.isDone &&
                        answer === Answer.text &&
                        answer !==
                          item.Answers.find((answer) => answer.right).text,
                      'true-class':
                        item.isDone && Answer.right && answer != Answer.text,
                    }"
                    :disabled="!beforeSubmit || item.isDone"
                    @click="checkButtonAnswer(Answer.text)"
                  >
                    {{ Answer.text }}
                  </button>
                </div>
              </md-list-item>
            </md-list>

            <div
              class="
                md-toolbar-section-end
                answer-submit
                wide-screen-responsive
              "
            >
              <md-button
                class="md-raised"
                :disabled="!answer"
                v-bind:class="[beforeSubmit ? 'md-secondary' : 'md-accent']"
                @click="checkSolution()"
                >{{ buttonText }}</md-button
              >
            </div>

            <div
              class="
                md-toolbar-section-end
                answer-submit
                narrow-screen-responsive
              "
              v-if="!beforeAnswer"
            >
              <md-button
                class="md-raised"
                :disabled="!answer"
                v-bind:class="[beforeSubmit ? 'md-secondary' : 'md-accent']"
                @click="checkButtonAnswer()"
                >Next</md-button
              >
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "item",
  props: {
    item: Object,
    index: Number,
    render: Boolean,
  },
  data() {
    return {
      answer: "",
      buttonText: "Submit",
      beforeSubmit: true,
      beforeAnswer: true,
    };
  },
  computed: {},
  mounted() {
    console.log("mouted");
  },
  updated() {},
  methods: {
    checkSolution() {
      if (!this.beforeSubmit) {
        this.beforeSubmit = true;
        this.buttonText = "Submit";
        this.answer = "";
        this.$emit("next-item");
        return;
      }
      this.beforeSubmit = false;
      this.buttonText = "Next";
      let rightAnswer = this.item.Answers.find((answer) => answer.right).text;
      let chooseAnswer = this.answer;
      if (rightAnswer === chooseAnswer) {
        this.$emit("set-tracked-item", { isDone: true, wrongAnswer: "" });
      } else {
        this.$emit("set-tracked-item", {
          isDone: true,
          wrongAnswer: chooseAnswer,
        });
      }
    },

    checkButtonAnswer(_answer) {
      if (this.item.isDone && !this.answer) return;
      this.answer = _answer;
      if (!this.beforeAnswer) {
        this.beforeAnswer = true;
        this.$emit("next-item");
        return;
      }
      this.beforeAnswer = false;
      let rightAnswer = this.item.Answers.find((answer) => answer.right).text;
      let chooseAnswer = this.answer;
      if (rightAnswer === chooseAnswer) {
        this.$emit("set-tracked-item", { isDone: true, wrongAnswer: "" });
      } else {
        this.$emit("set-tracked-item", {
          isDone: true,
          wrongAnswer: chooseAnswer,
        });
      }
    },
  },
  watch: {
    item() {
      this.answer = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  $accent-color: #b71c1c;
  $secondary-color: #fff;

  .md-layout-item {
    height: 35px;
    transition: 0.3s;
    margin: 0.7em 1em;
    padding: 0 0px !important;
    @media (max-width: 960px) {
      display: table;
    }
  }
  .md-card-content:last-of-type {
    padding-bottom: 1.5em;
  }
  .md-list {
    display: contents !important;
  }
  .md-dense {
    color: black !important;
  }
  .md-list-item {
    &.answer-list {
      display: 100%;
      margin-top: 4%;
      margin-bottom: -1%;
      @media (min-width: 1500px) {
        margin-bottom: -2%;
      }
    }
    button {
      color: black;
      width: 20em;
      background-color: #00897b;
      height: 45px;
    }
  }
  .md-list-item-container {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .color-light {
    background-color: rgba(255, 255, 255, 0.19) !important;
    color: #fff !important;
    box-shadow: none !important;
  }
  .text {
    color: grey;
    color: rgba(17, 17, 17, 0.71);
    text-align: left;
    margin-top: 1em;
  }
  .border-rounded {
    border-radius: 0.6em;
    top: 1em;
  }
  .md-accent {
    background-color: $accent-color !important;
  }
  .md-secondary {
    background-color: $secondary-color !important;
  }
  // custom
  .answer-submit {
    margin-top: 2em;
  }
  .md-toolbar {
    top: 1.7em !important;
  }
  .right-class {
    background-color: green !important;
    border: 2px solid black;
  }
  .wrong-class {
    background-color: red !important;
    border: 2px solid white;
  }
  .true-class {
    background-color: white !important;
    border: 2px solid green;
    color: green !important;
  }
  @media only screen and (max-width: 768px) {
    .wide-screen-responsive {
      display: none;
    }
  }
  @media only screen and (min-width: 769px) {
    .narrow-screen-responsive {
      display: none;
    }
  }
}
</style>