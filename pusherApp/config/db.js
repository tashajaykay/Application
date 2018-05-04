const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose
.connect
('mongodb://tasha:123@ds111370.mlab.com:11370/pusher')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
