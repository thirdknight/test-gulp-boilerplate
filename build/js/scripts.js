!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}({"./src/js/base/variables.js":
/*!**********************************!*\
  !*** ./src/js/base/variables.js ***!
  \**********************************/
/*! no static exports found */function(e,t){console.log("varible")},"./src/js/components/test.js":
/*!***********************************!*\
  !*** ./src/js/components/test.js ***!
  \***********************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t);t.default=class{constructor(e,t){this.name=e,this.age=t}getInfo(){return`${this.name} and he is ${this.age} years old`}}},"./src/js/scripts.js":
/*!***************************!*\
  !*** ./src/js/scripts.js ***!
  \***************************/
/*! no exports provided */function(e,t,n){"use strict";n.r(t);const r=new(n(/*! ./components/test */"./src/js/components/test.js").default)("John",36);console.log(r.getInfo())},0:
/*!****************************************************************************************!*\
  !*** multi ./src/js/scripts.js ./src/js/base/variables.js ./src/js/components/test.js ***!
  \****************************************************************************************/
/*! no static exports found */function(e,t,n){n(/*! /Users/edinson/Sites/test-gulp-boilerplate/src/js/scripts.js */"./src/js/scripts.js"),n(/*! /Users/edinson/Sites/test-gulp-boilerplate/src/js/base/variables.js */"./src/js/base/variables.js"),e.exports=n(/*! /Users/edinson/Sites/test-gulp-boilerplate/src/js/components/test.js */"./src/js/components/test.js")}});
//# sourceMappingURL=../../src/sourcemaps/scripts.js.map
