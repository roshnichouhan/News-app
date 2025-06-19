import React, { Component } from 'react'
import loading from '../loading.gif'; // Assuming you have a loading gif in your assets folder
const Spinner = () => {

    return (
      <div className="text-center">
        <img className="my-3" src={loading} alt="loading" />
      </div>
    )
}

export default Spinner