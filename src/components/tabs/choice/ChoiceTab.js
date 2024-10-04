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
  methods: {
    hardReset() {
      Modal.hardReset.show();
    }
  },
  template: `
  <div>
    <div>
      <PrimaryButton @click="hardReset">
        Hard Reset
      </PrimaryButton>
    </div>
    <br>
    <ChoiceItem
      v-for="group in groups"
      :key="group.id"
      :group="group"
    />
  </div>
  `
 }