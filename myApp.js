const mongoose = require('mongoose')
require('dotenv').config();
const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret, ({ useNewUrlParser: true, newUnifiedTopology: true }));

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, age: {
    type: Number
  }, favoriteFoods: {
    type: [String]
  }
});

let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const person1 = new Person({ name: 'Neeraj', age: 26, favoriteFoods: ['tomato chutney', 'samosa'] })
  person1.save((err, data) => {
    if (err) {
      console.log(err)
    }
    done(null, data);
  })
};

const createManyPeople = async (arrayOfPeople, done) => {
  const data = await Person.create(arrayOfPeople)
  done(null, data);
};

const findPeopleByName = async (personName, done) => {
  const data = await Person.find({ name: personName })
  done(null, data);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log(err)
    }
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      console.log(err)
    }
    done(null, data);

  })
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  const person = await Person.findById(personId)
  person.favoriteFoods.push(foodToAdd)
  person.save((err, data) => {
    if (err) {
      console.log(err)
    }
    done(null, data);
  })
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true, runValidators: true }, (err, data) => {
    if (err) {
      console.log(err)
    }
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.log(err)
    }
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) {
      console.log(err)
    }
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 'asc' })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) {
        console.log(err)
      }
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
