(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{9:function(t,e,r){"use strict";r.r(e);var n=r(0),a=r.n(n);function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var u,i=t[Symbol.iterator]();!(n=(u=i.next()).done)&&(r.push(u.value),!e||r.length!==e);n=!0);}catch(t){a=!0,o=t}finally{try{n||null==i.return||i.return()}finally{if(a)throw o}}return r}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}e.default=function(t){var e=o(Object(n.useState)(t.option),2),r=e[0],u=e[1];return Object(n.useEffect)((function(){t.update(r)}),[r]),a.a.createElement(a.a.Fragment,null,a.a.createElement("input",{type:"text",className:"form-control input text",value:r,onChange:function(t){u(t.target.value)}}),a.a.createElement("span",{className:"check-tips small"},"格式为xxx,xxx,xxx"))}}}]);