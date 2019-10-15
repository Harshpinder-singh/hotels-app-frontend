import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    text-align: center;
    border:1.5px solid gray;
    margin: 15px;
    height:300px;


`

function Hotel(props) {
    return (
        <Div>

            <h3>Name: {props.name}</h3>
            <p>Address: {props.address}</p>
            <h4>City: {props.city}</h4>
            <h4>Country: {props.country}</h4>
            <h4>Province: {props.province}</h4>


        </Div>
    )
}

export default Hotel