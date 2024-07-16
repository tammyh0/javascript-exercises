function getAge(person) {
  return (person.yearOfDeath ? person.yearOfDeath : new Date().getFullYear()) - person.yearOfBirth;
}

const findTheOldest = function(people) {
  return people.reduce((oldestPerson, currentPerson) => {
    const oldestAge = getAge(oldestPerson);
    const currentAge = getAge(currentPerson);

    return oldestAge > currentAge ? oldestPerson : currentPerson;
  });
};

// Do not edit below this line
module.exports = findTheOldest;
