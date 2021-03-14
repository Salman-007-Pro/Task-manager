//CRUD Create Read Update and Delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'; // database name

MongoClient.connect(
  connectionUrl,
  {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName);
    // db.collection("users").insertOne(
    //   {
    //     name: "Muhammad Salman Asif",
    //     age: 23,
    //   },
    //   (error, result) => {
    //     if (error) return console.log("Unable to insert User");
    //     console.log(result.ops);
    //   }
    // );
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Hello world",
    //       isCompleted: false,
    //     },
    //     {
    //       description: "Make a Calculator",
    //       isCompleted: true,
    //     },
    //     {
    //       description: "Make a Car",
    //       isCompleted: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) return console.log("Unable to insert tasks");
    //     console.log(result.ops);
    //   }
    // );
    // db.collection('users').insertMany(
    //   [
    //     {
    //       name: 'Muhammad Ali',
    //       age: 25,
    //     },
    //     {
    //       name: 'Muhammad Minhaj',
    //       age: 20,
    //     },
    //     {
    //       name: 'Muhammad Absar',
    //       age: 19,
    //     },
    //     {
    //       name: 'Muhammad Wakeel',
    //       age: 32,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) return console.log('Unable to insert tasks');
    //     console.log(result.ops);
    //   }
    // );
    // db.collection('tasks').findOne(
    //   { _id: new ObjectID('60298074c86a940dc8665a27') },
    //   (error, result) => {
    //     if (error) return console.log('Unable to find task');
    //     console.log(result);
    //   }
    // );
    // db.collection('users')
    //   .find({ age: { $gte: 25 } })
    //   .toArray((error, result) => {
    //     if (error) return console.log('Unable to find users');
    //     console.log(result);
    //   });

    //   db.collection('tasks')
    //     .find({ isCompleted: false })
    //     .toArray((error, result) => {
    //       if (error) return console.log('Unable to find tasks');
    //       console.log(result);
    //     });
    //   db.collection('tasks').findOne(
    //     { _id: new ObjectID('60298074c86a940dc8665a28') },
    //     (error, result) => {
    //       if (error) return console.log('Unable to find task');
    //       console.log(result);
    //     }
    //   );
    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('602c189f71a0df21a8aaa235'),
    //     },
    //     {
    //       $set: {
    //         age: 21,
    //       },
    //     }
    //   )
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('602c189f71a0df21a8aaa235'),
    //     },
    //     {
    //       $inc: {
    //         age: 10,
    //       },
    //     }
    //   )
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('602c189f71a0df21a8aaa235'),
    //     },
    //     {
    //       $currentDate: {
    //         date: { $type: 'date' },
    //       },
    //     }
    //   )
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // db.collection('tasks')
    //   .updateMany(
    //     {
    //       isCompleted: false,
    //     },
    //     {
    //       $set: {
    //         isCompleted: true,
    //       },
    //     }
    //   )
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // db.collection('users')
    //   .deleteMany({
    //     age: { $gte: 25 },
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    db.collection('tasks')
      .deleteOne({
        description: 'Make a Calculator',
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
);
