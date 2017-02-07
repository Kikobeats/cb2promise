/**
 * cb2promise - Converts whatever standard NodeJS callback function into ES6 standard promise.
 * @version v1.0.3
 * @link    https://github.com/Kikobeats/cb2promise
 * @license MIT
 */require=function r(e,t,i){function n(f,u){if(!t[f]){if(!e[f]){var c="function"==typeof require&&require;if(!u&&c)return c(f,!0);if(o)return o(f,!0);var s=new Error("Cannot find module '"+f+"'");throw s.code="MODULE_NOT_FOUND",s}var p=t[f]={exports:{}};e[f][0].call(p.exports,function(r){var t=e[f][1][r];return n(t?t:r)},p,p.exports,r,e,t,i)}return t[f].exports}for(var o="function"==typeof require&&require,f=0;f<i.length;f++)n(i[f]);return n}({1:[function(r,e,t){},{}],cb2promise:[function(r,e,t){(function(t){"use strict";r("coffee-script/register"),e.exports=r(t+"/lib/cb2promise")}).call(this,"/")},{"coffee-script/register":1}]},{},[]);