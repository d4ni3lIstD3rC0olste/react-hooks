// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
//import { number } from 'yargs';
import { fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm } from '../pokemon';

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setPokemon(null);
    setError(null);

    fetchPokemon(pokemonName).then(
      pokemonData => setPokemon(pokemonData), 
      error => setError(error)
    );
  }, [pokemonName]);

  return (
    <div>
      {error ? 
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
      : (!pokemonName ? 'Submit a pokemon' : (!pokemon ? <PokemonInfoFallback name={pokemonName} /> : <PokemonDataView pokemon={pokemon} />))}
    </div>
    
  );
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
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
