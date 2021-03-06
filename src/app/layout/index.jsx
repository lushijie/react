import React from 'react'
import {withRouter} from 'react-router'
import {BaseComponent, Menu, Alert} from 'components'
import './index.css'

// export default class extends BaseComponent {
export default withRouter(class extends BaseComponent {
  render(){
    return (
      <div>
        <Menu />
        <Alert stack={{limit: 3}} />
        {this.props.children}
      </div>
    )
  }
})
