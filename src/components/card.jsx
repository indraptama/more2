import React from 'react';
import Button from './Button/Button.jsx';

const Card = (name) => (
  <div className={name}>
    <h1>this card created with react</h1>
    <Button name="test" />
  </div>
);

export default Card;
