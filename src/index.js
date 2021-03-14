const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

//middleware
// app.use((req, res, next) => {
//   res.status(503).send('Currently the Site is Maintanence mode');
// });

app.use(express.json());

// const multer = require('multer');
// const upload = multer({
//   dest: 'images',
// });

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send('successfully uploaded imaged!!');
// });

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ', port);
});

// const User = require('./models/user');
// const Task = require('./models/task');

// const main = async () => {
//   // const task = await Task.findById('603abf29baa26b068c1b439e');
//   // await task.populate('createdBy.owner').execPopulate();
//   // console.log(task.createdBy);
//   const user = await User.findById('603abf10baa26b068c1b439c');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };
// main();

// const bycrypt = require('bcryptjs');

// const myFunction = async () => {
//   const password = 'salman123';
//   const hashPassword = await bycrypt.hash(password, 10);

//   console.log(password);
//   console.log(hashPassword);

//   const isMatch = await bycrypt.compare(password, hashPassword);
//   console.log(isMatch);
// };

// myFunction();

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'mynameisSalman', {
//     expiresIn: '7 days',
//   });
//   console.log(token);
//   const isValid = jwt.verify(token, 'mynameisSalman');
//   console.log(isValid);
// };
// myFunction();
