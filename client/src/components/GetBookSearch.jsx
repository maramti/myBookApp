import React, { useState, useEffect } from "react";
import axios from "axios";

function GetBookSearch({ searchValue }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!searchValue) return;

      try {
        const response = await axios.get("http://localhost:5000/search", {
          params: { name: searchValue }
        });
        setResults(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, [searchValue]); // <- déclenché à chaque nouveau mot recherché

  return (
   <div className="card">
  <h2>Résultats pour "{searchValue}"</h2>

  {results.length === 0 ? (
    <p>Aucun livre trouvé.</p>
  ) : (
    <ul>
      {results.map((book, index) => (
        <li key={index}>
          <strong>{book.name}</strong> — {book.author}
        </li>
      ))}
    </ul>
  )}
</div>

  );
}

export default GetBookSearch;

