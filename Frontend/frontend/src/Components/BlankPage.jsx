import React from 'react'
import "./Styles/BlankPage.css"

const BlankPage = ({user}) => {
  return (
    <div className='BlankDiv'>
        <div className='header'>WelCome to Our Chat-App</div>
        <div className='para'>
          <h1 className="text-4xl font-bold">Hi , {user?.fullName}</h1>
          Select the user and start the conversation...
          </div>
    </div>
  )
}

export default BlankPage