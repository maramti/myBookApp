import React from "react";
import {useState} from 'react';
import axios from 'axios';
function AddBook(){ //component name starts with capital letter
const[nameBook,setNameBook]=useState("");
const[nameAuthor,setNameAuthor]=useState("");
const[genre,setGenre]=useState("");
const[isRead,setIsRead]=useState("");

const handleSubmit=async(e)=>{

    e.preventDefault();
     if(!nameBook || !nameAuthor || !genre || !isRead){
            alert("veuillez remplir les champs! ")
            return
        }
    const response=await axios.post('http://localhost:5000/add',{
        name:nameBook,
        author:nameAuthor,
        genre:genre,
        status:isRead
    });
    console.log('livre est ajouté à votre librairie',response.data)
}

return(
   <div className="card">
  <form onSubmit={handleSubmit}>
    <label>Nom</label>
    <input type="text" value={nameBook} onChange={(e)=>setNameBook(e.target.value)} /> <br/>

    <label>Auteur</label>
    <input type="text" value={nameAuthor} onChange={(e)=>setNameAuthor(e.target.value)} /> <br/>

    <label>Genre</label>
    <input type="text" value={genre} onChange={(e)=>setGenre(e.target.value)} /> <br/>

    <label>État du livre</label>
    <select value={isRead} onChange={(e) => setIsRead(e.target.value)}>
      <option value="">--Choisir un état--</option>
      <option value="terminé">terminé</option>
      <option value="en cours de lecture">en cours de lecture</option>
      <option value="en pause">en pause</option>
      <option value="va lire">va lire</option>
    </select>

    <button type="submit">Ajouter</button>
  </form>
</div>

)}
export default AddBook
