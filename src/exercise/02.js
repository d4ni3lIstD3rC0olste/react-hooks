// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, initialValue, {
  serialize = JSON.stringify,
  deserialize = JSON.parse
} = {}) {
  const [state, setState] = React.useState(() => {
    const localStorageValue = window.localStorage.getItem(key);
    if (localStorageValue) {
      return deserialize(localStorageValue);
    } else {
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  })

  const previousKeyRef = React.useRef(key);

  React.useEffect(() => {
    if (previousKeyRef.current !== key) {
      window.localStorage.removeItem(previousKeyRef.current)
    }
    previousKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState];
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = useLocalStorageState('name', initialName);

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
