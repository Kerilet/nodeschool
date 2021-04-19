
'use strict';

const koa = require('koa')
const app = new koa()

app.use(function *(){
  this.body = "Hello World !!!";
});

app.listen(1234)

const lodash = require('lodash');
const text = lodash.capitalize('kIrA qUeEn');
console.log(text);