export const Continuum = {
  getLinearContinuum(money, baseCost, costMultiplier){
    if (money.lte(baseCost.div(costMultiplier))) return 0;
    return this.log(money.div(baseCost), costMultiplier) + 1;
  },

  getLinearCost(boughtAmount, baseCost, costMultiplier) {
    return Decimal.pow(costMultiplier, boughtAmount).times(baseCost);
  },

  ipMultContinuum() {
    const money = player.records.thisEternity.maxIP;
    if (money.lte(1)) return 0;

    const upgrade = InfinityUpgrade.ipMult;
    const threshold = upgrade.config.costIncreaseThreshold;
    if (money.gte(threshold)) {
      return this.getLinearContinuum(
        money,
        threshold,
        10
      ) + upgrade.purchasesAtIncrease;
    } else {
      return money.log10();
    }
  },

  log(a, b) {
    return Decimal.log(a, b);
  }
}