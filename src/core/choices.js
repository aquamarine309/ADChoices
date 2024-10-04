import { GameMechanicState } from "./game-mechanics/index.js";

class ChoiceState extends GameMechanicState {
  constructor(config, group) {
    super(config);
    this.group = group;
  }

  get isEffectActive() {
    return this.group.chose === this.id;
  }

  choose() {
    if (this.group.chose !== -1) return;
    this.group.chose = this.id;
    this.config.onChosen?.();
    TabNotification.newChoiceGroup.clearTrigger();
  }
}

class ChoiceGroupState extends GameMechanicState {
  constructor(config) {
    super(config);
    this.choices = {};
    for (const choice in config.choices) {
      this.choices[choice] = new ChoiceState(config.choices[choice], this);
    }
    this.registerEvents(config.checkEvent, args => this.tryUnlock(args));
    // TODO: Remove this code when all choices are determined
    // if (this.chose === undefined) this.chose = -1;
  }

  get isUnlocked() {
    return (player.choiceUnlockedBits & (1 << this.id)) !== 0;
  }

  tryUnlock(args) {
    if (this.isUnlocked) return;
    if (this.config.checkRequirement(args)) this.unlock();
  }

  unlock() {
    player.choiceUnlockedBits |= (1 << this.id);
    TabNotification.newChoiceGroup.tryTrigger();
    GameCache.unlockedChoiceGroups.invalidate();
  }

  get chose() {
    return player.choices[this.id];
  }

  set chose(value) {
    if (!this.isUnlocked) return;
    player.choices[this.id] = value;
  }

  get isEffectActive() {
    return this.chose !== -1;
  }
}

export const ChoiceGroup = mapGameDataToObject(
  GameDatabase.choices,
  config => new ChoiceGroupState(config)
);

Object.defineProperty(ChoiceGroup, "unlockedCount", {
  get: function() {
    return GameCache.unlockedChoiceGroups.value;
  }
});