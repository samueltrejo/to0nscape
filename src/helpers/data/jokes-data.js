import axios from 'axios';

const getJoke = () => axios.get('https://official-joke-api.appspot.com/random_joke');

export default { getJoke };
