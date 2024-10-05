import { DC } from "../constants.js";

export const choices = {
  reach100AM: {
    id: 0,
    requirement: () => `Reach ${format(100)} antimatter`,
    checkRequirement: () => player.antimatter.gte(100),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    choices: {
      boostNoReset: {
        id: 0,
        description: () => `Dimension Boosts no longer reset your antimatter`
      },
      improveBoosts: {
        id: 1,
        description: () => `Dimension Boosts are ${formatPercents(0.5)} stronger`,
        effect: 1.5
      },
      galaxyCost: {
        id: 2,
        description: () => `Decrease Antimatter Galaxy cost by ${formatInt(10)}`,
        effect: 10
      }
    }
  },
  firstGalaxy: {
    id: 1,
    requirement: () => "Purchase a Antimatter Galaxy",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    choices: {
      boostForAllDim: {
        id: 0,
        description: "Dimension Boosts boost all Dimensions from the beginning"
      },
      freeGalaxy: {
        id: 1,
        description: "When you only have one Antimatter Galaxy, you will gain a free Antimatter Galaxy (Activate immediately)",
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
    choices: {
      tripleIP: {
        id: 0,
        description: "Triple IP gain",
        effect: 3
      },
      doubleInf: {
        id: 1,
        description: "Double Infinity gain",
        effect: 2
      },
      breakRequirement: {
        id: 2,
        description: () => `The requirement of breaking Infinity is raised to ${formatFloat(0.3, 1)}s`,
        effect: 300
      }
    }
  },
  challenges: {
    id: 3,
    requirement: () => `Complete ${formatInt(6)} Challenges`,
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    choices: {
      otherChalls: {
        id: 0,
        description: "Complete other Challenges immediately",
        onChosen() {
          NormalChallenges.completeAll();
        }
      },
      adMultToSpeed: {
        id: 1,
        description: () => `Decrease buying ten multiplier (-${format(0.1, 0, 1)}), but multiply game speed by ${formatX(2)}`,
        effect: 2
      },
      autoUpgFree: {
        id: 2,
        description: "Autobuyer Upgrades are free"
      }
    }
  },
  breakInf: {
    id: 4,
    requirement: () => "Break Infinity",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BREAK_INFINITY,
    choices: {
      ip6365: {
        id: 0,
        description: () => `When Infinities or the exponent of current Infinity Points is a multiple of 11, IP gain ${formatX(6.365, 0, 3)}`,
        effect: 6.365,
        effectCondition: () => Currency.infinityPoints.exponent % 11 === 0 || Currency.infinities.value.toNumber() % 11 === 0
      },
      ipMultContinuum: {
        id: 1,
        description: `Unlock IP Multiplier Continuum`
      },
      decreaseReq: {
        id: 2,
        description: () => `Decrease the requirement of unlocking Infinity Dimension by ${format(DC.E100, 2)} antimatter`,
        effect: DC.E100
      }
    }
  }
}