// PokeDex also make AJAX requests, but this one’s a bit trickier. PlayingCardList makes a request to the same endpoint every time, but the endpoint in PokeDex depends on the name of the pokemon.

// Figure out a way to modify your useAxios hook so that when you call useAxios you can just provide a base url, and when you want to add to your array of response data in state, you can provide the rest of the url.

// Once you’ve done this, refactor PokeDex to use useAxios. Make sure PlayingCardList still works too!


import axios from 'axios';
import {v4 as uuid} from 'uuid';
import {useState} from 'react';

const useAxios = (url) => {
    const [cards, setCards] = useState([]);
    const addCard = async(pokeName=null) => {
        //I do not know why this works.
        let response;
        if (typeof pokeName === 'string') {
            response = await axios.get(`${url}/${pokeName}`) 
        } else {
            response = await axios.get(url);
        }
        setCards(cards => [...cards, {...response.data, id: uuid()}])
    }
    return [cards, addCard]
}

export default useAxios;

