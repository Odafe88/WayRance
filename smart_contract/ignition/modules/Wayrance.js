const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const WayranceModule = buildModule("Wayrance", (m) => {
  const wayrance = m.contract("WayRance", 0x99dC5a4169f98C0F6a4851248979226cC49a06DE);

  return { wayrance, paymentTokenAddress};
});

module.exports = WayranceModule;