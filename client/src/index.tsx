import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import { MovieTypeService } from './services/MovieTypeService';
import { UserService } from './services/UserService';




ReactDOM.render(
  <App />
  ,
  document.getElementById('root')
);

/* UserService.add({
  username: "sdd45669356d",
  password: "gggggsdd",
  name: "gggsddg",
  phone: 18888888555
})
UserService.add({
  username: "sdd4896856d",
  password: "gggggsdd",
  name: "gggsddg",
  phone: 18888888555
}) */
/* UserService.edit("5e7dcea763f56f2f0063e9d8", {
  username: "sddd3333",
  password: "gggggsdd",
  name: "gggg",
  phone: 18888888555
}) */
// UserService.findById("5e7daccdf024ef4b3c1077fd").then(res => console.log(res))