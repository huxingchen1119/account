const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter);

db.defaults({ posts: [], user: {} })
  .write()

  // Add a post
// db.get('posts')
// .push({ id: 1, title: 'lowdb is awesome'})
// .write()
// db.get('posts')
// .push({id:2,'title':"sunny day~"})
// .write()

// db.get('posts')
// .push({id:3,'title':"cloudy day~"})
// .write()

// let res = db.get('posts')
// .remove({id:3})
// .write()
// console.log(res);

// let res = db.get('posts').find({id:1}).value()
// console.log(res);
db.get('posts').find({id:1}).assign({title:'sunny'}).write();
// Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
// .write()