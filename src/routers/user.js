const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');
const userRouter = new express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error('Please upload a image'));
    }
    cb(undefined, true);
  },
});

userRouter.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

userRouter.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

userRouter.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send('successful logout');
  } catch (err) {
    res.status(500).send(err);
  }
});
userRouter.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send('successful All session of user logout');
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.get('/users/me', auth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

userRouter.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user && !user.avatar) {
      throw new Error('User has not avatar pic');
    }
    res.set('Content-Type', 'image/png');
    res.status(200).send(user.avatar);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

userRouter.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    // req.user.avatar = req.file.buffer;
    await req.user.save();
    res.status(200).send('successfully uploaded avatar!!');
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

userRouter.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    if (!req.user.avatar) throw new Error('Avatar is Already deleted');
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send('avatar is removed!!');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

userRouter.get('/users/:id', async (req, res) => {
  try {
    // const { id } = req.params;
    // const user = await User.findById(id);
    // if (!user) return res.status(404).send();
    res.status(200).send('Currently the this route is maintances');
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.status(200).send(req.user);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

userRouter.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpadates = ['name', 'email', 'password', 'age'];

  const isValidOperation = updates.every((update) => {
    const regexp = new RegExp(update, 'gi');
    return regexp.test(allowedUpadates);
  });

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid Updates!' });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.status(200).send(req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = userRouter;
