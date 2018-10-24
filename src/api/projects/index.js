import axios from 'axios'

const secret = 'aTFdKtNALjaMkjx2fbK6UE3JYvsiD2hfo01NaMnh'
const baseUrl = 'https://spa-poc.firebaseio.com'

export const getProjects = () => {
  return axios.get(`${baseUrl}/projects.json?auth=${secret}`)
}

export const getFolders = (id) => {
  return axios.get(`${baseUrl}/folders.json?auth=${secret}`)
}
