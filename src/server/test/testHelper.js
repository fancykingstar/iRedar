const mongoose = require('mongoose');
const db = require('../configs/keys').testDB;

before((done) => {
  mongoose.connect(
    db,
    { useNewUrlParser: true },
  );

  mongoose.connection
    .once('open', () => {
      mongoose.set('useCreateIndex', true);
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    })
    .on('error', (error) => {
      console.warn('Error', error);
    });
});

after((done) => {
  mongoose
    .disconnect()
    .then(() => done())
    .catch(err => done(err));
});

// beforeEach((done) => {
//   for (const collection in mongoose.connection.collections) {
//     mongoose.connection.collections[collection].drop(() => {});
//   }
//   return done();
// });
