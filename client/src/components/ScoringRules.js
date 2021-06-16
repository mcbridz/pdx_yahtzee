const sum = (dice) => {
  return dice.reduce((prev, curr) => prev + curr);
};

// counts frequency of each dice

const sameDice = (dice) => {
  console.log("test");
  const freqs = new Map();
  for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
  console.log(Array.from(freqs.values()));
  return Array.from(freqs.values());
};

// number of times a val appears in dice
const count = (dice, val) => {
  return dice.filter((d) => d === val).length;
};

const totalOneNumber = (dice, val) => {
  return val * count(dice, val);
};

const fullHouse = (dice) => {
  const freqs = sameDice(dice);
  return freqs.includes(3) && freqs.includes(2) ? 25 : 0;
};

const smStraight = (dice) => {
  const d = new Set(dice);
  if (d.has(2) && d.has(3) && d.has(4) && (d.has(1) || d.has(5))) return 30;
  else if (d.has(2) && d.has(3) && d.has(4) && (d.has(1) || d.has(5)))
    return 30;
  else return 0;
};
