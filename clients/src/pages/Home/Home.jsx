import React from 'react'
import axios from "axios"

class PageHome extends React.Component {
  render() {
    
    console.log('Home')
    console.log(axios.defaults.headers)
    return (
      <p>Home page</p>
    )
  }
}

// const PageHome = () => (
//   var request = new XMLHttpRequest();
//   console.log(axios.defaults.headers)
//   <p>Home page</p>
// )

export default PageHome