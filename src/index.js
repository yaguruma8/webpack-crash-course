import React from 'react'
import ReactDom from 'react-dom'
import './style.css'
import './style.scss'

console.log('I am printing logs');

alert('Hi, source-map');

ReactDom.render(
	<div>Hello, React!</div>,
	document.getElementById('root')
);
