!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports={defaultAlertMessage:"好像哪里出了小问题~ 请再试一次~",appKey:"sports"}},function(e,t,n){"use strict";n.r(t);var o=n(0);Date.prototype.format=function(e){let t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(let n in t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e};let r={toast(e,t=1500,n="none"){wx.showToast({title:e,icon:n,duration:t})},alert(e="提示",t=o.defaultAlertMsg,n=!1){"object"==typeof t&&(t=JSON.stringify(t)||o.defaultAlertMsg),wx.showModal({title:e,content:t,showCancel:n})},getDateDiff(e,t){let n=new Date(Date.parse(e.replace(/-/g,"/"))).getTime();return(new Date(Date.parse(t.replace(/-/g,"/"))).getTime()-n)/864e5},query2Dict(e){let t={};return e.replace(/([^?&=]+)=([^&#]*)/g,function(e,n,o){let r=decodeURIComponent(n),u=decodeURIComponent(o);return t[r]=u,e}),t},onlineImageToLocal:e=>new Promise((t,n)=>{wx.downloadFile({url:e,success:function(e){200===e.statusCode&&t(e.tempFilePath)}})}),myRegExp:{isWeixin:(e,t="请填写正确的微信号")=>{return!!/[1-9][0-9]{5,19}|^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(e)||(r.toast(t),!1)},isPhoneNumber:(e,t="请填写正确的手机号")=>{return!!/^1[0-9]{10}$/.test(e)||(r.toast(t),!1)},isFloatNumber:(e,t="数字格式不正确哦～")=>{return!!/^((?!0)\d+(.\d{1,2})?)$/.test(e)||(r.toast(t),!1)}},debounce(e,t,n){let o,r;return function(){let u=this,l=arguments;if(o&&clearTimeout(o),n){let n=!o;o=setTimeout(function(){o=null},t),n&&(r=e.apply(u,l))}else o=setTimeout(function(){r=e.apply(u,l)},t);return r}},checkUpdate(){const e=wx.getUpdateManager();e.onCheckForUpdate(function(e){console.log("小程序是否有新版本：",e.hasUpdate)}),e.onUpdateReady(function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启小程序？",success:function(t){t.confirm&&e.applyUpdate()}})}),e.onUpdateFailed(function(){console.log("新的版本下载失败")})},getCurrentPage(){let e=getCurrentPages();return e[e.length-1].route}};t.default=r}]);