
const myApp = angular.module('myApp', ['ui.router']);
const baseURL = "https://todo-list-jfx5.onrender.com"
// const baseURL = "http://10.21.97.26:8000"


myApp.controller('mainctrl', [function () {
  main = this;
  main.load_start = function () {
    document.querySelector('#preloader').style.display = 'block'
  }
  main.load_end = function () {
    document.querySelector('#preloader').style.display = 'none'
  }
}])

//responsive navbar
resnev = function () {
  bars = document.querySelector('.fa-bars');
  nav = document.querySelector('nav')

  bars.addEventListener('click', () => {
    nav.style.left = '-20rem'
    nav.style.width = '0rem'
    document.querySelector('.navshow').style.display = 'block'

  })
  document.querySelector('.navshow').addEventListener('click', () => {
    nav.style.left = '0'
    nav.style.width = '20rem'
    document.querySelector('.navshow').style.display = 'none'
  })
}
