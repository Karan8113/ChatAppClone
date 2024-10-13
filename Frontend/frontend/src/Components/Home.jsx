import React from 'react'
import './Styles/HomeStyle.css'
import MessageContainer from './MessageContainer'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <div className='container'>
        <Sidebar/>
        <MessageContainer/>
    </div>
  )
}

export default Home