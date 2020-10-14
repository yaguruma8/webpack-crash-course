import _ from 'lodash'
import { NAME as NAME_M }  from './utilities'

console.log(NAME_M)

function component() {
	const element = document.createElement('div')
	const array = ['Hello', 'webpack!!'];
	element.innerHTML = _.join(array, ' ');
	return element;
}

document.body.appendChild(component());
