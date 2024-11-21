import{j as a,L as R,m as z,r as m,y as W}from"./index-f542c721.js";import{P as d}from"./index-27ed1d6c.js";const Z=({verifyNumberPage:r=!1})=>a.jsx("header",{children:a.jsx("div",{className:"header_top_bar",children:a.jsx("div",{className:"container",children:a.jsx("div",{className:"row",children:a.jsx("div",{className:"col-12",children:a.jsxs("div",{className:"head",children:[a.jsx("div",{className:"logo",children:a.jsx(R,{to:"/",children:a.jsx("img",{src:z})})}),a.jsx("div",{className:"top_right",children:a.jsxs("div",{className:"header_left",children:[a.jsxs("div",{className:"navbar",children:[a.jsx("div",{className:"close_icon",children:a.jsx("div",{className:"menu_icon",onClick:()=>{document.body.classList.remove("open")},children:a.jsx("span",{})})}),a.jsxs("ul",{children:[a.jsx("li",{children:a.jsx(R,{to:"/about-us",children:"About Us"})}),a.jsx("li",{children:a.jsx(R,{to:"/blog",children:"Blog"})})]})]}),a.jsxs("div",{className:"get-started",children:[r?a.jsx(R,{to:"/login",children:"Log In"}):a.jsx(R,{to:"/register",children:"Sign Up"})," "]}),a.jsx("div",{className:"menu_icon",onClick:()=>{document.body.classList.add("open")},children:a.jsx("span",{})})]})})]})})})})})});var q=["sitekey","onChange","theme","type","tabindex","onExpired","onErrored","size","stoken","grecaptcha","badge","hl","isolated"];function S(){return S=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(r[t]=i[t])}return r},S.apply(this,arguments)}function G(r,n){if(r==null)return{};var i={},t=Object.keys(r),e,s;for(s=0;s<t.length;s++)e=t[s],!(n.indexOf(e)>=0)&&(i[e]=r[e]);return i}function j(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function $(r,n){r.prototype=Object.create(n.prototype),r.prototype.constructor=r,N(r,n)}function N(r,n){return N=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},N(r,n)}var w=function(r){$(n,r);function n(){var t;return t=r.call(this)||this,t.handleExpired=t.handleExpired.bind(j(t)),t.handleErrored=t.handleErrored.bind(j(t)),t.handleChange=t.handleChange.bind(j(t)),t.handleRecaptchaRef=t.handleRecaptchaRef.bind(j(t)),t}var i=n.prototype;return i.getCaptchaFunction=function(e){return this.props.grecaptcha?this.props.grecaptcha.enterprise?this.props.grecaptcha.enterprise[e]:this.props.grecaptcha[e]:null},i.getValue=function(){var e=this.getCaptchaFunction("getResponse");return e&&this._widgetId!==void 0?e(this._widgetId):null},i.getWidgetId=function(){return this.props.grecaptcha&&this._widgetId!==void 0?this._widgetId:null},i.execute=function(){var e=this.getCaptchaFunction("execute");if(e&&this._widgetId!==void 0)return e(this._widgetId);this._executeRequested=!0},i.executeAsync=function(){var e=this;return new Promise(function(s,x){e.executionResolve=s,e.executionReject=x,e.execute()})},i.reset=function(){var e=this.getCaptchaFunction("reset");e&&this._widgetId!==void 0&&e(this._widgetId)},i.forceReset=function(){var e=this.getCaptchaFunction("reset");e&&e()},i.handleExpired=function(){this.props.onExpired?this.props.onExpired():this.handleChange(null)},i.handleErrored=function(){this.props.onErrored&&this.props.onErrored(),this.executionReject&&(this.executionReject(),delete this.executionResolve,delete this.executionReject)},i.handleChange=function(e){this.props.onChange&&this.props.onChange(e),this.executionResolve&&(this.executionResolve(e),delete this.executionReject,delete this.executionResolve)},i.explicitRender=function(){var e=this.getCaptchaFunction("render");if(e&&this._widgetId===void 0){var s=document.createElement("div");this._widgetId=e(s,{sitekey:this.props.sitekey,callback:this.handleChange,theme:this.props.theme,type:this.props.type,tabindex:this.props.tabindex,"expired-callback":this.handleExpired,"error-callback":this.handleErrored,size:this.props.size,stoken:this.props.stoken,hl:this.props.hl,badge:this.props.badge,isolated:this.props.isolated}),this.captcha.appendChild(s)}this._executeRequested&&this.props.grecaptcha&&this._widgetId!==void 0&&(this._executeRequested=!1,this.execute())},i.componentDidMount=function(){this.explicitRender()},i.componentDidUpdate=function(){this.explicitRender()},i.handleRecaptchaRef=function(e){this.captcha=e},i.render=function(){var e=this.props;e.sitekey,e.onChange,e.theme,e.type,e.tabindex,e.onExpired,e.onErrored,e.size,e.stoken,e.grecaptcha,e.badge,e.hl,e.isolated;var s=G(e,q);return m.createElement("div",S({},s,{ref:this.handleRecaptchaRef}))},n}(m.Component);w.displayName="ReCAPTCHA";w.propTypes={sitekey:d.string.isRequired,onChange:d.func,grecaptcha:d.object,theme:d.oneOf(["dark","light"]),type:d.oneOf(["image","audio"]),tabindex:d.number,onExpired:d.func,onErrored:d.func,size:d.oneOf(["compact","normal","invisible"]),stoken:d.string,hl:d.string,badge:d.oneOf(["bottomright","bottomleft","inline"]),isolated:d.bool};w.defaultProps={onChange:function(){},theme:"light",type:"image",tabindex:0,size:"normal",badge:"bottomright"};function C(){return C=Object.assign||function(r){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(r[t]=i[t])}return r},C.apply(this,arguments)}function M(r,n){if(r==null)return{};var i={},t=Object.keys(r),e,s;for(s=0;s<t.length;s++)e=t[s],!(n.indexOf(e)>=0)&&(i[e]=r[e]);return i}function B(r,n){r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.__proto__=n}var l={},V=0;function K(r,n){return n=n||{},function(t){var e=t.displayName||t.name||"Component",s=function(L){B(y,L);function y(f,c){var o;return o=L.call(this,f,c)||this,o.state={},o.__scriptURL="",o}var g=y.prototype;return g.asyncScriptLoaderGetScriptLoaderID=function(){return this.__scriptLoaderID||(this.__scriptLoaderID="async-script-loader-"+V++),this.__scriptLoaderID},g.setupScriptURL=function(){return this.__scriptURL=typeof r=="function"?r():r,this.__scriptURL},g.asyncScriptLoaderHandleLoad=function(c){var o=this;this.setState(c,function(){return o.props.asyncScriptOnLoad&&o.props.asyncScriptOnLoad(o.state)})},g.asyncScriptLoaderTriggerOnScriptLoaded=function(){var c=l[this.__scriptURL];if(!c||!c.loaded)throw new Error("Script is not loaded.");for(var o in c.observers)c.observers[o](c);delete window[n.callbackName]},g.componentDidMount=function(){var c=this,o=this.setupScriptURL(),h=this.asyncScriptLoaderGetScriptLoaderID(),u=n,P=u.globalName,O=u.callbackName,A=u.scriptId;if(P&&typeof window[P]<"u"&&(l[o]={loaded:!0,observers:{}}),l[o]){var b=l[o];if(b&&(b.loaded||b.errored)){this.asyncScriptLoaderHandleLoad(b);return}b.observers[h]=function(p){return c.asyncScriptLoaderHandleLoad(p)};return}var U={};U[h]=function(p){return c.asyncScriptLoaderHandleLoad(p)},l[o]={loaded:!1,observers:U};var v=document.createElement("script");v.src=o,v.async=!0;for(var D in n.attributes)v.setAttribute(D,n.attributes[D]);A&&(v.id=A);var T=function(_){if(l[o]){var H=l[o],E=H.observers;for(var F in E)_(E[F])&&delete E[F]}};O&&typeof window<"u"&&(window[O]=function(){return c.asyncScriptLoaderTriggerOnScriptLoaded()}),v.onload=function(){var p=l[o];p&&(p.loaded=!0,T(function(_){return O?!1:(_(p),!0)}))},v.onerror=function(){var p=l[o];p&&(p.errored=!0,T(function(_){return _(p),!0}))},document.body.appendChild(v)},g.componentWillUnmount=function(){var c=this.__scriptURL;if(n.removeOnUnmount===!0)for(var o=document.getElementsByTagName("script"),h=0;h<o.length;h+=1)o[h].src.indexOf(c)>-1&&o[h].parentNode&&o[h].parentNode.removeChild(o[h]);var u=l[c];u&&(delete u.observers[this.asyncScriptLoaderGetScriptLoaderID()],n.removeOnUnmount===!0&&delete l[c])},g.render=function(){var c=n.globalName,o=this.props;o.asyncScriptOnLoad;var h=o.forwardedRef,u=M(o,["asyncScriptOnLoad","forwardedRef"]);return c&&typeof window<"u"&&(u[c]=typeof window[c]<"u"?window[c]:void 0),u.ref=h,m.createElement(t,u)},y}(m.Component),x=m.forwardRef(function(L,y){return m.createElement(s,C({},L,{forwardedRef:y}))});return x.displayName="AsyncScriptLoader("+e+")",x.propTypes={asyncScriptOnLoad:d.func},W(x,t)}}var I="onloadcallback",J="grecaptcha";function k(){return typeof window<"u"&&window.recaptchaOptions||{}}function Q(){var r=k(),n=r.useRecaptchaNet?"recaptcha.net":"www.google.com";return r.enterprise?"https://"+n+"/recaptcha/enterprise.js?onload="+I+"&render=explicit":"https://"+n+"/recaptcha/api.js?onload="+I+"&render=explicit"}const ee=K(Q,{callbackName:I,globalName:J,attributes:k().nonce?{nonce:k().nonce}:{}})(w);export{ee as R,Z as S};
