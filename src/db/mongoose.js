const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_SERVER_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minLength: 7,
//     validate(value) {
//       if (value.search(/password/i) !== -1)
//         throw new Error("Don't entered the password is password");
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) throw new Error('Email is invalid');
//     },
//     // get(value) {
//     //   return value + 23;
//     // },
//     // set(value) {
//     //   return value + 'hello world';
//     // },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) throw new Error('Age must be a positive number');
//     },
//   },
// });

// const me = new User({
//   name: '  Muhammad Ali Salman    ',
//   age: 10,
//   email: ' salmanasif36@gmail.com ',
//   password: 'asdasd1Password',
// });

// console.log(me.email);
// me.email = 'salman@live.com';
// console.log(me.email);

// me.save()
//   .then((res) => {
//     console.log(res);
//     console.log(me);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   isComplete: {
//     type: Boolean,
//   },
// });

// const doThat = new Task({
//   description: 'Buy a New Car',
//   isComplete: false,
// });

// doThat
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
