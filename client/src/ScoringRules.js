export const sum = (dice) => {
  return dice.reduce((prev, curr) => prev + curr);
};

// counts frequency of each dice

export const sameDice = (dice) => {
  console.log("test");
  const freqs = new Map();
  for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
  console.log(Array.from(freqs.values()));
  return Array.from(freqs.values());
};

// number of times a val appears in dice
export const count = (dice, val) => {
  console.log('////////////////////////////////')
  console.log(dice)
  return dice.filter((d) => d === val).length;
};

// const totalOneNumber = (dice, val) => {
//    return val *count(dice, val);
// };

export const fullHouse = (dice) => {
  const freqs = sameDice(dice);
  return freqs.includes(3) && freqs.includes(2) ? 25 : 0;
};

export const smStraight = (dice) => {
  const d = new Set(dice);
  if (d.has(2) && d.has(3) && d.has(4) && (d.has(1) || d.has(5))) return 30;
  else if (d.has(3) && d.has(4) && d.has(5) && (d.has(2) || d.has(6)))
    return 30;
  else return 0;
};

export const lgStraight = (dice) => {
  const d = new Set(dice);
  if (d.has(2) && d.has(3) && d.has(4) && d.has(5) && (d.has(1) || d.has(6)))
    return 40;
  else return 0;
};

export const yahtzee = (dice) => {
  return sameDice(dice)[0] === 5 ? 50 : 0;
};

export const threeOfAKind = (dice) => {
  if (sameDice(dice).includes(3)) {
    return sum(dice);
  } else {
    return 0;
  }
};

export const fourOfAKind = (dice) => {
  if (sameDice(dice).includes(4)) {
    return sum(dice);
  } else {
    return 0;
  }
};

export const chance = (dice) => {
  return sum(dice);
};
