function getLast20YearsArray() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i < 20; i++) {
    years.push(currentYear - i);
  }

  return years;
}

function getNext5YearsArray(startYear) {
  const years = [];
  for (let i = 0; i < 6; i++) {
    years.push(+startYear + i);
  }
  return years;
}

export { getLast20YearsArray, getNext5YearsArray };
