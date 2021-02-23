import axios from 'axios'

export const fetchServer = axios.create({
    baseURL: 'https://dev-it-nlw.herokuapp.com'
})
