import React, { useState } from 'react';
import axios from 'axios';

function PatchBook() {
    const [nameBook, setNameBook] = useState("");
    const [nameAuthor, setNameAuthor] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nameBook || !nameAuthor || !status) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        try {
            const response = await axios.patch("http://localhost:5000/patch", {
                name: nameBook,
                author: nameAuthor,
                status: status
            });
            console.log("Livre mis à jour :", response.data);
            alert("Livre mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error.response?.data || error.message);
            alert("Erreur lors de la mise à jour du livre !");
        }
    };

    return (
       <div className="card side-card">
  <form onSubmit={handleSubmit}>
    <label htmlFor="titre">Titre du livre :</label>
    <input id="titre" type="text" value={nameBook} onChange={(e) => setNameBook(e.target.value)} /> <br/>

    <label htmlFor="auteur">Nom d'auteur :</label>
    <input id="auteur" type="text" value={nameAuthor} onChange={(e) => setNameAuthor(e.target.value)} /> <br/>

    <label htmlFor="status">État du livre :</label>
    <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
      <option value="">--Choisir un état--</option>
      <option value="terminé">terminé</option>
      <option value="en cours de lecture">en cours de lecture</option>
      <option value="en pause">en pause</option>
      <option value="va lire">va lire</option>
    </select>

    <button type="submit">Mettre à jour</button>
  </form>
</div>

    );
}

export default PatchBook;
