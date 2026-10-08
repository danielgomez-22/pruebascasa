import React, { Component } from 'react'

export default class MenuRutas extends Component {
  render() {
    return (
      <div>
        <ul>
        <li>
            <a href='/'>Home</a>
        </li>
        <li><a href='/vecino'>Vecino</a></li>
        <li><a href='/casa'>Casa</a></li>
        </ul>
      </div>
    )
  }
}

