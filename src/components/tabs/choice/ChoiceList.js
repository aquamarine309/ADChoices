import DescriptionDisplay from "../../DescriptionDisplay.js";
import EffectDisplay from "../../EffectDisplay.js";

export default {
  name: "ChoiceList",
  components: {
    DescriptionDisplay,
    EffectDisplay
  },
  props: {
    choice: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isChosen: false,
      isBeingChosen: false
    }
  },
  computed: {
    config() {
      return this.choice.config;
    },
    btnIcon() {
      if (this.isChosen) {
        return "fas fa-unlock";
      } else if (this.isBeingChosen) {
        return "fas fa-clock";
      } else {
        return "fas fa-lock"
      }
    },
    btnClass() {
      return {
        "o-choice-btn": true,
        "o-choice-btn--being-chosen": this.isBeingChosen,
        "o-choice-btn--not-chosen": !this.isBeingChosen && !this.isChosen
      }
    },
  },
  methods: {
    update() {
      const choice = this.choice;
      this.isChosen = choice.isEffectActive;
      this.isBeingChosen = choice.group.chose === -1;
    },
    choose() {
      this.choice.choose();
    }
  },
  template: `
  <div
    :class="btnClass"
    @click="choose"
  >
    <div>
      <b><i :class="btnIcon" /> Choice {{ formatInt(config.id + 1) }} <i :class="btnIcon" /></b>
    </div>
    <div class="o-choice-effect">
      <DescriptionDisplay :config="config" />
      <EffectDisplay
        br
        :config="config"
      />
    </div>
  </div>
  `
}