// import axios from 'axios'
// import jwt_decode from 'jwt-decode'
// import setAuthToken from '../shared/setAuthToken'
// import store from '../redux/store'
// import { errorCreator, userCreator } from '../redux/actions/'
// import history from '../history/'

// export const loginUser = user => {
//   axios.post('/api/auth/login', user)
//     .then(res => {
//       const { token } = res.data
//       const decoded = jwt_decode(token)

//       localStorage.setItem('jwtToken', token)
//       setAuthToken(token)

//       store.dispatch(userCreator(decoded))

//       return history.push('/')
//     })
//     .catch(err => store.dispatch(errorCreator(err.response.data)))
// }