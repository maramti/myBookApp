import React, { useEffect, useState } from "react";
import axios from "axios";

function GetBookAll() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setBooks(response.data);
      } catch (err) {
        console.error("Erreur GET ALL:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="card">
  <h2>Mes livres :</h2>

  {books.length === 0 ? (
    <p>Aucun livre trouvé.</p>
  ) : (
    <ul>
      {books.map((book, index) => (
        <li key={index}>
          <strong>{book.name}</strong> — {book.author}
          (état : {book.status || "non défini"})
        </li>
      ))}
    </ul>
  )}
</div>

  );
}

export default GetBookAll;
