import ChoiceItem from "./ChoiceItem.js";
import PrimaryButton from "../../PrimaryButton.js";

export default {
  name: "ChoiceTab",
  components: {
    ChoiceItem,
    PrimaryButton
  },
  computed: {
    groups() {
      return ChoiceGroup.all;
    },
  },
  template: `
  <div>
    <div>
      <PrimaryButton>
        Hard Reset
      </PrimaryButton>
    </div>
    <ChoiceItem
      v-for="group in groups"
      :key="group.id"
      :group="group"
    />
  </div>
  `
 }