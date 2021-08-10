// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
//import { number } from 'yargs';
import { fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm } from '../pokemon';

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)

  const initialState = {
    status: 'idle',
    pokemon: null,
    error: null,
  }

  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setState({
      status: 'pending',
    });

    fetchPokemon(pokemonName).then(
      pokemonData => setState({
        pokemon: pokemonData,
        status: 'resolved',
      }), error => setState({
        error,
        status: 'rejected',
      })
    );
  }, [pokemonName]);

  /*return (
    <div>
      {status === 'idle' ? 'Submit a pokemon' : 
        status === 'pending' ? <PokemonInfoFallback name={pokemonName} /> : 
          status === 'resolved' ? <PokemonDataView pokemon={pokemon} /> : 
            <div role="alert">
              There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
            </div>
      }
    </div> 
  );*/
  switch (state.status) {
    case 'idle': 
      return 'Submit a pokemon';
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />;
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />;
    case 'rejected':
      return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
        </div>
      );
    default: 
      return 'Submit a pokemon';
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
