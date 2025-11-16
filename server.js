const {MongoClient} = require('mongodb'); //import the class MongoClient from mongodb module
const express=require('express');
const app=express();
const PORT= 3500;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const uri='';
const client = new MongoClient(uri);
const myDB=client.db("myBookDB");
const feuille=myDB.collection('book');
/*try{
     feuille.dropIndex('name_1_author_1');
    console.log("index est suprimé");
}catch(e){
    console.error(e);
}*/
//feuille.createIndex({name:1,author:1},{unique:true}); //the index is meant to guarantee uniqueness of each book

async function main(){
    try{
        await client.connect(); //we have to wait for the conneciton to be established
       // await listDatabases(client);
        //await ajouter('Usogui','Dostoievski','litérature russe','on hold'); //we have to write await bc all these functions are asynchronous and therefore the code will execute the finally () and session will end 
        /*await  ajouter('Usogui','Nihei','manga japonais','en train de lire');
        await ajouter('Hunter X Hunter','Yoschihiro Togashi','manga japonais','on hold');
        await ajouter('vagabond','Takehiko Inoue','manga japonais','terminé');*/
        //await supprimer('Usogui','Dostoievski',feuille);
        // await recuperer('Usogui',feuille);
       // await modifier('Usogui','Nihei',feuille,'en train de lire');
       console.log("serveur connécté");
        app.get('/book',async( req, res)=>{ //méthode get sert dans coté serveur-navigateur 
            try{
                const docs = await feuille.find().toArray();
                res.json(docs);
                console.log("le navigateur m'a appelé via GET");
            }catch(e){
                console.error(e);
            }
        });
        app.post('/book',async (req,res)=>{ //méthode post est visible dans postman , on envoie les requetes à travers lui 
            const {name,author,genre,status} = req.body ;
                try{
                    const result = await feuille.insertOne({name,author,genre,status});
                    res.status(201).json({message:'livre ajouté avec succés',id:result.insertedId});
                }catch(e){
            console.error(e);
            if(e.code==11000) res.status(400).json({message:'ce livre est déjà existant'});
            else res.status(500).json({message:'problème de serveur'});
                }
        });
        app.listen(3500,()=> console.log(`server runnin on port:${PORT} `));
        app.delete('/book',async (req,res)=>{
            const {name,author} = req.body;
            try{
                const result = await feuille.findOne({name,author}); // findOne retourne le doc lui meme  
                if(result){
                    const deletionResult= await feuille.deleteOne({name,author}); //deleteOne needs the query not the doc, et elle retourne un objet deleteResult qu'on le wrap dans deletionResult
                    res.status(201).json({message:'livre supprimé avec succés',id:deletionResult.deletedCount});
                }else {
                    res.status(400).json({message:"document introuvable"});

            }}catch(e){
                console.error(e);
            }
        });
        app.patch('/book',async(req,res)=>{ //ici c'est patch pas put car c'est une modification partielle pas de remplacement de doc
            const {name,author,status}=req.body;
            try{
                const query = {name,author}
                const update = {$set: {status:status}};
                const options={}
                if (query){
                    const result= await feuille.updateOne(query,update,options); //cette méthode on the other hand retourne uun objet updateResult
                    res.status(201).json({message:"la modification est terminée",id:result.insertedId});
                }else{
                    res.status(400).json({message:"document introuvable"});
                }
            }catch(e){
                console.error(e);
            }
        });
    }catch(e) {
        console.log("probleme de connexion");
        console.error(e);
    
    } /*finally {
        await client.close();
        console.log('client fermé');
    }*/
};

/*
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
*/

/*
async function ajouter(titre,auteur,genre,etat){ //methode POST
    const doc={name:titre,author:auteur,genre:genre,status:etat};  
    try{
        const result=await feuille.insertOne(doc);
        console.log("l'insertion de ",titre," est terminée ",result.insertedId);
    }catch(error){
        if(error.code==11000){ //code d'erreur pour l'indexe NAME_1_AUTHOR_1
            console.log(titre," de ",auteur," déjà existe.");
        }else{
            console.log("probleme en niveau d'ajout");
            console.error(error);
        }
    }
}

async function supprimer(titre,auteur,feuille){ //fonctionalité de méthode DELETE
    try{ //we're catching the error for findOne method
         const trouve_doc = await feuille.findOne({name:titre,author:auteur}); 
         if(trouve_doc){
            await feuille.deleteOne({author:auteur,name:titre}) ; //keys dont have to be in order
            console.log("supression de ",titre," est terminée.")
         }else{
            console.log("ce document est introuvable");
         }

    }catch(error){
        console.error(error);
    }
}
async function recuperer(titre,feuille){//fonctionalité de méthode GET
    try{
        const resultat = feuille.find({name:titre}); //find() retourne un curseur du coup on n'utilise pas await car elle ne retourne pas une promesse
        const docs =await resultat.toArray(); //on doit attendre que la promesse se tienne car le code suivant a besoin de la valeur concrète 
        if(resultat){
            console.log(docs) ;
        }else{
            console.log('document introuvable');
        }
    }catch(e){
        console.error(e);
    }
};
//name:titre,author:auteur,genre:genre,
async function modifier(titre,auteur,feuille,etat){//méthode PUT de modification partielle avec $set (la valeur de la clé status)
    const query = {name:titre,author:auteur}; //sans les cotes sinon il prend la chaine de caracteres de la variable litérament 
    const update = {$set: {status:etat}} ;
    const options ={}
    try{
        const result = await feuille.updateOne(query,update,options); // updateOne retourne un objet UpdateResult , we wrap it in result it has four properties
        console.log(result);
    }catch(e){
        console.log('probleme de PUT');
        console.error(e); 
    }
}*/
main().catch(console.error);


