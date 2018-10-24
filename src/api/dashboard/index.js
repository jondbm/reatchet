import axios from 'axios'
// import { requestInterceptor, responseInterceptor } from '../interceptor'

const secret = 'aTFdKtNALjaMkjx2fbK6UE3JYvsiD2hfo01NaMnh'
const baseUrl = 'https://spa-poc.firebaseio.com'

export const getProjects = () => {
  return axios.get(`${baseUrl}/projects.json?auth=${secret}`)
}

export const getSelectedProject = id => {
  return axios.get(`${baseUrl}/projects/${id}.json?auth=${secret}`)
}
