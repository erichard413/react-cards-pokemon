// PokeDex also make AJAX requests, but this one’s a bit trickier. PlayingCardList makes a request to the same endpoint every time, but the endpoint in PokeDex depends on the name of the pokemon.

// Figure out a way to modify your useAxios hook so that when you call useAxios you can just provide a base url, and when you want to add to your array of response data in state, you can provide the rest of the url.

// Once you’ve done this, refactor PokeDex to use useAxios. Make sure PlayingCardList still works too!


// further study -------

// Further Study: Removing response data»
// Add two buttons to the page: one that will erase all of the playing cards in state, and one that will erase all of the pokemon cards.

// Since these arrays are controlled from within the useAxios hook, one way to approach this would be to have useAxios have a third element in its return array: a function that will remove everything from the array in state.


// Further Study: Minimizing state»
// The original application threw all of the response data into state, even though we didn’t use all of it. For example, we only need an image url from the Deck of Cards API, and the Pokemon API gives us a ton of data we don’t need.

// One way to avoid throwing all of this information in state is to pass a formatting function to useAxios. This function should take the response data and extract only the information we need to render our component.

// Write two formatting functions - one for our playing card and one for our Pokemon card - and then refactor useAxios to accept a formatting function.

// At the end of this process, our array in state for PlayingCardList should look like

// [{ id, image }, ...] ,

// and our array in state for PokeDex should look like

// [{ id, front, back, name, stats: [{ name, value }, ...] }, ... ]

import axios from 'axios';
import {v4 as uuid} from 'uuid';
import {useState, useEffect} from 'react';
import useLocalStorage from './useLocalStorage';

const useAxios = (url, key) => {
    let initialValue = () => {
        const returningCards = JSON.parse(localStorage.getItem(key));
        return returningCards || [];
    } 

    const [cards, setCards] = useState(initialValue);

    useEffect(()=> {
        const savedCards = () => {
            let returnCards = JSON.parse(localStorage.getItem(key));
            return returnCards || []; 
        }
        setCards(()=> savedCards())
    }, [])

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(cards))
    }, [cards])

    const addCard = async(pokeName=null) => {
        //I do not know why this works.
        let response;
        let formattedData;
        if (typeof pokeName === 'string') {
            response = await axios.get(`${url}/${pokeName}`)
            const {name, stats} = response.data;
            formattedData = {id: uuid(), front: response.data.sprites.front_default, back: response.data.sprites.back_default, name, stats}
            setCards(cards => [...cards, {...formattedData}])
        } else {
            response = await axios.get(url);
            formattedData = {id: uuid(), image: response.data.cards[0].image}
            setCards(cards=> [...cards, {...formattedData}])
        }
    }
    const resetCards = () => {
        setCards([]);
    }
    return [cards, addCard, resetCards]
}

export default useAxios;

