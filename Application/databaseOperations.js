var MongoClient = require("mongodb").MongoClient;
var databaseName = "sampledatabase";
var collectionName = "cottages";
var connectionString = "mongodb://ohjelmistotuotanto:h1CQcd0RZ4JIYXnwIQtm66EDB40Gh873lBoQDak3d0fLlckLdP6XwI3sAkOIQcj8S0RecsFjBd29wTatxWpZGA%3D%3D@ohjelmistotuotanto.documents.azure.com:10255/?ssl=true";

module.exports = {

    findCottages: function (callback, errorCallback) {
        var mongoClient = require("mongodb").MongoClient;
        mongoClient.connect( connectionString, function (err, client) {
            console.log("Connected correctly to server");
            var db = client.db(databaseName);
            // Get the documents collection
            const coll = db.collection(collectionName);
            // Find some documents
            coll.find({}).toArray( function (err, result) {
                if (err != null) throw errorCallback(err);
                client.close();
                callback(result);
            });
        });
    },

    findCottageById: function (id, callback, errorCallback) {
        var mongoClient = require("mongodb").MongoClient;
        mongoClient.connect( connectionString, function (err, client) {
            console.log("Connected correctly to server");
            var db = client.db(databaseName);
            // Get the documents collection
            const coll = db.collection(collectionName);
            // Find the document by id
            coll.findOne({ _id : id }, function( err, result ) {
                if (err != null) throw errorCallback(err);
                client.close();
                callback(result);
            });
        });
    },

    insertCottage: function (newData, callback, errorCallback) {
        // otetaan yhteys Azuren Cosmostietokantaan (mongodb on nosql-tyyppinen tietokanta)
        console.log(newData);
        const mongoClient = require("mongodb").MongoClient;
        mongoClient.connect(connectionString, function (err, client) {
            // tämä on tietokantasi nimi (tarkista Azure Cosmoksesta)
            var db = client.db(databaseName);
        
            // tämä on tietokannassasi olevan kokoelman nimi (tarkista Azure Cosmoksesta)
            const collection = db.collection(collectionName);
        
            collection.insertOne( newData, function(err, res) {
                if (err) throw errorCallback(err);
                client.close();
                callback(res)
            } );
        });
    }


}