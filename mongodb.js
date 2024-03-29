const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Ravi',
    //     password: 'ravi'
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops)
    // })
    db.collection('feeds').insertOne([
        {
            name: 'Ravi',
            password: 'ravi'
        }
    ], (error, result) => {
        if(error){
            return console.log('unsable to insert users')
        }
        console.log(result.ops);
    })
})
