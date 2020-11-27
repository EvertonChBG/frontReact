import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories, setRepository]  = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
            
      title: `title ${Date.now()}`
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    api.delete('repositories/' + id);

    const iRepositoryIndex = repositories.findIndex(Repository => Repository.id == id);
  
    if (iRepositoryIndex == -1) {
      return console.log({ error: 'Repository not found!' } )
    }
  
    repositories.splice(iRepositoryIndex, 1);
    setRepository([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map(respository => <li key={respository.id}>{respository.title}
          <button onClick={() => handleRemoveRepository(respository.id)}>
            Remover
          </button>
        </li>
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
