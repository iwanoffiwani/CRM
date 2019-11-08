import axios from 'axios'

const setToken = token => {
  return token ? axios.defaults.headers.common['Authorization'] = token :
  delete axios.defaults.headers.common['Authorization']
}

export default setToken