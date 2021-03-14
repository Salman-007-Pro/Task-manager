const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.search(/password/i) !== -1)
          throw new Error("Don't entered the password is password");
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid');
      },
      // get(value) {
      //   return value + 23;
      // },
      // set(value) {
      //   return value + 'hello world';
      // },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error('Age must be a positive number');
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'createdBy.owner',
});

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) throw new Error('Unable to login');

  const isMatch = await bycrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login');

  return user;
};

//password to store the in hash map
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password'))
    user.password = await bycrypt.hash(user.password, 8);

  next();
});

//delete relevant of user task if the user is removed
userSchema.pre('remove', async function (next) {
  const user = this;
  await Task.deleteMany({ 'createdBy.owner': user._id });
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, 'mynameisSalman', {
    expiresIn: '7 days',
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

//yeh instance ke upar call hota hai jab ke statics wala ko instance ki zaroorat hi nhi wo direct model ko used karta hai
// userSchema.methods.findByCredentials = async function (email, password) {
//   const user = await User.findOne({ email });
//   console.log(this);

//   if (!user) throw new Error('Unable to login');

//   const isMatch = await bycrypt.compare(password, user.password);

//   if (!isMatch) throw new Error('Unable to login');

//   return user;
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
