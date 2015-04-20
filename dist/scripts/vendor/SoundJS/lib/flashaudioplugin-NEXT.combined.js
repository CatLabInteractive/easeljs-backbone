/*!
* SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var swfobject=function(){function C(){if(b)return;try{var e=a.getElementsByTagName("body")[0].appendChild(U("span"));e.parentNode.removeChild(e)}catch(t){return}b=!0;var n=c.length;for(var r=0;r<n;r++)c[r]()}function k(e){b?e():c[c.length]=e}function L(t){if(typeof u.addEventListener!=e)u.addEventListener("load",t,!1);else if(typeof a.addEventListener!=e)a.addEventListener("load",t,!1);else if(typeof u.attachEvent!=e)z(u,"onload",t);else if(typeof u.onload=="function"){var n=u.onload;u.onload=function(){n(),t()}}else u.onload=t}function A(){l?O():M()}function O(){var n=a.getElementsByTagName("body")[0],r=U(t);r.setAttribute("type",i);var s=n.appendChild(r);if(s){var o=0;(function(){if(typeof s.GetVariable!=e){var t=s.GetVariable("$version");t&&(t=t.split(" ")[1].split(","),T.pv=[parseInt(t[0],10),parseInt(t[1],10),parseInt(t[2],10)])}else if(o<10){o++,setTimeout(arguments.callee,10);return}n.removeChild(r),s=null,M()})()}else M()}function M(){var t=h.length;if(t>0)for(var n=0;n<t;n++){var r=h[n].id,i=h[n].callbackFn,s={success:!1,id:r};if(T.pv[0]>0){var o=R(r);if(o)if(W(h[n].swfVersion)&&!(T.wk&&T.wk<312))V(r,!0),i&&(s.success=!0,s.ref=_(r),i(s));else if(h[n].expressInstall&&D()){var u={};u.data=h[n].expressInstall,u.width=o.getAttribute("width")||"0",u.height=o.getAttribute("height")||"0",o.getAttribute("class")&&(u.styleclass=o.getAttribute("class")),o.getAttribute("align")&&(u.align=o.getAttribute("align"));var a={},f=o.getElementsByTagName("param"),l=f.length;for(var c=0;c<l;c++)f[c].getAttribute("name").toLowerCase()!="movie"&&(a[f[c].getAttribute("name")]=f[c].getAttribute("value"));P(u,a,r,i)}else H(o),i&&i(s)}else{V(r,!0);if(i){var p=_(r);p&&typeof p.SetVariable!=e&&(s.success=!0,s.ref=p),i(s)}}}}function _(n){var r=null,i=R(n);if(i&&i.nodeName=="OBJECT")if(typeof i.SetVariable!=e)r=i;else{var s=i.getElementsByTagName(t)[0];s&&(r=s)}return r}function D(){return!w&&W("6.0.65")&&(T.win||T.mac)&&!(T.wk&&T.wk<312)}function P(t,n,r,i){w=!0,g=i||null,y={success:!1,id:r};var o=R(r);if(o){o.nodeName=="OBJECT"?(v=B(o),m=null):(v=o,m=r),t.id=s;if(typeof t.width==e||!/%$/.test(t.width)&&parseInt(t.width,10)<310)t.width="310";if(typeof t.height==e||!/%$/.test(t.height)&&parseInt(t.height,10)<137)t.height="137";a.title=a.title.slice(0,47)+" - Flash Player Installation";var u=T.ie&&T.win?"ActiveX":"PlugIn",f="MMredirectURL="+encodeURI(window.location).toString().replace(/&/g,"%26")+"&MMplayerType="+u+"&MMdoctitle="+a.title;typeof n.flashvars!=e?n.flashvars+="&"+f:n.flashvars=f;if(T.ie&&T.win&&o.readyState!=4){var l=U("div");r+="SWFObjectNew",l.setAttribute("id",r),o.parentNode.insertBefore(l,o),o.style.display="none",function(){o.readyState==4?o.parentNode.removeChild(o):setTimeout(arguments.callee,10)}()}j(t,n,r)}}function H(e){if(T.ie&&T.win&&e.readyState!=4){var t=U("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(B(e),t),e.style.display="none",function(){e.readyState==4?e.parentNode.removeChild(e):setTimeout(arguments.callee,10)}()}else e.parentNode.replaceChild(B(e),e)}function B(e){var n=U("div");if(T.win&&T.ie)n.innerHTML=e.innerHTML;else{var r=e.getElementsByTagName(t)[0];if(r){var i=r.childNodes;if(i){var s=i.length;for(var o=0;o<s;o++)(i[o].nodeType!=1||i[o].nodeName!="PARAM")&&i[o].nodeType!=8&&n.appendChild(i[o].cloneNode(!0))}}}return n}function j(n,r,s){var o,u=R(s);if(T.wk&&T.wk<312)return o;if(u){typeof n.id==e&&(n.id=s);if(T.ie&&T.win){var a="";for(var f in n)n[f]!=Object.prototype[f]&&(f.toLowerCase()=="data"?r.movie=n[f]:f.toLowerCase()=="styleclass"?a+=' class="'+n[f]+'"':f.toLowerCase()!="classid"&&(a+=" "+f+'="'+n[f]+'"'));var l="";for(var c in r)r[c]!=Object.prototype[c]&&(l+='<param name="'+c+'" value="'+r[c]+'" />');u.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+a+">"+l+"</object>",p[p.length]=n.id,o=R(n.id)}else{var h=U(t);h.setAttribute("type",i);for(var d in n)n[d]!=Object.prototype[d]&&(d.toLowerCase()=="styleclass"?h.setAttribute("class",n[d]):d.toLowerCase()!="classid"&&h.setAttribute(d,n[d]));for(var v in r)r[v]!=Object.prototype[v]&&v.toLowerCase()!="movie"&&F(h,v,r[v]);u.parentNode.replaceChild(h,u),o=h}}return o}function F(e,t,n){var r=U("param");r.setAttribute("name",t),r.setAttribute("value",n),e.appendChild(r)}function I(e){var t=R(e);t&&t.nodeName=="OBJECT"&&(T.ie&&T.win?(t.style.display="none",function(){t.readyState==4?q(e):setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))}function q(e){var t=R(e);if(t){for(var n in t)typeof t[n]=="function"&&(t[n]=null);t.parentNode.removeChild(t)}}function R(e){var t=null;try{t=a.getElementById(e)}catch(n){}return t}function U(e){return a.createElement(e)}function z(e,t,n){e.attachEvent(t,n),d[d.length]=[e,t,n]}function W(e){var t=T.pv,n=e.split(".");return n[0]=parseInt(n[0],10),n[1]=parseInt(n[1],10)||0,n[2]=parseInt(n[2],10)||0,t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1}function X(n,r,i,s){if(T.ie&&T.mac)return;var o=a.getElementsByTagName("head")[0];if(!o)return;var u=i&&typeof i=="string"?i:"screen";s&&(E=null,S=null);if(!E||S!=u){var f=U("style");f.setAttribute("type","text/css"),f.setAttribute("media",u),E=o.appendChild(f),T.ie&&T.win&&typeof a.styleSheets!=e&&a.styleSheets.length>0&&(E=a.styleSheets[a.styleSheets.length-1]),S=u}T.ie&&T.win?E&&typeof E.addRule==t&&E.addRule(n,r):E&&typeof a.createTextNode!=e&&E.appendChild(a.createTextNode(n+" {"+r+"}"))}function V(e,t){if(!x)return;var n=t?"visible":"hidden";b&&R(e)?R(e).style.visibility=n:X("#"+e,"visibility:"+n)}function $(t){var n=/[\\\"<>\.;]/,r=n.exec(t)!=null;return r&&typeof encodeURIComponent!=e?encodeURIComponent(t):t}var e="undefined",t="object",n="Shockwave Flash",r="ShockwaveFlash.ShockwaveFlash",i="application/x-shockwave-flash",s="SWFObjectExprInst",o="onreadystatechange",u=window,a=document,f=navigator,l=!1,c=[A],h=[],p=[],d=[],v,m,g,y,b=!1,w=!1,E,S,x=!0,T=function(){var s=typeof a.getElementById!=e&&typeof a.getElementsByTagName!=e&&typeof a.createElement!=e,o=f.userAgent.toLowerCase(),c=f.platform.toLowerCase(),h=c?/win/.test(c):/win/.test(o),p=c?/mac/.test(c):/mac/.test(o),d=/webkit/.test(o)?parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,v=!1,m=[0,0,0],g=null;if(typeof f.plugins!=e&&typeof f.plugins[n]==t)g=f.plugins[n].description,g&&(typeof f.mimeTypes==e||!f.mimeTypes[i]||!!f.mimeTypes[i].enabledPlugin)&&(l=!0,v=!1,g=g.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),m[0]=parseInt(g.replace(/^(.*)\..*$/,"$1"),10),m[1]=parseInt(g.replace(/^.*\.(.*)\s.*$/,"$1"),10),m[2]=/[a-zA-Z]/.test(g)?parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof u.ActiveXObject!=e)try{var y=new ActiveXObject(r);y&&(g=y.GetVariable("$version"),g&&(v=!0,g=g.split(" ")[1].split(","),m=[parseInt(g[0],10),parseInt(g[1],10),parseInt(g[2],10)]))}catch(b){}return{w3:s,pv:m,wk:d,ie:v,win:h,mac:p}}(),N=function(){if(!T.w3)return;(typeof a.readyState!=e&&a.readyState=="complete"||typeof a.readyState==e&&(a.getElementsByTagName("body")[0]||a.body))&&C(),b||(typeof a.addEventListener!=e&&a.addEventListener("DOMContentLoaded",C,!1),T.ie&&T.win&&(a.attachEvent(o,function(){a.readyState=="complete"&&(a.detachEvent(o,arguments.callee),C())}),u==top&&function(){if(b)return;try{a.documentElement.doScroll("left")}catch(e){setTimeout(arguments.callee,0);return}C()}()),T.wk&&function(){if(b)return;if(!/loaded|complete/.test(a.readyState)){setTimeout(arguments.callee,0);return}C()}(),L(C))}(),J=function(){T.ie&&T.win&&window.attachEvent("onunload",function(){var e=d.length;for(var t=0;t<e;t++)d[t][0].detachEvent(d[t][1],d[t][2]);var n=p.length;for(var r=0;r<n;r++)I(p[r]);for(var i in T)T[i]=null;T=null;for(var s in swfobject)swfobject[s]=null;swfobject=null})}();return{registerObject:function(e,t,n,r){if(T.w3&&e&&t){var i={};i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=r,h[h.length]=i,V(e,!1)}else r&&r({success:!1,id:e})},getObjectById:function(e){if(T.w3)return _(e)},embedSWF:function(n,r,i,s,o,u,a,f,l,c){var h={success:!1,id:r};T.w3&&!(T.wk&&T.wk<312)&&n&&r&&i&&s&&o?(V(r,!1),k(function(){i+="",s+="";var p={};if(l&&typeof l===t)for(var d in l)p[d]=l[d];p.data=n,p.width=i,p.height=s;var v={};if(f&&typeof f===t)for(var m in f)v[m]=f[m];if(a&&typeof a===t)for(var g in a)typeof v.flashvars!=e?v.flashvars+="&"+g+"="+a[g]:v.flashvars=g+"="+a[g];if(W(o)){var y=j(p,v,r);p.id==r&&V(r,!0),h.success=!0,h.ref=y}else{if(u&&D()){p.data=u,P(p,v,r,c);return}V(r,!0)}c&&c(h)})):c&&c(h)},switchOffAutoHideShow:function(){x=!1},ua:T,getFlashPlayerVersion:function(){return{major:T.pv[0],minor:T.pv[1],release:T.pv[2]}},hasFlashPlayerVersion:W,createSWF:function(e,t,n){return T.w3?j(e,t,n):undefined},showExpressInstall:function(e,t,n,r){T.w3&&D()&&P(e,t,n,r)},removeSWF:function(e){T.w3&&I(e)},createCSS:function(e,t,n,r){T.w3&&X(e,t,n,r)},addDomLoadEvent:k,addLoadEvent:L,getQueryParamValue:function(e){var t=a.location.search||a.location.hash;if(t){/\?/.test(t)&&(t=t.split("?")[1]);if(e==null)return $(t);var n=t.split("&");for(var r=0;r<n.length;r++)if(n[r].substring(0,n[r].indexOf("="))==e)return $(n[r].substring(n[r].indexOf("=")+1))}return""},expressInstallCallback:function(){if(w){var e=R(s);e&&v&&(e.parentNode.replaceChild(v,e),m&&(V(m,!0),T.ie&&T.win&&(v.style.display="block")),g&&g(y)),w=!1}}}}();this.createjs=this.createjs||{},function(){function e(e){this.AbstractLoader_constructor(e,!1,createjs.AbstractLoader.SOUND),this.flashId=null}var t=createjs.extend(e,createjs.AbstractLoader),n=e;n._flash=null,n._preloadInstances=[],n.setFlash=function(e){n._flash=e;for(var t=n._preloadInstances.length;t--;){var r=n._preloadInstances.pop();r.load()}},t.load=function(){if(n._flash==null){n._preloadInstances.push(this);return}this.flashId=n._flash.preload(this._item.src);var e=new createjs.Event(createjs.FlashAudioPlugin._REG_FLASHID);this.dispatchEvent(e)},t.handleProgress=function(e,t){this._sendProgress(e/t)},t.handleComplete=function(){this._result=this._item.src,this._sendComplete()},t.handleError=function(e){this._handleError(e)},t.destroy=function(){var e=new createjs.Event(createjs.FlashAudioPlugin._UNREG_FLASHID);this.dispatchEvent(e),this.AbstractLoader_destroy()},t.toString=function(){return"[FlashAudioLoader]"},createjs.FlashAudioLoader=createjs.promote(e,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){function e(e,t,r,i){this.AbstractSoundInstance_constructor(e,t,r,i),this.flashId=null,n._flash==null&&n._instances.push(this)}var t=createjs.extend(e,createjs.AbstractSoundInstance),n=e;n._flash=null,n._instances=[],n.setFlash=function(e){n._flash=e;for(var t=n._instances.length;t--;){var r=n._instances.pop();r._setDurationFromSource()}},t.toString=function(){return"[FlashAudioSoundInstance]"},t._removeLooping=function(){if(this.flashId==null)return;n._flash.setLoop(this.flashId,this._loop)},t._addLooping=function(){if(this.flashId==null)return;n._flash.setLoop(this.flashId,this._loop)},t._updateVolume=function(){if(this.flashId==null)return;n._flash.setVolume(this.flashId,this._volume)},t._updatePan=function(){if(this.flashId==null)return;n._flash.setPan(this.flashId,this._pan)},t._setDurationFromSource=function(){this._duration=n._flash.getDurationBySrc(this.src)},t._interrupt=function(){if(this.flashId==null)return;n._flash.interrupt(this.flashId),this.AbstractSoundInstance__interrupt()},t._handleCleanUp=function(){n._flash.stopSound(this.flashId),this._sendEvent(createjs.FlashAudioPlugin._UNREG_FLASHID),this.flashId=null},t._beginPlaying=function(e,t,r,i){return n._flash==null?!1:(this.setPosition(e),this.setLoop(t),this.setVolume(r),this.setPan(i),this._paused=!1,this.flashId=n._flash.playSound(this.src,this._position,this._loop,this._volume,this._pan,this._startTime,this._duration),this.flashId==null?(this._playFailed(),!1):(this._muted&&this.setMute(!0),this._sendEvent(createjs.FlashAudioPlugin._REG_FLASHID),this.playState=createjs.Sound.PLAY_SUCCEEDED,this._sendEvent("succeeded"),!0))},t._pause=function(){if(this.flashId==null)return;this._position=this._calculateCurrentPosition(),n._flash.pauseSound(this.flashId)},t._resume=function(){if(this.flashId==null)return;n._flash.resumeSound(this.flashId)},t._handleStop=function(){if(this.flashId==null)return;n._flash.stopSound(this.flashId)},t._updateVolume=function(){var e=this._muted?0:this._volume;n._flash.setVolume(this.flashId,e)},t._calculateCurrentPosition=function(){return n._flash.getPosition(this.flashId)},t._updatePosition=function(){if(this.flashId==null)return;n._flash.setPosition(this.flashId,this._position)},t.handleSoundFinished=function(){this._loop=0,this._handleSoundComplete()},t.handleSoundLoop=function(){this._loop--,this._sendEvent("loop")},createjs.FlashAudioSoundInstance=createjs.promote(e,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){function e(){this.AbstractPlugin_constructor(),this.showOutput=!1,this._CONTAINER_ID="flashAudioContainer",this._WRAPPER_ID="SoundJSFlashContainer",this._container=null,this._flash=null,this.flashReady=!1,this._flashInstances={},this._flashPreloadInstances={},this._queuedInstances=[],this._capabilities=n._capabilities,this._loaderClass=createjs.FlashAudioLoader,this._soundInstanceClass=createjs.FlashAudioSoundInstance;var e=this.wrapper=document.createElement("div");e.id=this._WRAPPER_ID,e.style.position="absolute",e.style.marginLeft="-1px",e.className=this._WRAPPER_ID,document.body.appendChild(e);var t=this._container=document.createElement("div");t.id=this._CONTAINER_ID,t.appendChild(document.createTextNode("SoundJS Flash Container")),e.appendChild(t);var r=n.swfPath,i=swfobject.embedSWF(r+"FlashAudioPlugin.swf",this._CONTAINER_ID,"1","1","9.0.0",null,null,{AllowScriptAccess:"always"},null,createjs.proxy(this._handleSWFReady,this))}var t=createjs.extend(e,createjs.AbstractPlugin),n=e;n._REG_FLASHID="registerflashid",n._UNREG_FLASHID="unregisterflashid",n._capabilities=null,n.swfPath="src/soundjs/flashaudio/",n.isSupported=function(){return createjs.BrowserDetect.isIOS||createjs.BrowserDetect.isAndroid||createjs.BrowserDetect.isBlackberry||createjs.BrowserDetect.isWindowsPhone?!1:(n._generateCapabilities(),swfobject==null?!1:swfobject.hasFlashPlayerVersion("9.0.0"))},n._generateCapabilities=function(){if(n._capabilities!=null)return;var e=n._capabilities={panning:!0,volume:!0,tracks:-1,mp3:!0,ogg:!1,mpeg:!0,wav:!0,m4a:!1,mp4:!1,aiff:!1,wma:!1,mid:!1}},t.register=function(e,t){this.flashReady||this._queuedInstances.push(e);var r=this.AbstractPlugin_register(e,t);return r.addEventListener(n._REG_FLASHID,createjs.proxy(this.registerPreloadInstance,this)),r.addEventListener(n._UNREG_FLASHID,createjs.proxy(this.unregisterPreloadInstance,this)),r},t.removeSound=function(e){var t=createjs.indexOf(this._queuedInstances,e);t!=-1&&this._queuedInstances.splice(t,1),this.AbstractPlugin_removeSound(e)},t.removeAllSounds=function(){this._queuedInstances.length=0,this._flashInstances={},this._flashPreloadInstances={},this.AbstractPlugin_removeAllSounds()},t.create=function(e,t,r){var i=this.AbstractPlugin_create(e,t,r);return i.on(n._REG_FLASHID,this.registerSoundInstance,this),i.on(n._UNREG_FLASHID,this.unregisterSoundInstance,this),i},t.toString=function(){return"[FlashAudioPlugin]"},t._handleSWFReady=function(e){this._flash=e.ref},t._handleFlashReady=function(){this.flashReady=!0,this._loaderClass.setFlash(this._flash),this._soundInstanceClass.setFlash(this._flash);for(var e=0,t=this._queuedInstances.length;e<t;e++)this._flash.register(this._queuedInstances[e]);this._queuedInstances.length=0},t._updateVolume=function(){var e=createjs.Sound._masterMute?0:this._volume;return this._flash.setMasterVolume(e)},t.registerPreloadInstance=function(e){this._flashPreloadInstances[e.target.flashId]=e.target},t.unregisterPreloadInstance=function(e){delete this._flashPreloadInstances[e.target.flashId]},t.registerSoundInstance=function(e){this._flashInstances[e.target.flashId]=e.target},t.unregisterSoundInstance=function(e){delete this._flashInstances[e.target.flashId]},t.flashLog=function(e){try{this.showOutput&&console.log(e)}catch(t){}},t.handleSoundEvent=function(e,t){var n=this._flashInstances[e];if(n==null)return;var r=[];for(var i=2,s=arguments.length;i<s;i++)r.push(arguments[i]);try{r.length==0?n[t]():n[t].apply(n,r)}catch(o){}},t.handlePreloadEvent=function(e,t){var n=this._flashPreloadInstances[e];if(n==null)return;var r=[];for(var i=2,s=arguments.length;i<s;i++)r.push(arguments[i]);try{r.length==0?n[t]():n[t].apply(n,r)}catch(o){}},t.handleEvent=function(e){switch(e){case"ready":this._handleFlashReady()}},t.handleErrorEvent=function(e){},createjs.FlashAudioPlugin=createjs.promote(e,"AbstractPlugin"),createjs.FlashPlugin=createjs.FlashAudioPlugin}(),this.createjs=this.createjs||{},function(){var e=createjs.FlashAudioPlugin=createjs.FlashAudioPlugin||{};e.version="NEXT",e.buildDate="Thu, 11 Dec 2014 23:16:15 GMT"}();