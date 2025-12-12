import React from 'react';
import * as ReactDOM from "react-dom/client";
import './App.css';
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import AddBook from './components/AddBook' ;
import DeleteBook from './components/deleteBook';
import PatchBook from './components/PatchBook';
import GetBookSearch from './components/GetBookSearch';
import GetAllBooks from './components/GetAllBooks' 

function App() {
  const [showAdd, setShowAdd] = useState(false)
  const[showDelete,setShowDelete]=useState(false)
  const[showPatch,setShowPatch]=useState(false)
   const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);   // afficher le composant GetBookSearch
  };
  return (
    <div className="header">
  <h1 className="titre">Ma Librairie</h1>

  <div>
    <input
      type="text"
      placeholder="Chercher un livre..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button onClick={handleSearchClick}>Rechercher</button>

    {showSearch && <GetBookSearch searchValue={searchTerm} />}
  </div>

  <div className="card">
    <GetAllBooks />
  </div>

  <button onClick={() => setShowAdd(true)}>Ajouter un livre</button>
  {showAdd && <div className="card"><AddBook /></div>}

  <button onClick={() => setShowDelete(true)}>Éliminer un livre</button>
  {showDelete && <div className="card"><DeleteBook /></div>}

  <button onClick={() => setShowPatch(true)}>Modifier un livre</button>
  {showPatch && <div className="card"><PatchBook /></div>}
</div>

  );
}

export default App;
