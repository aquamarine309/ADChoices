import ChoiceItem from "./ChoiceItem.js";

export default {
  name: "ChoiceTab",
  components: {
    ChoiceItem
  },
  computed: {
    groups() {
      return ChoiceGroup.all;
    },
  },
  template: `
  <div>
    <ChoiceItem
      v-for="group in groups"
      :key="group.id"
      :group="group"
    />
  </div>
  `
 }