import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { hashHistory,browserHistory, Router,match } from 'react-router';
import configureStore from "src/store";
import routes from './pages/routes';

const Store = configureStore(window.__initState__);
const __history__ = (!__STATIC__?browserHistory:hashHistory);

match({history: __history__, routes}, (error, redirectLocation, renderProps) => {
	// console.log(error, redirectLocation,renderProps)
  ReactDOM.render(
      <Provider store={Store}>
          <Router {...renderProps}/>
      </Provider>,
      document.getElementById('app')
  )
})


/*

const rn = (min, max) => Math.random() * (max - min) + min;
const ctx = canvas.getContext('2d');
let {innerWidth:w, innerHeight:h} = window;

let t = 1;
let arr = [];
let cn = 150;
let rad = 250;

canvas.width = w;
canvas.height = h;

while(~~cn--) {	
	const angle = rn(0, 359);
	
	arr = [...arr, {
		color: `hsla(${(rn(0,1) > .5) ? ~~rn(0, 20) : ~~rn(180, 200)},100%,60%,1)`,
		distortion: rn(0,10),
		tmod: rn(5,15),
		size: rn(1,5),
		speed: rn(1, 5) / 10000,
		angle: angle,
		lastPos: {
			x: w / 2,
			y: h / 2
		}
	}];
}

const draw = () => {
	request = requestAnimationFrame(() => draw());
	t++;
	
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = 'rgba(0,0,0,.1)';
	ctx.fillRect(0, 0, w, h);
	
	const crad = rad * Math.sin(t / 300);
	
	ctx.globalCompositeOperation = 'lighter';
	arr.forEach(el => {
		ctx.strokeStyle = el.color;
		ctx.lineWidth = el.size;
		ctx.beginPath();
		
		const lastPos = el.angle - el.speed;
		const x = w / 2 + (crad + el.distortion * Math.sin(t / el.tmod)) * Math.cos(el.angle * 180 / Math.PI);
		const y = h / 2 + (crad + el.distortion * Math.sin(t / el.tmod)) * Math.sin(el.angle * 180 / Math.PI);
		
		ctx.moveTo(el.lastPos.x, el.lastPos.y);
		ctx.lineTo(x, y);
		
		el.lastPos = { x, y };
		el.angle = (el.angle + el.speed) % 359;
		ctx.stroke();
	});
}

const resize = () => {
	canvas.width = w = window.innerWidth;
	canvas.height = h = window.innerHeight;
}

let request = requestAnimationFrame(() => draw());
window.addEventListener('resize', () => resize());

*/