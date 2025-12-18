import react from 'react'
import { useState } from 'react'
import axios from 'axios'

function DeleteBook(){
   const [nameBook,setNameBook]=useState("")
   const [nameAuthor,setNameAuthor]=useState("")
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!nameBook || !nameAuthor){
            alert("veuillez remplir les champs! ")
            return
        }
    
       try{ 
        const response= await axios.delete("http://localhost:5000/delete",{
        data: {
            name:nameBook,
            author:nameAuthor
        }
        
      }) ;
        console.log('livre éliminé: ',response.data)
    }  catch(e){
        console.error(e);
       } }
    return(
        <div className="card side-card">
  <form onSubmit={handleSubmit}>
    <label>Titre du livre :</label>
    <input type="text" value={nameBook} onChange={(e) => setNameBook(e.target.value)} />

    <label>Nom d'auteur :</label>
    <input type="text" value={nameAuthor} onChange={(e) => setNameAuthor(e.target.value)} />

    <button type="submit">Éliminer</button>
  </form>
</div>

    )
}
export default DeleteBook ;