const {MongoClient} = require('mongodb');
require('dotenv').config();
const uri = process.env.ATLAS_URI|| "";

const client = new MongoClient(uri);
if(!uri){
    console.log('uri introuvable')
}
try{
    client.connect(); 
    console.log("serveur connécté à la base");
    }catch(e) {
        console.log("probleme de connexion");
        console.error(e);
    } 
const myDB=client.db("myBookDB");
module.exports= myDB;