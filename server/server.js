const express = require ('express');
const myDB=require ('./db/connection.js');
const cors =require ('cors');
const app=express()
app.use(cors());
app.use(express.json());
const feuille=myDB.collection('book');

app.get('/',async (req,res)=>{//méthode get sert dans coté serveur-navigateur 
        try{
            const docs = await feuille.find().toArray()
            res.json(docs);
            console.log("le navigateur m'a appelé via GET");
        }catch(e){
            console.error(e);
        }
        });
app.get('/search', async (req, res) => {
  const { name } = req.query;

  const query = {};
  if (name) query.name = name;

  try {
    const results = await feuille.find(query).toArray();
    res.json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

 app.post('/add',async (req,res)=>{ //méthode post est visible dans postman , on envoie les requetes à travers lui 
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
app.delete('/delete',async (req,res)=>{
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
app.patch('/patch',async(req,res)=>{ //ici c'est patch pas put car c'est une modification partielle pas de remplacement de doc
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
app.listen(5000,()=>{console.log('serveur en écoute au port 5000')})