const express = require('express');
const Task = require('../models/task');
const User = require('../models/user');

const auth = require('../middleware/auth');

const taskRouter = new express.Router();

taskRouter.post('/tasks', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: {
        owner: req.user._id,
      },
    });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});
//get /tasks?completed=true
//get /tasks?limit=10&skip=10
//get /tasks?sortBy=createdAt:desc
taskRouter.get('/tasks', auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};
    if (req.query.complete) match.isComplete = req.query.complete === 'true';
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

taskRouter.get('/task/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(req.user._id);
    const task = await Task.findOne({
      _id,
      'createdBy.owner': req.user._id,
    });
    if (!task) return res.status(404).send();
    res.status(200).send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

taskRouter.delete('/task/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOneAndDelete({
      _id,
      'createdBy.owner': req.user._id,
    });
    if (!task) return res.status(404).send('task not found');
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

taskRouter.patch('/task/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpadates = ['description', 'isComplete'];

  const isValidOperation = updates.every((update) => {
    const regexp = new RegExp(update, 'gi');
    return regexp.test(allowedUpadates);
  });

  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid Updates!' });

  try {
    const _id = req.params.id;
    const task = await Task.findOne({
      _id,
      'createdBy.owner': req.user._id,
    });
    // const task = await Task.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) return res.status(404).send();

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    res.status(200).send(task);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = taskRouter;
