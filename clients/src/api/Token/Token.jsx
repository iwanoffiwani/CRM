import axios from "axios"

const Token = token => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = token;
    console.log(axios.defaults.headers)
  }
  else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem("jwtToken")
  }
}

export default Token;