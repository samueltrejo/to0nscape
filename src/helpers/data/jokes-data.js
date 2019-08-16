import axios from 'axios';

const getJoke = () => axios.get('https://cors-anywhere.herokuapp.com/https://official-joke-api.appspot.com/random_joke');

export default { getJoke };
