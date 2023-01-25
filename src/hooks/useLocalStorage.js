import React from "react";
import {useState, useEffect} from 'react';

// Further Study: useLocalStorage hook»
// If we sync our arrays of state data to local storage, we could persist our cards even after a page refresh. Let’s build a custom hook called useLocalStorage which works like useState, except it also syncs to local storage after every state change, and tries to read from local storage when the component renders.

// useLocalStorage should accept two arguments. The first should be a key, corresponding to the key in local storage. The second should be an initial value to put into local storage (assuming no value already exists).

// Once you have written this hook, refactor useAxios to use useLocalStorage instead of useState.

// const useLocalStorage = (key, value=[]) => {
//     const setCards = () => {
//         localStorage.setItem(key, JSON.stringify(value));
//     }
//     const getCards = () => {
//         let localCards = localStorage.getItem(key);
//         const formattedCards = localCards;
//         return formattedCards || value;
//     }
//     return [setCards, getCards];
// }

function useLocalStorage(key= null, initialValue = []) {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  }

export default useLocalStorage;

// const [todos, setTodos] = useState(()=> {
//     const savedTodos = localStorage.getItem("todos");
//     const initialValue = JSON.parse(savedTodos);
//     return initialValue || "";
// });