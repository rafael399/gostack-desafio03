import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio 3",
      techs: ["React", "Node.js"],
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    
    const tempArray = [...repositories];
    
    const repoIndex = tempArray.findIndex(r => r.id === id);
    
    if (repoIndex !== -1) {
      tempArray.splice(repoIndex, 1);
      setRepositories(tempArray);
    }
    
    return response;
  }

  return (
    <div className="container">
      <div className="content">
        <ul data-testid="repository-list">
          {repositories.map(rep => (
            <li key={rep.id}>
              <span>{rep.title}</span>
              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
