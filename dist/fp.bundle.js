/*! For license information please see fp.bundle.js.LICENSE.txt */
!function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)e[r]=a[r]}return e}var t=function t(a,r){function n(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({},r,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var o in i)i[o]&&(c+="; "+o,!0!==i[o]&&(c+="="+i[o].split(";")[0]));return document.cookie=t+"="+a.write(n,t)+c}}return Object.create({set:n,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],r={},n=0;n<t.length;n++){var i=t[n].split("="),c=i.slice(1).join("=");try{var o=decodeURIComponent(i[0]);if(r[o]=a.read(c,o),e===o)break}catch(e){}}return e?r[e]:r}},remove:function(t,a){n(t,"",e({},a,{expires:-1}))},withAttributes:function(a){return t(this.converter,e({},this.attributes,a))},withConverter:function(a){return t(e({},this.converter,a),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(a)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"}),a=t;class r{static q(e){return document.querySelector(e)}static qall(e){return document.querySelectorAll(e)}static setValue(e,t){e&&("INPUT"===e.tagName?this.input.setValue(e,t):e.innerText=t)}static input=class{static setValue(e,t){if(e)switch(e.type){case"radio":this.radio.setValue(e.name,t);break;case"checkbox":e.checked=!1,e.click();break;default:e.value=t}}static getValue(e){if(e)switch(e.type){case"radio":return this.radio.getValue(e.name);case"checkbox":return e.checked;default:return e.value}}static radio=class{static setValue(e,t){const a=r.q(`input[name="${e}"][value="${t}"]`);a.checked&&=!1,setTimeout((()=>a?.click()),300)}static getValue(e){return r.q(`input[name="${e}"]:checked`)?.value}}}}var n=r;class i{static STORE="__fp_store";static set(e,t){const{store:r}=this;r[e]=t,a.set(this.STORE,JSON.stringify(r),{secure:!0,sameSite:"strict"})}static get(e){return this.store?.[e]}static clear(){a.remove(this.STORE)}static get store(){const e=a.get(this.STORE);return e?JSON.parse(e):{}}}const c=e=>{e.submitter.form.querySelectorAll("input[data-fp-cookie]").forEach((e=>{const t=e.getAttribute("data-fp-cookie"),a=n.input.getValue(e);i.set(t,a)}))};n.qall("form").forEach((e=>{e.addEventListener("submit",c,!0)})),n.qall("[data-fp-cookie]").forEach((e=>{const t=e.getAttribute("data-fp-cookie"),a=i.get(t);a&&n.setValue(e,a)})),window.FpCookie=i;const o=()=>{new URLSearchParams(location.search||location.hash.split("?")?.[1]).forEach(((e,t)=>{const a=n.q(`input[data-fp-param="${t}"]`);n.input.setValue(a,e)}))};window.addEventListener("hashchange",o),window.addEventListener("load",o);const s=e=>{const t=e.target,{value:a}=t,{maxLength:r}=t;a>r&&(t.value=a.slice(0,r))},u=e=>{const t=e.target,{value:a}=t;"numeric"===t.inputMode&&(t.value=a.replace(/\D/g,""))};window.addEventListener("load",(()=>{n.qall("input[data-fp-validation]").forEach((e=>(e=>{const t=e.getAttribute("data-fp-validation")?.split(",");t.forEach((t=>{const a={maxlength:s,inputmode:u};e.getAttribute(t)&&e.addEventListener("input",a[t],!0)}))})(e)))}))}();
//# sourceMappingURL=fp.bundle.js.map