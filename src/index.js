import React from 'react';
import ReactDom from 'react-dom';
import Card from './components/card.jsx';
import App from './App.jsx';

const test = {
  name: 'hallo World',
};

ReactDom.render(<App />, document.querySelector('#React'));

// const riot = require('riot');
// require('./components/Button/Button.tag');
// riot.mount('my-button');
