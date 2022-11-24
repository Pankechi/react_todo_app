import React from 'react';

const Input = ({children, ...props}) => {
  return (
    <form action="POST">
      <input {...props} /> {children}
    </form>  
  );
};

export default Input;