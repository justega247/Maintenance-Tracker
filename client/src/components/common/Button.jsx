import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    text, type, className, ...rest
  } = props;
  return (
    <button className={className} type={type} {...rest}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: 'search',
  type: 'button',
  className: '',
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
