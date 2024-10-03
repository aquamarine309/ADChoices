import DescriptionDisplay from "../../DescriptionDisplay.js";
import EffectDisplay from "../../EffectDisplay.js";
import ChoiceList from "./ChoiceList.js";

export default {
  name: "ChoiceItem",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    ChoiceList
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isAbandoned: false
    }
  },
  computed: {
    config() {
      return this.group.config;
    },
    requirement() {
      return this.config.requirement();
    },
    choices() {
      return this.group.choices;
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.group.isUnlocked;
      this.isAbandoned = this.group.isAbandoned;
    }
  },
  template: `
    <div class="c-choice-group">
      <div class="c-choice-title">Choice Group {{ formatInt(config.id + 1) }}</div>
      <div v-if="isAbandoned">Abandoned</div>
      <div>
        <DescriptionDisplay
          :config="config"
          title="Reward:"
        />
        <EffectDisplay
          br
          :config="config"
        />
      </div>
      <div
        v-if="isUnlocked"
        class="c-choices"
      >
        <ChoiceList
          v-for="choice in choices"
          :key="choice.id"
          :choice="choice"
        />
      </div>
      <div v-else>
        <b>{{ requirement }} to show the choices</b>
      </div>
    </div>
  `
}