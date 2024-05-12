// CODE IS TAKEN STRAIGHT FROM https://github.com/Naramsim/Colosseum
// SPECIFICALLY THIS FUNCTION IS TAKEN FROM https://github.com/Naramsim/Colosseum/blob/master/src/scripts/helpers/getMultipliers.js
// ALL CREDIT TO @NARAMSIM ON GITHUB

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import all_types from "./all_types.json";

// @ts-ignore
export default function getMultipliers(types) {
  const multipliers = {
    defense: {},
    attack: {},
  };

  // @ts-ignore
  types.forEach((type) => {
    // @ts-expect-error
    const damage_relations = all_types[type];
    const no_damage_to = damage_relations.attack.zero;
    const no_damage_from = damage_relations.defense.zero;
    const half_damage_to = damage_relations.attack.half;
    const half_damage_from = damage_relations.defense.half;
    const double_damage_to = damage_relations.attack.double;
    const double_damage_from = damage_relations.defense.double;
    // @ts-ignore
    no_damage_to.forEach((type) => {
      if (multipliers.attack.hasOwnProperty(type)) {
        // @ts-ignore
        multipliers.attack[type] = multipliers.attack[type] * 0;
      } else {
        // @ts-ignore
        multipliers.attack[type] = 0;
      }
    });
    // @ts-ignore
    no_damage_from.forEach((type) => {
      if (multipliers.defense.hasOwnProperty(type)) {
        // @ts-ignore
        multipliers.defense[type] = multipliers.defense[type] * 0;
      } else {
        // @ts-ignore
        multipliers.defense[type] = 0;
      }
    });
    // @ts-ignore
    half_damage_to.forEach((type) => {
      if (multipliers.attack.hasOwnProperty(type)) {
        // @ts-ignore
        multipliers.attack[type] = multipliers.attack[type] * 0.5;
      } else {
        // @ts-ignore
        multipliers.attack[type] = 0.5;
      }
    });
    // @ts-ignore
    half_damage_from.forEach((type) => {
      if (multipliers.defense.hasOwnProperty(type)) {
        // @ts-ignore
        multipliers.defense[type] = multipliers.defense[type] * 0.5;
      } else {
        // @ts-ignore
        multipliers.defense[type] = 0.5;
      }
    });
    // @ts-ignore
    double_damage_to.forEach((type) => {
      if (multipliers.attack.hasOwnProperty(type)) {
        // @ts-ignore
        multipliers.attack[type] = multipliers.attack[type] * 2;
      } else {
        // @ts-ignore
        multipliers.attack[type] = 2;
      }
    });
    // @ts-ignore
    double_damage_from.forEach((type) => {
      if (multipliers.defense.hasOwnProperty(type)) {
        // @ts-ignore
        multipliers.defense[type] = multipliers.defense[type] * 2;
      } else {
        // @ts-ignore
        multipliers.defense[type] = 2;
      }
    });
  });
  return multipliers;
}
