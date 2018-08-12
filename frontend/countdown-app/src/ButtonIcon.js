import React from 'react';
import FontAwesome from 'react-fontawesome';

import 'font-awesome/css/font-awesome.min.css';

class ButtonIcon extends React.Component {
  render() {
    return(
    <FontAwesome className='super-crazy-colors' name={this.props.name}
      inverse
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', paddingRight: '5px' }}
      ></FontAwesome>
    );
  }
}

export default ButtonIcon;
