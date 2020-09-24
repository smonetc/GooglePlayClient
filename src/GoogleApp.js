import React from 'react'

function GoogleApp(props){
    return(
        <div>
            <h3>{props.App}</h3>
            <p>Game Information:</p>
            <br />
            <p>Category: {props.Category}</p>
            <p>Rating: {props.Rating}</p>
            <p>Genre(s): {props.Genres}</p>
        </div>
    )
}

export default GoogleApp;