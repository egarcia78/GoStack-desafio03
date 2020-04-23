import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repository ${Math.floor(Math.random() * 100)}`,
      url: "http://github.com/",
      techs: ["Node.js", "Javascript"],
    });

    const repository = response.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );

      const newRepositories = repositories;
      newRepositories.splice(repositoryIndex, 1);

      setRepository([...newRepositories]);
    }
  }

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
