import { DC } from "../constants.js";

export const choices = {
  reach100AM: {
    id: 0,
    requirement: () => `Reach ${format(100)} antimatter`,
    checkRequirement: () => player.antimatter.gte(100),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `Provide +${format(5)} multiplier to all Dimensions per choice`,
    effect: () => DC.D5.times(ChoiceGroup.unlockedCount).clampMin(1),
    formatEffect: value => formatX(value, 2),
    choices: {
      startingBoosts: {
        id: 0,
        description: () => `Start every reset with ${formatInt(3)} Dimension Boosts (Effective immediately)`,
        onChosen() {
          player.dimensionBoosts = Math.max(player.dimensionBoosts, 3);
        }
      },
      improveBoosts: {
        id: 1,
        description: () => `Dimension Boosts are ${formatPercents(0.25)} stronger`,
        effect: 1.25
      },
      cheapBoosts: {
        id: 2,
        description: () => `Decrease the number of Dimensions needed for Dimension Boosts and Antimatter Galaxies by ${formatInt(1)}`,
        effect: 1
      }
    }
  },
  firstGalaxy: {
    id: 1,
    requirement: () => "Purchase a Antimatter Galaxy",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    description: () => `Increase buying ten multiplier by ${format(0.1, 0, 1)}`,
    effect: 0.1,
    choices: {
      boostForAllDim: {
        id: 0,
        description: "Dimension Boosts boost all Dimensions from the beginning"
      },
      freeGalaxy: {
        id: 1,
        description: "When you only have one Antimatter Galaxy, you will gain a free Antimatter Galaxy (Effective immediately)",
        onChosen() {
          applyFreeGalaxy();
        }
      },
      gainAchievement: {
        id: 2,
        description: "Unlock the first four rows of Achievement immediately",
        onChosen() {
          Achievements.rows(1, 4).forEach(row => row.forEach(ach => ach.unlock()));
        }
      }
    }
  },
  crunch: {
    id: 2,
    requirement: () => "Big Crunch",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    description: () => `AD1 - AD5 produce ${formatX(3)} faster, but AD6 - AD8 produce ${formatX(1)}/${format(8)} slower`,
    isAbandoned: () => ChoiceGroup.crunch.choices.abandon.canBeApplied,
    choices: {
      tripleIP: {
        id: 0,
        description: "Triple IP gain",
        effect: 3
      },
      doubleInf: {
        id: 1,
        description: "Double Infinities gain",
        effect: 2
      },
      breakRequirement: {
        id: 2,
        description: () => `The requirement of breaking Infinity are raised to ${formatFloat(0.3, 1)}s`,
        effect: 0.3
      },
      abandon: {
        id: 3,
        description: () => "Abandon this Choice Group"
      }
    }
  }
}