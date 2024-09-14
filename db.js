const {MongoClient} = require('mongodb');

let dbConnection;

module.exports= {
     connectToDb: (cb) => {
        MongoClient.connect('')
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.error(`Error connecting to MongoDB: ${err.message}`);
            process.exit(1);
        });
     },

     getDb:() => dbConnection
}