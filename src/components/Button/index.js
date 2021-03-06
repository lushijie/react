/*
* @Author: lushijie
* @Date:   2017-02-07 14:24:06
* @Last Modified by:   lushijie
* @Last Modified time: 2017-02-16 09:22:18
*/
import React from 'react';

const buttonStyles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10,
};

const Button = ({ children, onClick }) => (
  <button
      style={buttonStyles}
      onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Button;
