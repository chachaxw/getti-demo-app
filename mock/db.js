const practice = require('./practice');
const learn = require('./learn');

module.exports = function() {
  return {
    learn: learn(),
    practice: practice(),
  };
}
