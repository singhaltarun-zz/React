import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

document.getElementById('root').setAttribute('style',"height:100%; width:100%;");
ReactDOM.render(<App />, document.getElementById('root'));
document.querySelectorAll('.ant-tabs-content,.ant-tabs-content-animated,.ant-tabs-top-content')[0].setAttribute('style',"height:100%; width:100%;");
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();