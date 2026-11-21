var Nt=Object.defineProperty;var Bt=(e,a,t)=>a in e?Nt(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t;var ge=(e,a,t)=>Bt(e,typeof a!="symbol"?a+"":a,t);import{C as Qe,B as Vt,a as jt,b as Gt,L as _t,c as zt,d as Yt,P as Ht,R as Ut,e as Wt,i as Kt,p as Jt,f as Qt}from"./charts-ClpJTbeg.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=(e,a,t=[])=>{const i=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(a).forEach(s=>{i.setAttribute(s,String(a[s]))}),t.length&&t.forEach(s=>{const n=yt(...s);i.appendChild(n)}),i};var Xt=([e,a,t])=>yt(e,a,t);/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=e=>Array.from(e.attributes).reduce((a,t)=>(a[t.name]=t.value,a),{}),ea=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",ta=e=>e.flatMap(ea).map(t=>t.trim()).filter(Boolean).filter((t,i,s)=>s.indexOf(t)===i).join(" "),aa=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(a,t,i)=>t.toUpperCase()+i.toLowerCase()),pt=(e,{nameAttr:a,icons:t,attrs:i})=>{var C;const s=e.getAttribute(a);if(s==null)return;const n=aa(s),u=t[n];if(!u)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const r=Zt(e),[d,g,m]=u,y={...g,"data-lucide":s,...i,...r},f=ta(["lucide",`lucide-${s}`,r,i]);f&&Object.assign(y,{class:f});const h=Xt([d,y,m]);return(C=e.parentNode)==null?void 0:C.replaceChild(h,e)};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=["svg",L,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sa=["svg",L,[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=["svg",L,[["line",{x1:"18",x2:"18",y1:"20",y2:"10"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ra=["svg",L,[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=["svg",L,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=["svg",L,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M8 12h8"}],["path",{d:"M12 8v8"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=["svg",L,[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"m9 14 2 2 4-4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=["svg",L,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"7 10 12 15 17 10"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=["svg",L,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M8 13h2"}],["path",{d:"M14 13h2"}],["path",{d:"M8 17h2"}],["path",{d:"M14 17h2"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=["svg",L,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=["svg",L,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M12 12v6"}],["path",{d:"m15 15-3-3-3 3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const va=["svg",L,[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=["svg",L,[["path",{d:"M5 12h14"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=["svg",L,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=["svg",L,[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=["svg",L,[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ya=["svg",L,[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}],["path",{d:"M4 17v2"}],["path",{d:"M5 18H3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ca=["svg",L,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xa=["svg",L,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"17 8 12 3 7 8"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sa=({icons:e={},nameAttr:a="data-lucide",attrs:t={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const i=document.querySelectorAll(`[${a}]`);if(Array.from(i).forEach(s=>pt(s,{nameAttr:a,icons:e,attrs:t})),a==="data-lucide"){const s=document.querySelectorAll("[icon-name]");s.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(s).forEach(n=>pt(n,{nameAttr:"icon-name",icons:e,attrs:t})))}},We={BRL:{symbol:"R$",locale:"pt-BR",label:"Real Brasileiro (BRL)"},USD:{symbol:"US$",locale:"en-US",label:"Dólar Americano (USD)"},EUR:{symbol:"€",locale:"de-DE",label:"Euro (EUR)"}},ne={units:{factor:1,label:"Unidades (1x)",shortLabel:""},thousands:{factor:1e3,label:"Milhares (mil)",shortLabel:"mil"},millions:{factor:1e6,label:"Milhões (M)",shortLabel:"M"},billions:{factor:1e9,label:"Bilhões (Bi)",shortLabel:"Bi"}};function P(e,a){return!Number.isFinite(e)||!Number.isFinite(a)||Math.abs(a)<1e-12?0:e/a}function Ce(e,a){return(e+a)/2}function ae(e,a,t){return Math.min(t,Math.max(a,e))}function k(e,a="BRL",t=2,i=""){if(!Number.isFinite(e))return"—";const s=We[a],n=e<0?"-":"",u=Math.abs(e).toLocaleString("pt-BR",{minimumFractionDigits:t,maximumFractionDigits:t});return`${n}${s.symbol} ${u}${i?" "+i:""}`}function I(e,a="BRL",t="millions",i=1){return k(e,a,i,ne[t].shortLabel)}function R(e,a=2){return Number.isFinite(e)?e.toLocaleString("pt-BR",{minimumFractionDigits:a,maximumFractionDigits:a}):"—"}function S(e,a=2,t=!1){return Number.isFinite(e)?`${t&&e>0?"+":""}${R(e,a)}%`:"—"}function Q(e,a=2){return e==null||!Number.isFinite(e)||e===0?"—":`${R(e,a)}x`}function x(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function j(e,a=0){if(typeof e=="number")return Number.isFinite(e)?e:a;const t=e.trim().replace(/\s/g,"").replace(",","."),i=Number(t);return Number.isFinite(i)?i:a}function ie(e){return Math.max(0,e.years.length-1)}function Pa(e){return e.netSales.map((a,t)=>a-(e.cogs[t]??0))}function re(e){return e.netSales.map((a,t)=>{const i=a-(e.cogs[t]??0)-(e.sga[t]??0)-(e.rd[t]??0);return e.daRecognition==="separate"?i-(e.depreciationAmortization[t]??0):i})}function xe(e){return re(e).map((t,i)=>t+(e.depreciationAmortization[i]??0))}function Ct(e){return re(e).map((t,i)=>t+(e.financialIncome[i]??0)-(e.interestExpense[i]??0))}function X(e){return Ct(e).map((t,i)=>t-(e.taxes[i]??0))}function Xe(e,a=34){return Ct(e).map((i,s)=>{const n=e.taxes[s]??0;return i>0&&n>=0?Math.min(60,Math.max(0,n/i*100)):a})}function Ea(e,a=34){const t=re(e),i=Xe(e,a);return t.map((s,n)=>s*(1-i[n]/100))}function Ze(e){return e.years.map((a,t)=>(e.cashAndEquivalents[t]??0)+(e.accountsReceivable[t]??0)+(e.inventories[t]??0)+(e.otherCurrentAssets[t]??0))}function $a(e){return e.years.map((a,t)=>(e.fixedAssets[t]??0)+(e.intangiblesGoodwill[t]??0)+(e.rightOfUseAssets[t]??0)+(e.nonOperatingAssets[t]??0)+(e.otherNonCurrentAssets[t]??0))}function Ie(e){const a=Ze(e),t=$a(e);return a.map((i,s)=>i+t[s])}function et(e){return e.years.map((a,t)=>(e.accountsPayable[t]??0)+(e.shortTermDebt[t]??0)+(e.otherCurrentLiabilities[t]??0))}function Aa(e){return e.years.map((a,t)=>(e.shareholdersEquity[t]??0)+(e.minorityInterest[t]??0)+(e.preferredStock[t]??0)+(e.shortTermDebt[t]??0)+(e.longTermDebt[t]??0)+(e.leaseLiabilities[t]??0)+(e.provisions[t]??0)+(e.accountsPayable[t]??0)+(e.otherCurrentLiabilities[t]??0)+(e.otherNonCurrentLiabilities[t]??0))}function Ke(e){const a=Ie(e),t=Aa(e);return e.years.map((i,s)=>{const n=a[s]-t[s],u=Math.max(.05,Math.abs(a[s])*.005);return{year:i,totalAssets:a[s],totalLiabilitiesAndEquity:t[s],diff:n,isBalanced:Math.abs(n)<=u}})}function Ve(e,a=!0){return e.years.map((t,i)=>(e.shortTermDebt[i]??0)+(e.longTermDebt[i]??0)+(a?e.leaseLiabilities[i]??0:0))}function xt(e,a=!0){return Ve(e,a).map((i,s)=>i-(e.cashAndEquivalents[s]??0))}function tt(e){return e.years.map((a,t)=>(e.accountsReceivable[t]??0)+(e.inventories[t]??0)+(e.otherCurrentAssets[t]??0)-(e.accountsPayable[t]??0)-(e.otherCurrentLiabilities[t]??0))}function Ra(e,a=!0){const t=Ve(e,a);return e.years.map((i,s)=>(e.shareholdersEquity[s]??0)+(e.minorityInterest[s]??0)+(e.preferredStock[s]??0)+t[s]-(e.cashAndEquivalents[s]??0)-(e.nonOperatingAssets[s]??0))}function Ma(e){const a=Ie(e),t=et(e);return a.map((i,s)=>i-t[s])}function me(e){return e.years.map((a,t)=>(e.cfo[t]??0)-Math.abs(e.capex[t]??0))}function ka(e){return Pa(e).map((t,i)=>P(t,e.netSales[i]??0)*100)}function Fe(e){return re(e).map((t,i)=>P(t,e.netSales[i]??0)*100)}function wa(e){return xe(e).map((t,i)=>P(t,e.netSales[i]??0)*100)}function Da(e){return X(e).map((t,i)=>P(t,e.netSales[i]??0)*100)}function Ta(e){return e.cfo.map((a,t)=>P(a,e.netSales[t]??0)*100)}function Fa(e){return me(e).map((t,i)=>P(t,e.netSales[i]??0)*100)}function Se(e){return X(e).map((t,i)=>{const s=i===0?e.shareholdersEquity[i]??0:Ce(e.shareholdersEquity[i-1]??0,e.shareholdersEquity[i]??0);return s>0?P(t,s)*100:0})}function Oa(e,a=34){const t=X(e),i=Ie(e),s=Xe(e,a);return t.map((n,u)=>{const r=n+(e.interestExpense[u]??0)*(1-s[u]/100),d=u===0?i[u]:Ce(i[u-1],i[u]);return d>0?P(r,d)*100:0})}function je(e,a=34,t=!0){const i=Ea(e,a),s=Ra(e,t);return i.map((n,u)=>{const r=u===0?s[u]:Ce(s[u-1],s[u]);return r>0?P(n,r)*100:0})}function La(e){const a=re(e),t=Ma(e);return a.map((i,s)=>{const n=s===0?t[s]:Ce(t[s-1],t[s]);return n>0?P(i,n)*100:0})}function Ia(e){const a=Ie(e);return e.shareholdersEquity.map((t,i)=>P(t,a[i])*100)}function qa(e,a=!0){return xt(e,a).map((i,s)=>P(i,e.shareholdersEquity[s]??0))}function mt(e,a=!0){const t=xt(e,a),i=xe(e);return t.map((s,n)=>i[n]>0?P(s,i[n]):0)}function St(e){return re(e).map((t,i)=>{const s=Math.abs(e.interestExpense[i]??0);return s>0?P(t,s):t>0?99:0})}function Na(e){return e.capex.map((a,t)=>P(Math.abs(a),e.cfo[t]??0)*100)}function Ba(e){const a=me(e),t=X(e);return a.map((i,s)=>t[s]>0?P(i,t[s])*100:0)}function Va(e){const a=xe(e);return e.cfo.map((t,i)=>a[i]>0?P(t,a[i])*100:0)}function vt(e){const a=Ze(e),t=et(e);return a.map((i,s)=>P(i,t[s]))}function ja(e){const a=Ze(e),t=et(e);return a.map((i,s)=>P(i-(e.inventories[s]??0),t[s]))}function Pt(e){return e.accountsReceivable.map((a,t)=>P(a,e.netSales[t]??0)*365)}function Et(e){return e.inventories.map((a,t)=>P(a,e.cogs[t]??0)*365)}function $t(e){return e.accountsPayable.map((a,t)=>P(a,e.cogs[t]??0)*365)}function Ga(e){const a=Pt(e),t=Et(e),i=$t(e);return a.map((s,n)=>s+t[n]-i[n])}function _a(e){const a=X(e),t=Ie(e);return e.years.map((i,s)=>{const n=s===0?t[s]:Ce(t[s-1],t[s]),u=s===0?e.shareholdersEquity[s]??0:Ce(e.shareholdersEquity[s-1]??0,e.shareholdersEquity[s]??0),r=P(a[s],e.netSales[s]??0)*100,d=P(e.netSales[s]??0,n),g=P(n,u),m=r/100*d*g*100;return{year:i,netMargin:r,assetTurnover:d,equityMultiplier:g,roe:m}})}function we(e){if(e.length<2)return null;const a=e[0],t=e[e.length-1];if(a<=0||t<=0)return null;const i=e.length-1;return(Math.pow(t/a,1/i)-1)*100}function at(e){const a=e.financials,t=ie(a),i=X(a)[t]??0,s=me(a)[t]??0,n=Math.abs(a.dividendsPaid[t]??0),u=Math.abs(a.shareRepurchases[t]??0),r=qe(e),d=Se(a)[t]??0,g=i>0?P(n,i)*100:0,m=s>0?P(n,s)*100:0,y=r>0?P(n,r)*100:e.sharePrice>0?P(e.dividendPerShare,e.sharePrice)*100:0,f=r>0?P(u,r)*100:0,h=y+f,C=Math.max(0,1-g/100),c=d*C;return{payoutRatio:g,fcfPayoutRatio:m,dividendYield:y,buybackYield:f,totalShareholderYield:h,sustainableGrowthRate:c}}function Pe(e){return e.dilutedShares>0?e.dilutedShares:e.basicShares}function qe(e){const a=Pe(e);return e.sharePrice>0&&a>0?e.sharePrice*a:e.marketCap}function ve(e){if(e.sharePrice>0)return e.sharePrice;const a=Pe(e);return a>0?P(e.marketCap,a):0}function za(e,a=34,t=!0){const i=c=>c.length>0?c.reduce((b,o)=>b+o,0)/c.length:0,s=we(e.netSales)??5,n=i(Fe(e)),u=i(Xe(e,a)),r=i(e.capex.map((c,b)=>P(Math.abs(c),e.netSales[b]??0)*100)),d=i(e.depreciationAmortization.map((c,b)=>P(Math.abs(c),e.netSales[b]??0)*100)),g=tt(e),m=i(g.map((c,b)=>P(c,e.netSales[b]??0)*100)),y=i(je(e,a,t)),f=i(Se(e)),h=X(e),C=i(e.dividendsPaid.map((c,b)=>h[b]>0?P(Math.abs(c),h[b])*100:0));return{salesCagr:Number(s.toFixed(2)),ebitMargin:Number(n.toFixed(2)),effectiveTaxRate:Number(u.toFixed(2)),capexPercentSales:Number(r.toFixed(2)),depPercentSales:Number(d.toFixed(2)),nwcPercentSales:Number(m.toFixed(2)),roic:Number(y.toFixed(2)),roe:Number(f.toFixed(2)),payoutRatio:Number(C.toFixed(2))}}const Ya=[{minIcr:8.5,rating:"AAA",spread:.65},{minIcr:6.5,rating:"AA",spread:.85},{minIcr:5.5,rating:"A+",spread:1.05},{minIcr:4.25,rating:"A",spread:1.2},{minIcr:3,rating:"A-",spread:1.45},{minIcr:2.5,rating:"BBB",spread:1.9},{minIcr:2.25,rating:"BB+",spread:2.45},{minIcr:2,rating:"BB",spread:3},{minIcr:1.75,rating:"B+",spread:3.75},{minIcr:1.5,rating:"B",spread:4.5},{minIcr:1.25,rating:"B-",spread:5.5},{minIcr:.8,rating:"CCC",spread:7.5},{minIcr:.65,rating:"CC",spread:9.5},{minIcr:.2,rating:"C",spread:12},{minIcr:-1/0,rating:"D",spread:15}];function Ha(e){const a=Number.isFinite(e)?e:0;for(const t of Ya)if(a>=t.minIcr)return{interestCoverage:a,rating:t.rating,spread:t.spread};return{interestCoverage:a,rating:"D",spread:15}}function Ua(e,a,t){const i=Math.min(.6,Math.max(0,t/100)),s=Math.max(0,a);return e*(1+(1-i)*s)}function Wa(e,a,t){const i=Math.min(.6,Math.max(0,t/100)),s=Math.max(0,a);return P(e,1+(1-i)*s)}function oe(e,a){const t=e.valuationAssumptions,i=e.financials,s=ie(i),n=Math.max(0,Ve(i,t.includeLeasesInDebt)[s]??0),u=Math.max(0,qe(e));let r=0,d=1;if(t.capitalStructureMode==="target")r=Math.min(.95,Math.max(0,t.targetDebtToCapital/100)),d=1-r;else{const E=u+n;E>0&&(r=P(n,E),d=P(u,E))}const g=d>0?r/d:0,m=t.betaMode==="hamada"?Ua(t.unleveredBeta,g,t.marginalTaxRate):t.leveredBeta,y=t.betaMode==="hamada"?t.unleveredBeta:Wa(t.leveredBeta,g,t.marginalTaxRate),f=St(i)[s]??0,h=Ha(f),c=t.riskFreeRate+m*t.equityRiskPremium+t.countryRiskPremium+t.sizePremium+((a==null?void 0:a.keDelta)??0),b=t.costOfDebtMode==="synthetic"?t.riskFreeRate+h.spread:t.costOfDebt,o=Math.min(.6,Math.max(0,t.marginalTaxRate/100)),l=b*(1-o),v=d*c+r*l+((a==null?void 0:a.waccDelta)??0);return{leveredBeta:m,unleveredBeta:y,costOfEquity:c,preTaxCostOfDebt:b,afterTaxCostOfDebt:l,syntheticRating:h,equityWeight:d*100,debtWeight:r*100,debtToEquity:g,wacc:v}}function At(e){const a=e.financials,t=e.valuationAssumptions,i=ie(a),s=(a.shortTermDebt[i]??0)+(a.longTermDebt[i]??0),n=a.leaseLiabilities[i]??0,u=s+(t.includeLeasesInDebt?n:0),r=a.cashAndEquivalents[i]??0,d=u-r,g=a.minorityInterest[i]??0,m=a.preferredStock[i]??0,y=t.includeProvisionsInBridge?a.provisions[i]??0:0,f=a.nonOperatingAssets[i]??0,h=d+g+m+y-f;return{shortAndLongTermDebt:s,leaseLiabilities:n,totalDebtUsed:u,cashAndEquivalents:r,netDebt:d,minorityInterest:g,preferredStock:m,provisionsAdjustment:y,nonOperatingAssets:f,netDeductionFromEV:h}}function it(e,a,t=0,i){if(i!==void 0)return Array.from({length:a},()=>i);const s=e.filter(u=>Number.isFinite(u)),n=s.length>0?s[s.length-1]:5;return Array.from({length:a},(u,r)=>(r<s.length?s[r]:n)+t)}function Rt(e,a){const t=e[e.length-1]??"",i=Number.parseInt(t,10),s=Number.isFinite(i)?i:new Date().getFullYear();return Array.from({length:a},(n,u)=>`${s+u+1}E`)}function G(e,a){const t=e.financials,i=e.valuationAssumptions,s=ie(t),n=ae(Math.round(i.projectionYears||5),5,10),u=oe(e,{waccDelta:a==null?void 0:a.waccDelta,keDelta:a==null?void 0:a.keDelta}),r=u.wacc/100,d=At(e),g=Pe(e),m=ve(e),y=(a==null?void 0:a.terminalMethodOverride)??i.terminalMethod,h=((a==null?void 0:a.terminalGrowthOverride)??i.terminalGrowthRate+((a==null?void 0:a.terminalGrowthDelta)??0))/100,C=(a==null?void 0:a.exitMultipleOverride)??i.exitEvEbitdaMultiple,c=it(i.salesGrowth,n,(a==null?void 0:a.salesGrowthDelta)??0,a==null?void 0:a.uniformSalesGrowth),b=Rt(t.years,n);let o=t.netSales[s]??0,l=tt(t)[s]??0;const p=[];let v=0;for(let O=0;O<n;O++){const T=O+1,U=n>1?O/(n-1):1,K=c[O],W=o*(1+K/100),ee=(a==null?void 0:a.uniformEbitMargin)!==void 0?a.uniformEbitMargin:i.ebitMarginStart+(i.ebitMarginTarget-i.ebitMarginStart)*U+((a==null?void 0:a.ebitMarginDelta)??0),ce=i.effectiveTaxRate+(i.marginalTaxRate-i.effectiveTaxRate)*U,J=W*(ee/100),Ee=J>0?J*(ce/100):0,$e=J-Ee,de=W*(i.depAsPercentOfSales/100),ze=J+de,be=W*(i.capexAsPercentOfSales/100),he=W*(i.nwcAsPercentOfSales/100),Ae=he-l,Re=be-de+Ae,Me=$e-Re,ke=i.midYearConvention?T-.5:T,dt=r>-.99?1/Math.pow(1+r,ke):0,ut=Me*dt;v+=ut,p.push({yearIndex:T,yearLabel:b[O],sales:W,salesGrowth:K,ebit:J,ebitMargin:ee,ebitda:ze,taxRate:ce,taxes:Ee,nopat:$e,da:de,capex:be,nwc:he,deltaNWC:Ae,reinvestment:Re,fcff:Me,discountPeriod:ke,discountFactor:dt,pvFcff:ut}),o=W,l=he}const E=p[p.length-1],w=y!=="exit_multiple"&&r<=h;if(o<=0||w||r<=0)return{valid:!1,errorMessage:o<=0?"Receita líquida histórica deve ser maior que zero para projetar o DCF.":"WACC deve ser estritamente maior que a taxa de crescimento perpétuo (g).",costOfCapital:u,projections:p,pvOfExplicitFcff:v,terminalMethod:y,terminalValue:0,pvOfTerminalValue:0,terminalValueShareOfEV:0,impliedExitMultiple:0,impliedTerminalGrowth:0,impliedReinvestmentRate:0,impliedTerminalROIC:null,enterpriseValue:0,bridge:d,equityValue:0,sharesUsed:g,valuePerShare:0,currentSharePrice:m,upsidePercent:null,safetyMarginPrice:0};let A=0,D=0,F=null;const _=E.nopat*(1+h);if(y==="value_driver"){const O=Math.max(.01,i.terminalROIC/100),T=h>0?ae(h/O,0,.95):0,U=_*(1-T);A=P(U,r-h),D=T*100,F=i.terminalROIC}else if(y==="gordon"){const O=E.fcff*(1+h);A=P(O,r-h);const T=_>0?1-O/_:0;D=T*100,F=T>.001&&h>0?h/T*100:null}else{A=Math.max(0,E.ebitda)*Math.max(0,C);const O=E.fcff*(1+h),T=_>0?1-O/_:0;D=T*100,F=T>.001&&h>0?h/T*100:null}const Y=A/Math.pow(1+r,n),$=v+Y,N=$>0?P(Y,$)*100:0,B=P(A,E.ebitda),Z=A+E.fcff>0?P(A*r-E.fcff,A+E.fcff):0,le=$-d.netDeductionFromEV,se=g>0?P(le,g):0,M=m>0?(se-m)/m*100:null,V=se*(1-ae(i.safetyMarginTarget,0,80)/100);return{valid:!0,costOfCapital:u,projections:p,pvOfExplicitFcff:v,terminalMethod:y,terminalValue:A,pvOfTerminalValue:Y,terminalValueShareOfEV:N,impliedExitMultiple:B,impliedTerminalGrowth:Z*100,impliedReinvestmentRate:D,impliedTerminalROIC:F,enterpriseValue:$,bridge:d,equityValue:le,sharesUsed:g,valuePerShare:se,currentSharePrice:m,upsidePercent:M,safetyMarginPrice:V}}function De(e,a){const t=e.financials,i=e.valuationAssumptions,s=ie(t),n=ae(Math.round(i.projectionYears||5),5,10),u=oe(e,{keDelta:a==null?void 0:a.keDelta}),r=u.costOfEquity/100,d=u.preTaxCostOfDebt/100,m=((a==null?void 0:a.terminalGrowthOverride)??i.terminalGrowthRate+((a==null?void 0:a.terminalGrowthDelta)??0))/100,y=Pe(e),f=ve(e),h=ae(i.fcfeTargetDebtRatio/100,0,.85),C=it(i.salesGrowth,n,(a==null?void 0:a.salesGrowthDelta)??0,a==null?void 0:a.uniformSalesGrowth),c=Rt(t.years,n);let b=t.netSales[s]??0,o=tt(t)[s]??0,l=Math.max(0,Ve(t,i.includeLeasesInDebt)[s]??0);const p=[];let v=0;for(let B=0;B<n;B++){const Z=B+1,le=n>1?B/(n-1):1,se=C[B],M=b*(1+se/100),V=(a==null?void 0:a.uniformEbitMargin)!==void 0?a.uniformEbitMargin:i.ebitMarginStart+(i.ebitMarginTarget-i.ebitMarginStart)*le+((a==null?void 0:a.ebitMarginDelta)??0),O=i.effectiveTaxRate+(i.marginalTaxRate-i.effectiveTaxRate)*le,T=M*(V/100),U=l*d,K=T-U,W=K>0?K*(O/100):0,ee=K-W,ce=M*(i.depAsPercentOfSales/100),J=M*(i.capexAsPercentOfSales/100),Ee=M*(i.nwcAsPercentOfSales/100),$e=Ee-o,de=J-ce+$e,ze=h*de,be=Math.max(0,l+ze),he=be-l,Ae=ee-de+he,Re=i.midYearConvention?Z-.5:Z,Me=r>-.99?1/Math.pow(1+r,Re):0,ke=Ae*Me;v+=ke,p.push({yearIndex:Z,yearLabel:c[B],sales:M,salesGrowth:se,ebit:T,interestExpense:U,ebt:K,taxes:W,netIncome:ee,da:ce,capex:J,deltaNWC:$e,netReinvestment:de,netDebtIssuance:he,endingDebt:be,fcfe:Ae,discountPeriod:Re,discountFactor:Me,pvFcfe:ke}),b=M,o=Ee,l=be}if(b<=0||r<=m||r<=0)return{valid:!1,errorMessage:b<=0?"Receita líquida histórica deve ser maior que zero para projetar o FCFE.":"Custo do Capital Próprio (Ke) deve ser estritamente maior que g.",costOfEquity:u.costOfEquity,projections:p,pvOfExplicitFcfe:v,terminalValue:0,pvOfTerminalValue:0,terminalValueShareOfEquity:0,cashAndNonOperatingAdded:0,equityValue:0,sharesUsed:y,valuePerShare:0,currentSharePrice:f,upsidePercent:null,safetyMarginPrice:0};const E=p[p.length-1],w=P(E.fcfe*(1+m),r-m),A=w/Math.pow(1+r,n),D=(t.cashAndEquivalents[s]??0)+(t.nonOperatingAssets[s]??0)-(t.preferredStock[s]??0)-(t.minorityInterest[s]??0),F=v+A+D,_=F>0?P(A,F)*100:0,Y=y>0?P(F,y):0,$=f>0?(Y-f)/f*100:null,N=Y*(1-ae(i.safetyMarginTarget,0,80)/100);return{valid:!0,costOfEquity:u.costOfEquity,projections:p,pvOfExplicitFcfe:v,terminalValue:w,pvOfTerminalValue:A,terminalValueShareOfEquity:_,cashAndNonOperatingAdded:D,equityValue:F,sharesUsed:y,valuePerShare:Y,currentSharePrice:f,upsidePercent:$,safetyMarginPrice:N}}function Mt(e){const a=qe(e),t=e.valuationAssumptions,i=ae(Math.round(t.projectionYears||5),5,10),n=it(t.salesGrowth,i).reduce((m,y)=>m*(1+y/100),1),u=(Math.pow(Math.max(.01,n),1/i)-1)*100;if(a<=0)return{valid:!1,impliedSalesCAGR:null,impliedEbitMargin:null,currentMarketCap:0,baseProjectedCAGR:u,baseEbitMarginTarget:t.ebitMarginTarget};const r=(m,y,f)=>{let h=y,C=f;const c=m(h)-a,b=m(C)-a;if(!Number.isFinite(c)||!Number.isFinite(b)||c*b>0)return null;for(let o=0;o<60;o++){const l=(h+C)/2,p=m(l)-a;if(Math.abs(p)<Math.max(1e-4,a*1e-6))return l;c*p<=0?C=l:h=l}return(h+C)/2},d=r(m=>G(e,{uniformSalesGrowth:m}).equityValue,-25,80),g=r(m=>G(e,{uniformEbitMargin:m}).equityValue,.5,75);return{valid:d!==null||g!==null,impliedSalesCAGR:d,impliedEbitMargin:g,currentMarketCap:a,baseProjectedCAGR:u,baseEbitMarginTarget:t.ebitMarginTarget}}function Ge(e){var o,l;const a=e.valuationAssumptions,t=oe(e),i=t.costOfEquity/100,s=a.dividendGrowthRate/100,n=a.ddmHighGrowthRate/100,u=ae(Math.round(a.ddmHighGrowthYears||5),1,15),r=e.dividendPerShare,d=ve(e),g=at(e);if(!r||r<=0)return{valid:!1,errorMessage:"Informe um Dividendo por Ação (D0) maior que zero para calcular o DDM.",model:a.ddmModel,costOfEquity:t.costOfEquity,d0:0,d1:0,longTermGrowth:a.dividendGrowthRate,highGrowthRate:a.ddmHighGrowthRate,highGrowthYears:u,projections:[],terminalValue:0,pvOfTerminalValue:0,valuePerShare:0,currentSharePrice:d,upsidePercent:null,safetyMarginPrice:0,shareholderReturns:g};if(i<=s||i<=0)return{valid:!1,errorMessage:"Custo do Capital Próprio (Ke) deve ser maior que o crescimento perpétuo de dividendos (g).",model:a.ddmModel,costOfEquity:t.costOfEquity,d0:r,d1:r*(1+s),longTermGrowth:a.dividendGrowthRate,highGrowthRate:a.ddmHighGrowthRate,highGrowthYears:u,projections:[],terminalValue:0,pvOfTerminalValue:0,valuePerShare:0,currentSharePrice:d,upsidePercent:null,safetyMarginPrice:0,shareholderReturns:g};let m=0,y=0,f=0,h=r*(1+s);const C=[];if(a.ddmModel==="gordon"){h=r*(1+s),m=P(h,i-s),y=m,f=m;for(let p=1;p<=5;p++){const v=r*Math.pow(1+s,p);C.push({year:p,dividend:v,growthRate:a.dividendGrowthRate,pvDividend:v/Math.pow(1+i,p)})}}else if(a.ddmModel==="two_stage"){let p=0,v=r;for(let w=1;w<=u;w++){const A=v*(1+n),D=A/Math.pow(1+i,w);p+=D,C.push({year:w,dividend:A,growthRate:a.ddmHighGrowthRate,pvDividend:D}),v=A}h=((o=C[0])==null?void 0:o.dividend)??r*(1+n);const E=v*(1+s);y=P(E,i-s),f=y/Math.pow(1+i,u),m=p+f}else{const p=u/2,v=r*(1+s)+r*p*(n-s);m=P(v,i-s);let E=r;for(let w=1;w<=u;w++){const A=n-(n-s)*w/u,D=E*(1+A);C.push({year:w,dividend:D,growthRate:A*100,pvDividend:D/Math.pow(1+i,w)}),E=D}h=((l=C[0])==null?void 0:l.dividend)??r*(1+n),y=P(E*(1+s),i-s),f=y/Math.pow(1+i,u)}const c=d>0?(m-d)/d*100:null,b=m*(1-ae(a.safetyMarginTarget,0,80)/100);return{valid:!0,model:a.ddmModel,costOfEquity:t.costOfEquity,d0:r,d1:h,longTermGrowth:a.dividendGrowthRate,highGrowthRate:a.ddmHighGrowthRate,highGrowthYears:u,projections:C,terminalValue:y,pvOfTerminalValue:f,valuePerShare:m,currentSharePrice:d,upsidePercent:c,safetyMarginPrice:b,shareholderReturns:g}}const _e={competence:{title:"Círculo de Competência",questions:[{key:"q1",text:"Compreendo claramente como a empresa gera receita, margem e caixa?"},{key:"q2",text:"O modelo de negócio é simples, transparente e consistente ao longo do tempo?"},{key:"q3",text:"A previsibilidade dos fluxos de caixa nos próximos 5–10 anos é elevada?"}]},moat:{title:"Vantagem Competitiva (Moat)",questions:[{key:"q4",text:"A empresa possui poder de precificação comprovado (repassa inflação sem perder volume)?"},{key:"q5",text:"Existem altos custos de troca (switching costs) ou efeito de rede?"},{key:"q6",text:"A escala, ativos intangíveis ou marca conferem retorno sobre capital (ROIC) estruturalmente superior?"},{key:"q7",text:"O modelo possui boa escalabilidade operacional (baixo custo marginal)?"}]},porter:{title:"5 Forças de Porter (Setor)",questions:[{key:"q8",text:"A rivalidade entre concorrentes estabelecidos é moderada/racional?"},{key:"q9",text:"Existem barreiras significativas à entrada de novos competidores?"},{key:"q10",text:"O poder de barganha dos fornecedores é baixo/diversificado?"},{key:"q11",text:"O poder de barganha dos clientes é baixo (base pulverizada)?"},{key:"q12",text:"A ameaça de produtos substitutos ou disrupção tecnológica é reduzida?"}]},governance:{title:"Gestão & Alocação de Capital",questions:[{key:"q13",text:"A gestão demonstra histórico disciplinado de alocação de capital (M&A, CAPEX, recompras, dividendos)?"},{key:"q14",text:"A remuneração dos executivos e estrutura societária estão alinhadas ao acionista minoritário?"},{key:"q15",text:"A governança, transparência contábil e comunicação com o mercado são de alto padrão?"}]}};function st(e){const a={};let t=0,i=0,s=0;for(const[n,u]of Object.entries(_e)){let r=0,d=0;for(const g of u.questions){s++;const m=e.qualitative[g.key];m&&m.score>=1&&m.score<=5&&(r+=m.score,d++,t+=m.score,i++)}a[n]=d>0?r/d:0}return{overallScore:i>0?t/i:0,pillarScores:a,answeredCount:i,totalCount:s}}function nt(e){const a=[],t=e.valuationAssumptions,i=e.financials,s=ie(i);e.sectorProfile==="financial"?a.push({severity:"warning",category:"sector",title:"Setor Financeiro (Bancos / Seguradoras)",message:"Para instituições financeiras, dívida é matéria-prima operacional. Priorize FCFE, DDM e P/VP vs. ROE em vez de FCFF/WACC ou EV/EBITDA."}):e.sectorProfile==="real_estate"&&a.push({severity:"info",category:"sector",title:"Setor Imobiliário / FII / REIT",message:"Considere avaliar também por FFO/AFFO, P/VP (NAV) e DDM, pois a depreciação contábil nem sempre reflete o CAPEX de manutenção real."});const u=Ke(i).filter(h=>!h.isBalanced&&(h.totalAssets>0||h.totalLiabilitiesAndEquity>0));u.length>0&&a.push({severity:"warning",category:"accounting",title:"Balanço Patrimonial sem fechamento exato",message:`Diferença entre Ativo Total e Passivo + PL em ${u.map(h=>h.year).join(", ")}. Utilize "Outros Ativos" ou "Outros Passivos" para fechar o balanço e garantir ROA/ROIC precisos.`}),Pe(e)<=0&&a.push({severity:"error",category:"accounting",title:"Quantidade de ações não informada",message:"Informe o número de Ações Diluídas (ou Básicas) na mesma escala dos demonstrativos para calcular o Valor Intrínseco por Ação."});const r=G(e);if(!r.valid&&r.errorMessage)a.push({severity:"error",category:"dcf",title:"DCF FCFF inválido",message:r.errorMessage});else if(r.valid){const h=t.valuationBase==="nominal_brl"?6.5:4;t.terminalGrowthRate>h&&a.push({severity:"warning",category:"dcf",title:`Crescimento perpétuo (${t.terminalGrowthRate.toFixed(1)}%) elevado`,message:`Na base ${t.valuationBase==="nominal_brl"?"Nominal BRL":t.valuationBase==="nominal_usd"?"Nominal USD":"Real"}, g na perpetuidade não deve superar o crescimento nominal de longo prazo da economia (~${h}%).`}),r.terminalValueShareOfEV>75&&a.push({severity:"warning",category:"dcf",title:`Valor Terminal concentra ${r.terminalValueShareOfEV.toFixed(1)}% do EV`,message:"Mais de 75% do Enterprise Value depende da perpetuidade. Considere ampliar o horizonte explícito de projeção para 7–10 anos para aumentar a robustez do modelo."}),t.terminalMethod==="value_driver"&&t.terminalROIC>30&&a.push({severity:"info",category:"dcf",title:`ROIC terminal muito alto (${t.terminalROIC.toFixed(1)}%)`,message:"Pela teoria de competição (McKinsey/Damodaran), na perpetuidade o ROIC incremental tende a convergir em direção ao WACC, exceto em empresas com Moat excepcional."}),t.terminalMethod==="gordon"&&r.impliedTerminalROIC!==null&&r.impliedTerminalROIC>50&&a.push({severity:"warning",category:"dcf",title:`Reinvestimento insuficiente na perpetuidade (ROIC implícito ${r.impliedTerminalROIC.toFixed(0)}%)`,message:'O método Gordon puro sobre o último FCFF implica retorno quase infinito sobre capital reinvestido. Prefira o método "Value Driver (ROIC Terminal)".'})}const d=Ge(e);d.valid&&(d.shareholderReturns.payoutRatio>100&&a.push({severity:"warning",category:"ddm",title:`Payout acima de 100% (${d.shareholderReturns.payoutRatio.toFixed(0)}%)`,message:"A empresa distribuiu mais dividendos do que o Lucro Líquido recente. Verifique se os dividendos são sustentáveis pelo Fluxo de Caixa Livre."}),d.shareholderReturns.sustainableGrowthRate>0&&t.dividendGrowthRate>d.shareholderReturns.sustainableGrowthRate+2&&a.push({severity:"warning",category:"ddm",title:"Crescimento de dividendos acima do sustentável",message:`g perpétuo (${t.dividendGrowthRate.toFixed(1)}%) supera a taxa sustentável histórica ROE × (1 - Payout) = ${d.shareholderReturns.sustainableGrowthRate.toFixed(1)}%.`}));const g=st(e),m=((g.pillarScores.moat||0)+(g.pillarScores.porter||0))/2,y=Fe(i)[s]??0;g.answeredCount>=8&&m>0&&m<2.8&&(t.ebitMarginTarget>y+3&&a.push({severity:"warning",category:"qualitative",title:"Conflito Narrativa × Números (Expansão de Margem)",message:`A pontuação de Moat/Porter é baixa (${m.toFixed(1)}/5), mas o DCF projeta expansão relevante de Margem EBIT (de ${y.toFixed(1)}% para ${t.ebitMarginTarget.toFixed(1)}%). Revise a coerência da tese.`}),r.valid&&t.terminalROIC>r.costOfCapital.wacc+8&&a.push({severity:"warning",category:"qualitative",title:"Conflito Narrativa × Números (ROIC Terminal)",message:`Moat/Porter avaliado em ${m.toFixed(1)}/5, mas o ROIC terminal (${t.terminalROIC.toFixed(1)}%) mantém spread elevado sobre o WACC (${r.costOfCapital.wacc.toFixed(1)}%) na perpetuidade.`}));const f=t.scenarios.bear.probability+t.scenarios.base.probability+t.scenarios.bull.probability;return Math.abs(f-100)>.1&&a.push({severity:"info",category:"dcf",title:`Soma das probabilidades dos cenários é ${f.toFixed(0)}%`,message:"Ajuste os pesos Bear/Base/Bull para totalizar 100% (atualmente o valor esperado é normalizado automaticamente)."}),a}const H=2,rt={industrial:"Indústria / Bens de Capital / Serviços",consumer:"Consumo / Varejo / Saúde",tech:"Tecnologia / Software / Alto Crescimento",utilities:"Utilities / Energia / Saneamento",financial:"Financeiro (Bancos / Seguradoras)",real_estate:"Imobiliário / Construção / FIIs"},Ne={nominal_brl:{label:"Nominal BRL (Brasil)",currency:"BRL",riskFreeRate:11.5,equityRiskPremium:5.5,countryRiskPremium:2.2,costOfDebt:13,effectiveTaxRate:25,marginalTaxRate:34,terminalGrowthRate:4.5,dividendGrowthRate:4.5},nominal_usd:{label:"Nominal USD (Global / EUA)",currency:"USD",riskFreeRate:4.25,equityRiskPremium:5,countryRiskPremium:0,costOfDebt:5.75,effectiveTaxRate:20,marginalTaxRate:21,terminalGrowthRate:2.5,dividendGrowthRate:2.5},real:{label:"Base Real (Acima da Inflação / IPCA+)",currency:"BRL",riskFreeRate:6.2,equityRiskPremium:5.5,countryRiskPremium:1.5,costOfDebt:7.5,effectiveTaxRate:25,marginalTaxRate:34,terminalGrowthRate:1.5,dividendGrowthRate:1.5}},Oe=[{title:"Balanço Patrimonial — Ativos",items:[{key:"cashAndEquivalents",label:"Caixa, Equivalentes e Aplicações"},{key:"accountsReceivable",label:"Contas a Receber"},{key:"inventories",label:"Estoques"},{key:"otherCurrentAssets",label:"Outros Ativos Circulantes"},{key:"fixedAssets",label:"Imobilizado (PP&E)"},{key:"rightOfUseAssets",label:"Ativo de Direito de Uso (IFRS 16)"},{key:"intangiblesGoodwill",label:"Intangíveis & Goodwill"},{key:"nonOperatingAssets",label:"Investimentos / Coligadas (Não Operacionais)",hint:"Somado na ponte EV → Equity Value"},{key:"otherNonCurrentAssets",label:"Outros Ativos Não Circulantes"}]},{title:"Balanço Patrimonial — Passivos e Patrimônio Líquido",items:[{key:"accountsPayable",label:"Fornecedores (Contas a Pagar)"},{key:"shortTermDebt",label:"Dívida de Curto Prazo"},{key:"otherCurrentLiabilities",label:"Outros Passivos Circulantes"},{key:"longTermDebt",label:"Dívida de Longo Prazo"},{key:"leaseLiabilities",label:"Passivos de Arrendamento (IFRS 16)"},{key:"provisions",label:"Provisões / Passivos Contingentes",hint:"Opcionalmente deduzido na ponte EV → Equity"},{key:"otherNonCurrentLiabilities",label:"Outros Passivos Não Circulantes"},{key:"preferredStock",label:"Ações Preferenciais (Debt-like)"},{key:"minorityInterest",label:"Participação de Não Controladores"},{key:"shareholdersEquity",label:"Patrimônio Líquido (Controladores)"}]},{title:"Demonstração do Resultado (DRE)",items:[{key:"netSales",label:"Receita Líquida"},{key:"cogs",label:"Custo dos Produtos/Serviços (CPV/CSP)"},{key:"sga",label:"Despesas Comerciais, Gerais e Adm. (SG&A)"},{key:"rd",label:"Pesquisa & Desenvolvimento (P&D)"},{key:"depreciationAmortization",label:"Depreciação e Amortização (D&A)",hint:"Defina acima se D&A já está embutida no CPV/SG&A ou lançada separadamente"},{key:"financialIncome",label:"Receitas Financeiras (+)"},{key:"interestExpense",label:"Despesas Financeiras / Juros (valor positivo)"},{key:"taxes",label:"Imposto de Renda e CSLL"}]},{title:"Demonstração do Fluxo de Caixa (DFC)",items:[{key:"cfo",label:"Fluxo de Caixa Operacional (FCO)"},{key:"capex",label:"CAPEX — Investimentos em Ativos Fixos (valor positivo)"},{key:"cfi",label:"Fluxo de Caixa de Investimento (FCI)"},{key:"cff",label:"Fluxo de Caixa de Financiamento (FCF)"},{key:"dividendsPaid",label:"Dividendos & JCP Pagos (valor positivo)"},{key:"shareRepurchases",label:"Recompra de Ações (valor positivo)"}]}],Be=Oe.flatMap(e=>e.items.map(a=>a.key)),Ka={ROE:"Return on Equity = Lucro Líquido / Patrimônio Líquido Médio. Mede o retorno gerado sobre o capital dos acionistas.",ROIC:"Return on Invested Capital = NOPAT / Capital Investido Médio. Pilar central de criação de valor: a empresa cria valor quando ROIC > WACC.",ROA:"ROA ajustado por impostos = [Lucro Líquido + Juros × (1 − t)] / Ativo Total Médio. Mede a eficiência operacional independente da alavancagem.",ROCE:"Return on Capital Employed = EBIT / (Ativo Total − Passivo Circulante) Médio.","Margem Bruta":"(Receita Líquida − CPV) / Receita Líquida. Reflete poder de precificação e eficiência produtiva.","Margem EBIT":"EBIT / Receita Líquida. Lucratividade operacional antes de juros e tributos.","Margem EBITDA":"EBITDA / Receita Líquida. Proxy operacional de geração bruta de caixa.","Margem Líquida":"Lucro Líquido / Receita Líquida.","Margem FCF":"Fluxo de Caixa Livre (FCO − CAPEX) / Receita Líquida.","Conversão FCF / LL":"Fluxo de Caixa Livre / Lucro Líquido. Valores próximos ou acima de 80–100% indicam alta qualidade dos lucros.","Cobertura de Juros":"EBIT / Despesas Financeiras. Base para estimar o Rating Sintético e o risco de crédito (Damodaran).","Dívida Líquida / EBITDA":"(Dívida Bruta + Leasing − Caixa) / EBITDA. Mede em anos a capacidade operacional de desalavancagem.","Ciclo de Conversão de Caixa":"DSO + DIO − DPO (em dias). Quanto menor (ou negativo), menos capital de giro a empresa imobiliza para crescer.","Taxa Livre de Risco":"Use um título soberano de LONGO PRAZO (10 anos) compatível com a moeda do valuation (ex.: NTN-B longa + inflação implícita / DI longo em BRL, ou US Treasury 10Y em USD). Nunca use Selic/T-Bill de curtíssimo prazo.","Prêmio de Risco (ERP)":"Retorno excedente exigido para investir em ações maduras sobre a taxa livre de risco (historicamente 4,5% a 6,0%).","Prêmio de Risco-País (CRP)":"Adicional de risco soberano/mercado emergente (ex.: Damodaran CRP / EMBI+ ajustado). Em valuation nominal BRL já embutindo risco soberano na taxa livre de risco local, evite dupla contagem.","Beta (CAPM / Hamada)":"Sensibilidade do ativo ao risco sistemático de mercado. No modo Hamada, βL = βU × [1 + (1 − t_m) × (D/E)].","Rating Sintético (Kd)":"Estima o spread de crédito da dívida a partir do Índice de Cobertura de Juros (EBIT / Juros), metodologia Damodaran.","Value Driver (ROIC Terminal)":"Fórmula McKinsey/Damodaran: TV = NOPAT_(N+1) × (1 − g / ROIC_term) / (WACC − g). Garante coerência econômica entre crescimento perpétuo e reinvestimento.","Mid-Year Convention":"Assume que os fluxos de caixa são gerados continuamente ao longo do ano (desconto em t − 0,5 em vez de t), padrão em Investment Banking.","Ponte EV → Equity":"Equity Value = EV − Dívida Bruta − Leasing (IFRS 16) + Caixa − Não Controladores − Preferenciais − Provisões + Ativos Não Operacionais.","Reverse DCF":"Calcula qual CAGR de receita (ou margem EBIT) está implícito no preço atual de mercado, permitindo confrontar expectativas do mercado com sua tese.","Modelo H (DDM)":"Modelo Fuller-Hsia onde o crescimento dos dividendos desacelera linearmente de g_S até g_L ao longo de 2H anos.","Total Shareholder Yield":"(Dividendos Pagos + Recompra de Ações) / Valor de Mercado. Mede o retorno total em caixa devolvido ao acionista."};function Je(e=["2021","2022","2023","2024","LTM"]){const a=()=>e.map(()=>0);return{years:[...e],daRecognition:"included_in_opex",fixedAssets:a(),intangiblesGoodwill:a(),rightOfUseAssets:a(),nonOperatingAssets:a(),inventories:a(),accountsReceivable:a(),otherCurrentAssets:a(),otherNonCurrentAssets:a(),cashAndEquivalents:a(),shareholdersEquity:a(),minorityInterest:a(),preferredStock:a(),shortTermDebt:a(),longTermDebt:a(),leaseLiabilities:a(),provisions:a(),accountsPayable:a(),otherCurrentLiabilities:a(),otherNonCurrentLiabilities:a(),netSales:a(),cogs:a(),sga:a(),depreciationAmortization:a(),rd:a(),financialIncome:a(),interestExpense:a(),taxes:a(),cfo:a(),capex:a(),cfi:a(),cff:a(),dividendsPaid:a(),shareRepurchases:a()}}function pe(e="nominal_brl"){const a=Ne[e];return{valuationBase:e,riskFreeRate:a.riskFreeRate,equityRiskPremium:a.equityRiskPremium,countryRiskPremium:a.countryRiskPremium,sizePremium:0,betaMode:"direct",leveredBeta:1,unleveredBeta:.85,costOfDebtMode:"manual",costOfDebt:a.costOfDebt,capitalStructureMode:"current",targetDebtToCapital:25,effectiveTaxRate:a.effectiveTaxRate,marginalTaxRate:a.marginalTaxRate,projectionYears:5,salesGrowth:[9,8,7,6,5,5,4.5,4.5,4.5,4.5],ebitMarginStart:16,ebitMarginTarget:16,capexAsPercentOfSales:5,depAsPercentOfSales:3.5,nwcAsPercentOfSales:12,midYearConvention:!0,fcfeTargetDebtRatio:20,includeProvisionsInBridge:!1,includeLeasesInDebt:!0,safetyMarginTarget:25,terminalMethod:"value_driver",terminalGrowthRate:a.terminalGrowthRate,terminalROIC:16,exitEvEbitdaMultiple:9,ddmModel:"two_stage",dividendGrowthRate:a.dividendGrowthRate,ddmHighGrowthRate:9,ddmHighGrowthYears:5,scenarios:{bear:{label:"Pessimista (Bear)",probability:25,salesGrowthDelta:-3,ebitMarginDelta:-2.5,waccDelta:1.5,terminalGrowthDelta:-1},base:{label:"Base",probability:50,salesGrowthDelta:0,ebitMarginDelta:0,waccDelta:0,terminalGrowthDelta:0},bull:{label:"Otimista (Bull)",probability:25,salesGrowthDelta:3,ebitMarginDelta:2,waccDelta:-1,terminalGrowthDelta:.5}}}}function ye(){const e={};for(const a of Object.values(_e))for(const t of a.questions)e[t.key]={score:3,note:""};return e}function kt(e,a="nominal_brl"){const t=Ne[a];return{id:e,schemaVersion:H,updatedAt:new Date().toISOString(),companyName:"Nova Empresa",companyTicker:"",sectorProfile:"industrial",currency:t.currency,scale:"millions",sharePrice:0,basicShares:0,dilutedShares:0,marketCap:0,dividendPerShare:0,week52Low:0,week52High:0,investmentThesis:"",financials:Je(),qualitative:ye(),valuationAssumptions:pe(a),peers:[]}}function Ja(){const e=new Date().toISOString(),a=ye(),t={q1:[5,"Receita recorrente de equipamentos eletroeletrônicos, automação e serviços pós-venda."],q2:[4,"Verticalização industrial bem consolidada há décadas."],q3:[4,"Demanda secular impulsionada por eletrificação e eficiência energética."],q4:[4,"Liderança de marca permite repasse de custos de cobre e aço."],q5:[4,"Altos custos de parada industrial geram fidelidade elevada."],q6:[5,"ROIC historicamente acima de 22% com excelente disciplina operacional."],q7:[4,"Fábricas modulares permitem expansão com retorno incremental alto."],q8:[4,"Concorrência racional em nichos técnicos de alto valor agregado."],q9:[4,"Escala global, engenharia proprietária e certificações criam barreiras fortes."],q10:[3,"Exposição moderada a commodities (cobre, aço silício)."],q11:[4,"Base de clientes diversificada entre setores e geografias."],q12:[4,"Tecnologia essencial na transição energética."],q13:[5,"Histórico exemplar de reinvestimento orgânico e M&As bolt-on disciplinados."],q14:[5,"Controle familiar estável com alinhamento de longo prazo."],q15:[5,"Novo Mercado, comunicação clara e contabilidade conservadora."]};for(const[m,[y,f]]of Object.entries(t))a[m]={score:y,note:f};const i={id:"sample_alfa3",schemaVersion:H,updatedAt:e,companyName:"Indústrias Alfa S.A. (Exemplo BR)",companyTicker:"ALFA3",sectorProfile:"industrial",currency:"BRL",scale:"millions",sharePrice:36.5,basicShares:400,dilutedShares:404,marketCap:14746,dividendPerShare:.72,week52Low:29.8,week52High:41.2,investmentThesis:"Compounder industrial brasileiro com receita diversificada (45% exportação), caixa líquido, alto ROIC (>22%) e ventos favoráveis estruturais em eletrificação, automação e renováveis.",financials:{years:["2021","2022","2023","2024","LTM"],daRecognition:"included_in_opex",cashAndEquivalents:[1450,1780,2240,2750,2980],accountsReceivable:[1120,1340,1510,1720,1810],inventories:[1380,1590,1730,1910,2020],otherCurrentAssets:[250,290,320,360,390],fixedAssets:[2100,2380,2720,3100,3290],rightOfUseAssets:[180,200,220,240,250],intangiblesGoodwill:[520,560,610,680,710],nonOperatingAssets:[120,130,140,160,170],otherNonCurrentAssets:[280,310,350,380,400],accountsPayable:[880,1020,1140,1290,1360],shortTermDebt:[310,340,360,390,400],otherCurrentLiabilities:[520,610,680,760,810],longTermDebt:[780,810,840,890,910],leaseLiabilities:[190,210,230,250,260],provisions:[140,150,160,175,185],otherNonCurrentLiabilities:[210,230,250,275,295],preferredStock:[0,0,0,0,0],minorityInterest:[70,80,90,100,110],shareholdersEquity:[4300,5130,6090,7170,7690],netSales:[5400,6480,7450,8520,9100],cogs:[3720,4430,5020,5690,6050],sga:[690,810,915,1030,1095],rd:[130,155,180,210,225],depreciationAmortization:[215,248,285,325,350],financialIncome:[130,195,240,275,295],interestExpense:[110,125,135,145,150],taxes:[175,230,285,345,380],cfo:[840,1060,1320,1590,1720],capex:[340,410,470,520,545],cfi:[-360,-430,-490,-540,-565],cff:[-260,-300,-370,-540,-925],dividendsPaid:[210,245,265,280,291],shareRepurchases:[40,55,70,85,95]},qualitative:a,valuationAssumptions:{...pe("nominal_brl"),riskFreeRate:11.2,equityRiskPremium:5.5,countryRiskPremium:1.5,betaMode:"hamada",unleveredBeta:.88,leveredBeta:.94,costOfDebtMode:"synthetic",costOfDebt:12.2,effectiveTaxRate:21,marginalTaxRate:34,projectionYears:7,salesGrowth:[12,11,10,9,8,7,6],ebitMarginStart:19,ebitMarginTarget:19.5,capexAsPercentOfSales:6,depAsPercentOfSales:3.8,nwcAsPercentOfSales:20.5,midYearConvention:!0,fcfeTargetDebtRatio:15,terminalMethod:"value_driver",terminalGrowthRate:5,terminalROIC:20,exitEvEbitdaMultiple:11.5,ddmModel:"two_stage",dividendGrowthRate:5,ddmHighGrowthRate:11,ddmHighGrowthYears:5},peers:[{id:"p1",name:"WEG-like Peer A",ticker:"IND1",evToEbitda:14.5,evToEbit:17.2,evToSales:2.9,pe:23,pb:5.8,peg:1.8,fcfYield:3.6},{id:"p2",name:"Automação Global B",ticker:"IND2",evToEbitda:11.8,evToEbit:14.1,evToSales:2.2,pe:18.5,pb:3.9,peg:1.6,fcfYield:4.8},{id:"p3",name:"Motores & Energia C",ticker:"IND3",evToEbitda:10.2,evToEbit:12.6,evToSales:1.8,pe:15.8,pb:3.1,peg:1.5,fcfYield:5.4},{id:"p4",name:"Equipamentos Sul D",ticker:"IND4",evToEbitda:12.4,evToEbit:15,evToSales:2.4,pe:19.4,pb:4.2,peg:1.7,fcfYield:4.3}]},s=ye(),n={q1:[5,"Receita Anual Permitida (RAP) corrigida anualmente pelo IPCA por contratos de 30 anos."],q2:[5,"Fluxo de caixa altamente previsível sem risco hidrológico ou de volume."],q3:[5,"Concessões longas proporcionam altíssima visibilidade de caixa."],q4:[4,"Reajuste inflacionário contratual automático (IPCA)."],q5:[5,"Monopólio natural regulado pela ANEEL."],q6:[4,"Margem EBITDA > 80% com baixíssima necessidade de CAPEX de manutenção."],q7:[3,"Crescimento depende de leilões competitivos e disciplina de retorno."],q8:[4,"Sem concorrência direta após vencer concessão."],q9:[5,"Altíssimas barreiras regulatórias e de capital."],q10:[4,"Fornecedores de cabos e torres diversificados."],q11:[4,"Recebimento garantido pelo sistema interligado nacional (ONS)."],q12:[5,"Infraestrutura crítica sem substituto viável."],q13:[4,"Disciplina em leilões e forte distribuição de dividendos (payout ~75%)."],q14:[4,"Política clara de dividendos e governança Nível 2/Novo Mercado."],q15:[4,"Divulgação regulatória e IFRS bem detalhadas."]};for(const[m,[y,f]]of Object.entries(n))s[m]={score:y,note:f};const u={id:"sample_thor11",schemaVersion:H,updatedAt:e,companyName:"Transmissora Horizonte S.A. (Utilities BR)",companyTicker:"THOR11",sectorProfile:"utilities",currency:"BRL",scale:"millions",sharePrice:31.2,basicShares:350,dilutedShares:350,marketCap:10920,dividendPerShare:2.95,week52Low:28.1,week52High:34.9,investmentThesis:"Ativo defensivo de transmissão elétrica com receitas 100% indexadas ao IPCA, baixo beta (0,65), margem EBITDA > 80% e elevado retorno em dividendos (DY ~9,5%).",financials:{years:["2021","2022","2023","2024","LTM"],daRecognition:"included_in_opex",cashAndEquivalents:[980,1120,1240,1380,1450],accountsReceivable:[340,380,410,445,460],inventories:[20,22,24,25,26],otherCurrentAssets:[160,178,186,200,214],fixedAssets:[9800,10500,11100,11600,11850],rightOfUseAssets:[60,65,70,72,75],intangiblesGoodwill:[2400,2450,2480,2510,2525],nonOperatingAssets:[840,910,970,1020,1050],otherNonCurrentAssets:[400,425,440,468,480],accountsPayable:[190,210,225,240,250],shortTermDebt:[680,720,760,810,830],otherCurrentLiabilities:[310,340,365,390,410],longTermDebt:[6600,7100,7450,7750,7850],leaseLiabilities:[65,70,75,78,80],provisions:[180,195,210,222,230],otherNonCurrentLiabilities:[825,865,895,930,950],preferredStock:[0,0,0,0,0],minorityInterest:[150,160,170,180,190],shareholdersEquity:[6e3,6390,6770,7120,7340],netSales:[2350,2620,2890,3120,3260],cogs:[410,445,480,515,535],sga:[265,290,315,335,350],rd:[15,15,15,20,20],depreciationAmortization:[280,305,325,345,360],financialIncome:[110,145,160,175,185],interestExpense:[620,710,760,795,810],taxes:[185,210,235,260,280],cfo:[1580,1760,1940,2110,2210],capex:[490,520,460,410,380],cfi:[-510,-540,-480,-430,-400],cff:[-920,-1080,-1340,-1540,-1740],dividendsPaid:[840,910,965,1010,1032],shareRepurchases:[0,0,0,0,0]},qualitative:s,valuationAssumptions:{...pe("nominal_brl"),riskFreeRate:11.2,equityRiskPremium:5.5,countryRiskPremium:1.5,betaMode:"direct",leveredBeta:.65,unleveredBeta:.43,costOfDebtMode:"manual",costOfDebt:11.8,effectiveTaxRate:17,marginalTaxRate:34,projectionYears:5,salesGrowth:[6,5.5,5.2,5,4.8],ebitMarginStart:72,ebitMarginTarget:71,capexAsPercentOfSales:11,depAsPercentOfSales:11,nwcAsPercentOfSales:2,midYearConvention:!0,fcfeTargetDebtRatio:40,terminalMethod:"value_driver",terminalGrowthRate:4.2,terminalROIC:12.5,exitEvEbitdaMultiple:8.5,ddmModel:"h_model",dividendGrowthRate:4.2,ddmHighGrowthRate:7.5,ddmHighGrowthYears:6},peers:[{id:"t1",name:"Transmissora A",ticker:"TRN1",evToEbitda:7.9,evToEbit:9.2,evToSales:6.4,pe:9.8,pb:1.65,peg:1.5,fcfYield:10.2},{id:"t2",name:"Transmissora B",ticker:"TRN2",evToEbitda:8.4,evToEbit:9.8,evToSales:6.8,pe:10.6,pb:1.78,peg:1.6,fcfYield:9.4},{id:"t3",name:"Energia Redes C",ticker:"TRN3",evToEbitda:7.3,evToEbit:8.7,evToSales:5.9,pe:8.9,pb:1.48,peg:1.4,fcfYield:11.1}]},r=ye(),d={q1:[5,"Assinaturas B2B recorrentes (ARR) com Net Dollar Retention > 115%."],q2:[4,"SaaS multi-tenant escalável com receita altamente recorrente."],q3:[3,"Crescimento forte, porém sujeito a ciclos de orçamento de TI e IA."],q4:[4,"Reajustes anuais em contratos enterprise com baixo churn."],q5:[5,"Forte lock-in operacional via integrações críticas de fluxo de trabalho."],q6:[4,"Margem bruta de 78% gera forte alavancagem operacional com escala."],q7:[5,"Custo marginal próximo de zero para novos usuários."],q8:[3,"Mercado dinâmico com concorrentes bem capitalizados."],q9:[4,"Ecossistema de APIs e base instalada dificultam novos entrantes."],q10:[3,"Dependência moderada de provedores de nuvem (AWS/GCP)."],q11:[4,"Mais de 12.000 clientes enterprise sem concentração relevante."],q12:[3,"Risco moderado de ferramentas nativas de IA exigindo P&D contínuo."],q13:[4,"Foco orgânico em P&D e recompra oportunística sem diluição excessiva."],q14:[4,"Fundadores mantêm participação relevante no capital."],q15:[4,"Métricas SaaS reportadas trimestralmente com transparência."]};for(const[m,[y,f]]of Object.entries(d))r[m]={score:y,note:f};const g={id:"sample_clps",schemaVersion:H,updatedAt:e,companyName:"CloudPulse Software Inc. (Exemplo USD)",companyTicker:"CLPS",sectorProfile:"tech",currency:"USD",scale:"millions",sharePrice:82,basicShares:118,dilutedShares:124,marketCap:10168,dividendPerShare:0,week52Low:64.5,week52High:96,investmentThesis:"Plataforma SaaS B2B em USD com crescimento de 18%+ a.a., margem bruta de 78%, capital de giro negativo (receita diferida antecipada) e forte conversão de lucro em FCF.",financials:{years:["2021","2022","2023","2024","LTM"],daRecognition:"included_in_opex",cashAndEquivalents:[920,1180,1490,1880,2120],accountsReceivable:[240,295,355,420,460],inventories:[0,0,0,0,0],otherCurrentAssets:[85,100,115,130,145],fixedAssets:[140,165,195,225,245],rightOfUseAssets:[110,120,130,140,145],intangiblesGoodwill:[460,480,510,540,555],nonOperatingAssets:[45,50,55,65,70],otherNonCurrentAssets:[100,110,120,130,140],accountsPayable:[110,130,150,175,190],shortTermDebt:[40,45,50,55,60],otherCurrentLiabilities:[490,610,745,890,975],longTermDebt:[380,380,380,380,380],leaseLiabilities:[120,130,140,150,155],provisions:[25,28,30,35,38],otherNonCurrentLiabilities:[95,107,125,145,162],preferredStock:[0,0,0,0,0],minorityInterest:[0,0,0,0,0],shareholdersEquity:[840,1070,1350,1700,1920],netSales:[1100,1380,1690,2030,2240],cogs:[255,310,372,440,482],sga:[440,535,630,725,785],rd:[235,285,340,400,435],depreciationAmortization:[55,66,78,92,102],financialIncome:[18,35,62,84,92],interestExpense:[19,19,19,19,19],taxes:[32,50,74,102,118],cfo:[295,390,515,645,720],capex:[48,58,68,78,86],cfi:[-60,-70,-82,-95,-105],cff:[-45,-60,-123,-160,-375],dividendsPaid:[0,0,0,0,0],shareRepurchases:[50,75,120,180,220]},qualitative:r,valuationAssumptions:{...pe("nominal_usd"),riskFreeRate:4.25,equityRiskPremium:5,countryRiskPremium:0,betaMode:"direct",leveredBeta:1.15,unleveredBeta:1.11,costOfDebtMode:"synthetic",costOfDebt:5.2,effectiveTaxRate:19,marginalTaxRate:21,projectionYears:8,salesGrowth:[17,15,13.5,12,10.5,9,7.5,6],ebitMarginStart:24.5,ebitMarginTarget:28.5,capexAsPercentOfSales:3.8,depAsPercentOfSales:4.4,nwcAsPercentOfSales:-24,midYearConvention:!0,fcfeTargetDebtRatio:10,terminalMethod:"value_driver",terminalGrowthRate:3,terminalROIC:22,exitEvEbitdaMultiple:16,ddmModel:"gordon",dividendGrowthRate:2.5,ddmHighGrowthRate:5,ddmHighGrowthYears:5},peers:[{id:"c1",name:"SaaS Peer Alpha",ticker:"SAAS1",evToEbitda:21.5,evToEbit:25,evToSales:5.8,pe:34,pb:7.2,peg:2,fcfYield:3.8},{id:"c2",name:"CloudFlow Corp",ticker:"SAAS2",evToEbitda:17.8,evToEbit:21.2,evToSales:4.6,pe:28.5,pb:5.9,peg:1.8,fcfYield:4.5},{id:"c3",name:"EnterpriseOps Inc",ticker:"SAAS3",evToEbitda:15.2,evToEbit:18.5,evToSales:3.9,pe:24,pb:4.8,peg:1.7,fcfYield:5.2},{id:"c4",name:"DataSuite Ltd",ticker:"SAAS4",evToEbitda:19.4,evToEbit:23,evToSales:5.1,pe:30.2,pb:6.4,peg:1.9,fcfYield:4.1}]};return[i,u,g]}const bt="valuationProState";function wt(e){var C,c,b,o,l;const a=String(e.id||`company_${Date.now()}`),t=kt(a,"nominal_brl");if(Number(e.schemaVersion)>=H){const p=e,v=Array.isArray((C=p.financials)==null?void 0:C.years)&&p.financials.years.length>0?p.financials.years:t.financials.years,E=Je(v);E.daRecognition=((c=p.financials)==null?void 0:c.daRecognition)??"included_in_opex";for(const w of Be){const A=(b=p.financials)==null?void 0:b[w];E[w]=v.map((D,F)=>Array.isArray(A)&&Number.isFinite(Number(A[F]))?Number(A[F]):0)}return{...t,...p,schemaVersion:H,financials:E,qualitative:{...ye(),...p.qualitative??{}},valuationAssumptions:{...pe(((o=p.valuationAssumptions)==null?void 0:o.valuationBase)??"nominal_brl"),...p.valuationAssumptions??{},scenarios:{...pe().scenarios,...((l=p.valuationAssumptions)==null?void 0:l.scenarios)??{}}},peers:Array.isArray(p.peers)?p.peers:[]}}const i=new Date().getFullYear(),s=[String(i-3),String(i-2),String(i-1)],n=Je(s),u=e.financials??{};for(const p of Be){const v=u[p];Array.isArray(v)&&(n[p]=s.map((E,w)=>{const A=Number(v[w]);return Number.isFinite(A)?A:0}))}const r=Number(e.sharesOutstanding)||0,d=Number(e.marketCap)||0,g=r>0&&d>0?d/r:0,m=ye(),y=e.qualitative??{};for(const[p,v]of Object.entries(y))if(typeof v=="boolean")m[p]={score:v?4:2,note:""};else if(v&&typeof v=="object"&&"score"in v){const E=v;m[p]={score:Number(E.score)||3,note:String(E.note??"")}}const f=e.valuationAssumptions??{},h=pe("nominal_brl");return Array.isArray(f.salesGrowth)&&(h.salesGrowth=f.salesGrowth.map(p=>Number(p)||0)),Number.isFinite(Number(f.ebitMargin))&&(h.ebitMarginStart=Number(f.ebitMargin),h.ebitMarginTarget=Number(f.ebitMargin)),Number.isFinite(Number(f.taxRate))&&(h.effectiveTaxRate=Number(f.taxRate)),Number.isFinite(Number(f.capexAsPercentOfSales))&&(h.capexAsPercentOfSales=Number(f.capexAsPercentOfSales)),Number.isFinite(Number(f.depAsPercentOfSales))&&(h.depAsPercentOfSales=Number(f.depAsPercentOfSales)),Number.isFinite(Number(f.nwcAsPercentOfSales))&&(h.nwcAsPercentOfSales=Number(f.nwcAsPercentOfSales)),Number.isFinite(Number(f.riskFreeRate))&&(h.riskFreeRate=Number(f.riskFreeRate)),Number.isFinite(Number(f.equityRiskPremium))&&(h.equityRiskPremium=Number(f.equityRiskPremium)),Number.isFinite(Number(f.terminalGrowthRate))&&(h.terminalGrowthRate=Number(f.terminalGrowthRate)),Number.isFinite(Number(f.costOfDebt))&&(h.costOfDebt=Number(f.costOfDebt)),Number.isFinite(Number(f.dividendGrowthRate))&&(h.dividendGrowthRate=Number(f.dividendGrowthRate)),{...t,id:a,schemaVersion:H,updatedAt:new Date().toISOString(),companyName:String(e.companyName||"Empresa Migrada"),companyTicker:String(e.companyTicker||""),basicShares:r,dilutedShares:r,marketCap:d,sharePrice:g,dividendPerShare:Number(e.dividendPerShare)||0,financials:n,qualitative:m,valuationAssumptions:h}}function ht(e){if(!e||typeof e!="object")return{schemaVersion:H,currentCompanyId:null,companies:{}};const a=e,t=a.companies??{},i={};for(const[n,u]of Object.entries(t))u&&typeof u=="object"&&(i[n]=wt({...u,id:n}));const s=typeof a.currentCompanyId=="string"&&i[a.currentCompanyId]?a.currentCompanyId:null;return{schemaVersion:H,currentCompanyId:s,companies:i}}class Qa{constructor(){ge(this,"state");ge(this,"listeners",new Set);ge(this,"lastSavedAt",null);this.state=this.loadFromStorage()}loadFromStorage(){var a;try{const t=(a=globalThis.localStorage)==null?void 0:a.getItem(bt);if(t)return ht(JSON.parse(t))}catch{}return{schemaVersion:H,currentCompanyId:null,companies:{}}}persist(){var a;try{(a=globalThis.localStorage)==null||a.setItem(bt,JSON.stringify(this.state)),this.lastSavedAt=new Date().toISOString()}catch{}}subscribe(a){return this.listeners.add(a),()=>this.listeners.delete(a)}emit(){this.persist();for(const a of this.listeners)a(this.state)}getState(){return this.state}getLastSavedAt(){return this.lastSavedAt}getCurrentCompany(){return this.state.currentCompanyId?this.state.companies[this.state.currentCompanyId]??null:null}setCurrentCompany(a){this.state.currentCompanyId=a&&this.state.companies[a]?a:null,this.emit()}createCompany(){const a=`company_${Date.now()}`,t=kt(a,"nominal_brl");return this.state.companies[a]=t,this.state.currentCompanyId=a,this.emit(),t}updateCurrentCompany(a,t=!1){const i=this.getCurrentCompany();i&&(a(i),i.updatedAt=new Date().toISOString(),t?this.persist():this.emit())}deleteCompany(a){delete this.state.companies[a],this.state.currentCompanyId===a&&(this.state.currentCompanyId=null),this.emit()}deleteAllCompanies(){this.state.companies={},this.state.currentCompanyId=null,this.emit()}loadSampleCompanies(){const a=Ja();for(const t of a)this.state.companies[t.id]=t;return!this.state.currentCompanyId&&a.length>0&&(this.state.currentCompanyId=a[0].id),this.emit(),a.length}exportJSON(a=!1){if(a){const t=this.getCurrentCompany();return JSON.stringify({schemaVersion:H,exportedAt:new Date().toISOString(),companies:t?{[t.id]:t}:{}},null,2)}return JSON.stringify({schemaVersion:H,exportedAt:new Date().toISOString(),companies:this.state.companies},null,2)}importJSON(a){const t=JSON.parse(a);let i=0;if(t.companies&&typeof t.companies=="object"){const s=ht(t);for(const[n,u]of Object.entries(s.companies))this.state.companies[n]=u,i++}else if(t.companyName||t.financials){const s=wt(t);this.state.companies[s.id]=s,i=1}return i>0&&this.emit(),i}}Qe.register(Vt,jt,Gt,_t,zt,Yt,Ht,Ut,Wt,Kt,Jt,Qt);const Le=new Map;function Xa(e){const a=Le.get(e);a&&(a.destroy(),Le.delete(e))}function Za(){for(const e of Le.values())e.destroy();Le.clear()}function Te(e,a){Xa(e);const t=document.getElementById(e);if(!t)return null;const i=t.getContext("2d");if(!i)return null;const s=new Qe(i,a);return Le.set(e,s),s}function Ye(e,a=800,t=360){const i=document.createElement("canvas");i.width=a,i.height=t;const s=i.getContext("2d");if(!s)return"";const n={...e,options:{...e.options??{},responsive:!1,animation:!1}},u=new Qe(s,n),r=u.toBase64Image("image/png",1);return u.destroy(),r}function Dt(e,a){const t=e.bars.map(r=>r.label),i=e.bars.map(r=>[Number(r.low.toFixed(2)),Number(r.high.toFixed(2))]),s=e.bars.map(r=>r.category==="intrinsic"?"rgba(2, 132, 199, 0.78)":r.category==="relative"?"rgba(13, 148, 136, 0.75)":"rgba(100, 116, 139, 0.45)"),n=e.bars.map(r=>r.category==="intrinsic"?"rgb(3, 105, 161)":r.category==="relative"?"rgb(15, 118, 110)":"rgb(71, 85, 105)");return{type:"bar",data:{labels:t,datasets:[{label:"Faixa de Valuation (Mín – Máx)",data:i,backgroundColor:s,borderColor:n,borderWidth:1.5,borderRadius:4,borderSkipped:!1,barPercentage:.62}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,layout:{padding:{top:24,right:16}},plugins:{legend:{display:!1},tooltip:{callbacks:{label:r=>{const d=e.bars[r.dataIndex];return d?`${d.subtitle}: ${k(d.low,a)} – ${k(d.high,a)} (Base: ${k(d.mid,a)})`:""}}}},scales:{x:{beginAtZero:!0,grid:{color:"#e2e8f0"},ticks:{callback:r=>k(Number(r),a,0),font:{family:"JetBrains Mono, monospace",size:11}}},y:{grid:{display:!1},ticks:{font:{family:"Inter, sans-serif",size:12,weight:500},color:"#1e293b"}}}},plugins:[{id:"currentPriceLine",afterDatasetsDraw(r){if(e.currentSharePrice<=0)return;const{ctx:d,chartArea:g,scales:m}=r,y=m.x;if(!y||!g)return;const f=y.getPixelForValue(e.currentSharePrice);if(f<g.left||f>g.right)return;d.save(),d.beginPath(),d.setLineDash([6,4]),d.strokeStyle="#dc2626",d.lineWidth=2,d.moveTo(f,g.top),d.lineTo(f,g.bottom),d.stroke(),d.setLineDash([]),d.fillStyle="#dc2626",d.font="600 11px Inter, sans-serif";const h=`Atual: ${k(e.currentSharePrice,a)}`,C=d.measureText(h).width,c=Math.min(Math.max(f-C/2-5,g.left),g.right-C-10);d.fillStyle="#fef2f2",d.fillRect(c,g.top-20,C+10,18),d.strokeStyle="#fca5a5",d.lineWidth=1,d.strokeRect(c,g.top-20,C+10,18),d.fillStyle="#b91c1c",d.fillText(h,c+5,g.top-7),d.restore()}}]}}function Tt(e,a){return{type:"radar",data:{labels:e,datasets:[{label:"Score Qualitativo (1–5)",data:a,fill:!0,backgroundColor:"rgba(2, 132, 199, 0.18)",borderColor:"rgb(2, 132, 199)",pointBackgroundColor:"rgb(2, 132, 199)",pointBorderColor:"#ffffff",pointRadius:4,borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{r:{min:0,max:5,ticks:{stepSize:1,backdropColor:"transparent"},grid:{color:"#e2e8f0"},angleLines:{color:"#cbd5e1"},pointLabels:{font:{family:"Inter, sans-serif",size:12,weight:600},color:"#1e293b"}}},plugins:{legend:{display:!1}}}}}function q(e,a){const t=Ka[a??e];return t?`<span class="tooltip">${x(e)}<span class="tooltiptext">${x(t)}</span></span>`:x(e)}function z(e){return e===null||!Number.isFinite(e)?'<span class="badge badge-info">Sem preço atual</span>':e>=15?`<span class="badge badge-positive">Upside ${S(e,1,!0)}</span>`:e>=-5?`<span class="badge badge-warning">Justo (${S(e,1,!0)})</span>`:`<span class="badge badge-danger">Downside ${S(e,1,!0)}</span>`}function ot(e){return e.length===0?"":`
    <div class="alerts-stack">
      ${e.map(a=>`
        <div class="alert-box ${a.severity}">
          <div>
            <div class="alert-title">${x(a.title)}</div>
            <div>${x(a.message)}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `}function te(e){const a=document.getElementById("custom-modal"),t=document.getElementById("modal-title"),i=document.getElementById("modal-message"),s=document.getElementById("modal-actions");if(!a||!t||!i||!s)return;t.textContent=e.title??"ValuationPRO",i.textContent=e.message,s.innerHTML="";const n=()=>a.classList.add("hidden");if(e.onConfirm){const u=document.createElement("button");u.type="button",u.className="btn btn-secondary",u.textContent="Cancelar",u.addEventListener("click",n);const r=document.createElement("button");r.type="button",r.className=`btn ${e.danger?"btn-danger":"btn-primary"}`,r.textContent=e.confirmText??"Confirmar",r.addEventListener("click",()=>{var d;n(),(d=e.onConfirm)==null||d.call(e)}),s.appendChild(u),s.appendChild(r)}else{const u=document.createElement("button");u.type="button",u.className="btn btn-primary",u.textContent="OK",u.addEventListener("click",n),s.appendChild(u)}a.classList.remove("hidden")}const ei="modulepreload",ti=function(e,a){return new URL(e,a).href},gt={},ft=function(a,t,i){let s=Promise.resolve();if(t&&t.length>0){let u=function(m){return Promise.all(m.map(y=>Promise.resolve(y).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const r=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),g=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));s=u(t.map(m=>{if(m=ti(m,i),m in gt)return;gt[m]=!0;const y=m.endsWith(".css"),f=y?'[rel="stylesheet"]':"";if(!!i)for(let c=r.length-1;c>=0;c--){const b=r[c];if(b.href===m&&(!y||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${m}"]${f}`))return;const C=document.createElement("link");if(C.rel=y?"stylesheet":ei,y||(C.as="script"),C.crossOrigin="",C.href=m,g&&C.setAttribute("nonce",g),document.head.appendChild(C),y)return new Promise((c,b)=>{C.addEventListener("load",c),C.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${m}`)))})}))}function n(u){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=u,window.dispatchEvent(r),!r.defaultPrevented)throw u}return s.then(u=>{for(const r of u||[])r.status==="rejected"&&n(r.reason);return a().catch(n)})};async function ai(e,a){const[{default:t},{jsPDF:i}]=await Promise.all([ft(()=>import("./html2canvas.esm-QH1iLAAe.js"),[],import.meta.url),ft(()=>import("./jspdf.es.min-DwSUbdvo.js").then(c=>c.j),[],import.meta.url)]),s=(a||"Relatorio_Valuation").replace(/[^a-zA-Z0-9_-]/g,"_"),n=await t(e,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1}),u=n.toDataURL("image/png"),r=new i("p","mm","a4"),d=r.internal.pageSize.getWidth(),g=r.internal.pageSize.getHeight(),m=8,y=d-m*2,f=n.height*y/n.width;let h=f,C=m;for(r.addImage(u,"PNG",m,C,y,f),h-=g-m*2;h>0;)r.addPage(),C=m-(f-h),r.addImage(u,"PNG",m,C,y,f),h-=g-m*2;r.save(`${s}_valuation_report.pdf`)}function Ft(e,a){const t=new Blob([e],{type:"application/json;charset=utf-8"}),i=URL.createObjectURL(t),s=document.createElement("a");s.href=i,s.download=a,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)}function ii(e,a,t){var r,d,g,m,y,f,h,C;const i=Object.values(a.getState().companies);e.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Painel de Análises</h1>
        <p class="page-subtitle">Gerencie seus modelos de valuation, carregue empresas de exemplo ou importe backups JSON.</p>
      </div>
      <div class="btn-group">
        <button id="dash-new-btn" class="btn btn-primary" type="button">
          <i data-lucide="plus-circle"></i> Nova Análise
        </button>
        <button id="dash-samples-btn" class="btn btn-secondary" type="button">
          <i data-lucide="sparkles"></i> Carregar Exemplos
        </button>
        <button id="dash-import-json-btn" class="btn btn-secondary" type="button">
          <i data-lucide="upload"></i> Importar JSON
        </button>
        ${i.length>0?`<button id="dash-export-json-btn" class="btn btn-secondary" type="button">
                <i data-lucide="download"></i> Backup JSON
               </button>
               <button id="dash-delete-all-btn" class="btn btn-ghost" type="button" style="color: var(--danger-text);">
                <i data-lucide="trash-2"></i> Limpar Tudo
               </button>`:""}
        <input id="dash-json-file-input" type="file" accept=".json,application/json" style="display:none;" />
      </div>
    </div>

    ${i.length===0?`
      <div class="card" style="text-align: center; padding: 48px 24px;">
        <h2 style="margin: 0 0 8px; font-size: 18px;">Nenhuma análise cadastrada ainda</h2>
        <p style="color: var(--text-secondary); max-width: 540px; margin: 0 auto 22px;">
          Inicie uma nova análise do zero com premissas padrão do mercado brasileiro (BRL) ou carregue 3 empresas de exemplo (Indústria BR, Utilities BR e SaaS USD) para explorar todos os modelos imediatamente.
        </p>
        <div class="btn-group" style="justify-content: center;">
          <button id="dash-empty-samples-btn" class="btn btn-primary" type="button">
            <i data-lucide="sparkles"></i> Carregar 3 Empresas de Exemplo
          </button>
          <button id="dash-empty-new-btn" class="btn btn-secondary" type="button">
            <i data-lucide="plus"></i> Criar Empresa em Branco
          </button>
        </div>
      </div>
    `:`
      <div class="grid-3" id="company-cards-grid">
        ${i.map(c=>{const b=ie(c.financials),o=je(c.financials,c.valuationAssumptions.marginalTaxRate,c.valuationAssumptions.includeLeasesInDebt)[b]??0,l=Se(c.financials)[b]??0,p=G(c),v=p.valid?k(p.valuePerShare,c.currency):"—",E=p.valid?z(p.upsidePercent):"";return`
            <article class="company-card" data-company-id="${x(c.id)}">
              <div class="company-card-top">
                <div>
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                    <span class="ticker-badge">${x(c.companyTicker||"N/A")}</span>
                    <span style="font-size:11.5px; color:var(--text-muted);">${x(c.currency)}</span>
                  </div>
                  <h3 style="margin:0; font-size:15.5px; font-weight:700;">${x(c.companyName)}</h3>
                  <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">${x(rt[c.sectorProfile])}</div>
                </div>
                <button class="btn btn-ghost btn-sm" data-action="delete" type="button" title="Excluir análise" style="color: var(--text-muted);">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
              <div>${E}</div>
              <div class="company-card-metrics">
                <div>
                  <div class="mini-stat-label">DCF Justo</div>
                  <div class="mini-stat-val" style="color:var(--brand-700);">${v}</div>
                </div>
                <div>
                  <div class="mini-stat-label">ROIC</div>
                  <div class="mini-stat-val" style="color:${o>=15?"var(--positive-text)":"var(--text-primary)"};">${S(o,1)}</div>
                </div>
                <div>
                  <div class="mini-stat-label">ROE</div>
                  <div class="mini-stat-val">${S(l,1)}</div>
                </div>
              </div>
            </article>
          `}).join("")}
      </div>
    `}
  `;const s=()=>{a.createCompany(),t("data-input")},n=()=>{const c=a.loadSampleCompanies();te({title:"Exemplos carregados",message:`${c} empresas de exemplo (ALFA3, THOR11 e CLPS) foram carregadas. Clique em qualquer card para explorar todos os modelos.`})};(r=e.querySelector("#dash-new-btn"))==null||r.addEventListener("click",s),(d=e.querySelector("#dash-empty-new-btn"))==null||d.addEventListener("click",s),(g=e.querySelector("#dash-samples-btn"))==null||g.addEventListener("click",n),(m=e.querySelector("#dash-empty-samples-btn"))==null||m.addEventListener("click",n);const u=e.querySelector("#dash-json-file-input");(y=e.querySelector("#dash-import-json-btn"))==null||y.addEventListener("click",()=>{u==null||u.click()}),u==null||u.addEventListener("change",async()=>{var b;const c=(b=u.files)==null?void 0:b[0];if(c)try{const o=await c.text(),l=a.importJSON(o);te({title:"Importação concluída",message:`${l} análise(s) importada(s) com sucesso.`})}catch{te({title:"Erro na importação",message:"O arquivo selecionado não é um backup JSON válido do ValuationPRO."})}}),(f=e.querySelector("#dash-export-json-btn"))==null||f.addEventListener("click",()=>{const c=a.exportJSON(!1);Ft(c,`ValuationPRO_backup_${new Date().toISOString().slice(0,10)}.json`)}),(h=e.querySelector("#dash-delete-all-btn"))==null||h.addEventListener("click",()=>{te({title:"Excluir todas as análises",message:"Tem certeza que deseja excluir todas as análises salvas localmente? Esta ação não pode ser desfeita.",confirmText:"Excluir tudo",danger:!0,onConfirm:()=>a.deleteAllCompanies()})}),(C=e.querySelector("#company-cards-grid"))==null||C.addEventListener("click",c=>{const b=c.target,o=b.closest("[data-company-id]");if(!o)return;const l=o.dataset.companyId;if(b.closest('[data-action="delete"]')){te({title:"Excluir análise",message:"Deseja remover permanentemente esta análise?",confirmText:"Excluir",danger:!0,onConfirm:()=>a.deleteCompany(l)});return}a.setCurrentCompany(l),t("valuation")})}function Ot(e){const a=e.financials.years,t=[];t.push(["Chave","Metrica",...a].map(r=>`"${r}"`).join(","));for(const r of Oe){t.push(`"","--- ${r.title} ---",${a.map(()=>'""').join(",")}`);for(const d of r.items){const g=e.financials[d.key]??[];t.push(`"${d.key}","${d.label}",${a.map((m,y)=>g[y]??0).join(",")}`)}}const i=new Blob(["\uFEFF"+t.join(`
`)],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(i),n=document.createElement("a"),u=(e.companyTicker||e.companyName||"empresa").replace(/[^a-zA-Z0-9_-]/g,"_");n.href=s,n.download=`${u}_financials.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(s)}function si(e,a){const t=a.replace(/^\uFEFF/,"").split(/\r?\n/).map(h=>h.trim()).filter(Boolean);if(t.length<2)return{updatedFields:0,yearsDetected:0};const s=(h=>h.includes("	")?"	":h.includes(";")?";":",")(t[0]),n=h=>{const C=[];let c="",b=!1;for(let o=0;o<h.length;o++){const l=h[o];l==='"'?b=!b:l===s&&!b?(C.push(c.trim()),c=""):c+=l}return C.push(c.trim()),C},u=n(t[0]),r=u[0].toLowerCase()==="chave"||u[0].toLowerCase()==="key",d=r?2:1,g=u.slice(d).filter(Boolean);if(g.length>=2&&g.length<=6){e.financials.years=g;for(const h of Oe)for(const C of h.items)e.financials[C.key]=g.map((c,b)=>e.financials[C.key][b]??0)}const m=new Map,y=new Set;for(const h of Oe)for(const C of h.items)y.add(C.key),m.set(C.label.toLowerCase(),C.key);let f=0;for(let h=1;h<t.length;h++){const C=n(t[h]);let c;if(r&&y.has(C[0]))c=C[0];else{const l=(r?C[1]:C[0]??"").toLowerCase();c=m.get(l)}if(!c)continue;const b=C.slice(d),o=e.financials.years.length;e.financials[c]=Array.from({length:o},(l,p)=>p<b.length?j(b[p],0):0),f++}return{updatedFields:f,yearsDetected:e.financials.years.length}}function ni(e,a){var g,m,y,f,h,C;const t=a.getCurrentCompany();if(!t)return;const i=t.financials,s=Ke(i),n=ne[t.scale].shortLabel||"unid.",u=We[t.currency].symbol;e.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Dados Financeiros & Mercado</h1>
        <p class="page-subtitle">Configure moeda, escala (${x(ne[t.scale].label)}) e demonstrativos históricos (3 a 6 períodos).</p>
      </div>
      <div class="btn-group">
        <button id="sync-dcf-btn" class="btn btn-primary" type="button" title="Preenche margem EBIT, alíquota efetiva, CAPEX %, D&A % e NWC % no DCF com as médias históricas desta empresa">
          <i data-lucide="refresh-cw"></i> Sincronizar Premissas DCF
        </button>
        <button id="import-csv-btn" class="btn btn-secondary" type="button">
          <i data-lucide="file-up"></i> Importar CSV
        </button>
        <button id="export-csv-inline-btn" class="btn btn-secondary" type="button">
          <i data-lucide="file-spreadsheet"></i> Exportar CSV
        </button>
        <input id="csv-file-input" type="file" accept=".csv,.txt,text/csv" style="display:none;" />
      </div>
    </div>

    <!-- General & Market Info -->
    <section class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Informações Gerais, Escala & Mercado</h2>
          <p class="card-subtitle">Ações e demonstrativos devem estar na mesma escala (${x(ne[t.scale].label)}). Preço e Dividendo são por ação.</p>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom: 14px;">
        <div class="field">
          <label>Nome da Empresa</label>
          <input class="input" type="text" data-general="companyName" value="${x(t.companyName)}" />
        </div>
        <div class="field">
          <label>Ticker</label>
          <input class="input mono" type="text" data-general="companyTicker" value="${x(t.companyTicker)}" placeholder="Ex: WEGE3, AAPL" />
        </div>
        <div class="field">
          <label>Perfil Setorial</label>
          <select class="select" data-general="sectorProfile">
            ${Object.entries(rt).map(([c,b])=>`<option value="${c}" ${t.sectorProfile===c?"selected":""}>${x(b)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Moeda & Escala</label>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
            <select class="select" data-general="currency">
              ${Object.entries(We).map(([c,b])=>`<option value="${c}" ${t.currency===c?"selected":""}>${c} (${b.symbol})</option>`).join("")}
            </select>
            <select class="select" data-general="scale">
              ${Object.entries(ne).map(([c,b])=>`<option value="${c}" ${t.scale===c?"selected":""}>${x(b.label)}</option>`).join("")}
            </select>
          </div>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom: 14px;">
        <div class="field">
          <label>Preço Atual da Ação (${u})</label>
          <input class="input num-input" type="number" step="0.01" data-general="sharePrice" value="${t.sharePrice}" />
        </div>
        <div class="field">
          <label>Ações Básicas (${n})</label>
          <input class="input num-input" type="number" step="0.01" data-general="basicShares" value="${t.basicShares}" />
        </div>
        <div class="field">
          <label>Ações Diluídas (${n})</label>
          <input class="input num-input" type="number" step="0.01" data-general="dilutedShares" value="${t.dilutedShares}" />
          <span class="field-hint">Usado no preço justo (inclui opções/RSUs)</span>
        </div>
        <div class="field">
          <label>Valor de Mercado (${u} ${n})</label>
          <input class="input num-input" type="number" step="0.01" data-general="marketCap" value="${Number(t.marketCap.toFixed(2))}" />
          <span class="field-hint">Sincronizado com Preço × Ações Diluídas</span>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom: 14px;">
        <div class="field">
          <label>Dividendo por Ação D0 (${u})</label>
          <input class="input num-input" type="number" step="0.01" data-general="dividendPerShare" value="${t.dividendPerShare}" />
        </div>
        <div class="field">
          <label>Mínima 52 Semanas (${u})</label>
          <input class="input num-input" type="number" step="0.01" data-general="week52Low" value="${t.week52Low}" />
        </div>
        <div class="field">
          <label>Máxima 52 Semanas (${u})</label>
          <input class="input num-input" type="number" step="0.01" data-general="week52High" value="${t.week52High}" />
        </div>
        <div class="field">
          <label>Tratamento de D&A na DRE</label>
          <select class="select" id="da-recognition-select">
            <option value="included_in_opex" ${i.daRecognition==="included_in_opex"?"selected":""}>Embutida no CPV/SG&A (DRE por Função)</option>
            <option value="separate" ${i.daRecognition==="separate"?"selected":""}>Lançada Separadamente (DRE por Natureza)</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label>Tese de Investimento (Resumo Executivo)</label>
        <textarea class="textarea" data-general="investmentThesis" placeholder="Descreva os principais drivers de valor, vantagens competitivas e riscos-chave da empresa...">${x(t.investmentThesis)}</textarea>
      </div>
    </section>

    <!-- Period Control + Balance Sheet Check -->
    <section class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Períodos Históricos & Conferência Contábil</h2>
          <p class="card-subtitle">Verificação automática de fechamento: Ativo Total = Passivo + Patrimônio Líquido.</p>
        </div>
        <div class="btn-group">
          <button id="add-period-btn" class="btn btn-secondary btn-sm" type="button" ${i.years.length>=6?"disabled":""}>
            <i data-lucide="plus"></i> Adicionar Período
          </button>
          <button id="remove-period-btn" class="btn btn-secondary btn-sm" type="button" ${i.years.length<=3?"disabled":""}>
            <i data-lucide="minus"></i> Remover Primeiro
          </button>
        </div>
      </div>

      <div class="grid-auto" id="bs-check-strip">
        ${s.map(c=>`
          <div class="kpi-tile" style="padding:10px 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="kpi-label">${x(c.year)}</span>
              <span class="badge ${c.isBalanced?"badge-positive":"badge-warning"}">${c.isBalanced?"Fechado":`Dif: ${R(c.diff,1)}`}</span>
            </div>
            <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;" class="mono">
              Ativo: ${R(c.totalAssets,1)} | P+PL: ${R(c.totalLiabilitiesAndEquity,1)}
            </div>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- Financial Tables -->
    ${Oe.map(c=>`
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">${x(c.title)} <span style="font-size:12px; font-weight:500; color:var(--text-muted);">(${u} ${n})</span></h2>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th style="min-width: 260px;">Conta / Métrica</th>
                ${i.years.map((b,o)=>`
                  <th>
                    <input class="table-cell-input" data-year-label="${o}" value="${x(b)}" style="font-weight:700; text-transform:uppercase; min-width:70px;" />
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              ${c.items.map(b=>`
                <tr>
                  <td>
                    <div>${b.hint?q(b.label):x(b.label)}</div>
                    ${b.hint?`<div style="font-size:11px; color:var(--text-muted); font-weight:400;">${x(b.hint)}</div>`:""}
                  </td>
                  ${i.years.map((o,l)=>{var p;return`
                    <td>
                      <input
                        class="table-cell-input"
                        type="number"
                        step="0.01"
                        data-metric="${b.key}"
                        data-period="${l}"
                        value="${((p=i[b.key])==null?void 0:p[l])??0}"
                      />
                    </td>
                  `}).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `).join("")}
  `,e.querySelectorAll("[data-general]").forEach(c=>{const b=c.dataset.general,o=c.tagName==="SELECT"?"change":"input";c.addEventListener(o,()=>{a.updateCurrentCompany(l=>{if(b==="companyName")l.companyName=c.value;else if(b==="companyTicker")l.companyTicker=c.value.toUpperCase();else if(b==="sectorProfile")l.sectorProfile=c.value;else if(b==="currency")l.currency=c.value;else if(b==="scale")l.scale=c.value;else if(b==="investmentThesis")l.investmentThesis=c.value;else if(b==="sharePrice"){l.sharePrice=j(c.value,0);const p=l.dilutedShares>0?l.dilutedShares:l.basicShares;if(p>0){l.marketCap=l.sharePrice*p;const v=e.querySelector('[data-general="marketCap"]');v&&(v.value=String(Number(l.marketCap.toFixed(2))))}}else if(b==="basicShares"){if(l.basicShares=j(c.value,0),l.dilutedShares===0){l.dilutedShares=l.basicShares;const p=e.querySelector('[data-general="dilutedShares"]');p&&(p.value=String(l.dilutedShares))}}else if(b==="dilutedShares"){if(l.dilutedShares=j(c.value,0),l.sharePrice>0&&l.dilutedShares>0){l.marketCap=l.sharePrice*l.dilutedShares;const p=e.querySelector('[data-general="marketCap"]');p&&(p.value=String(Number(l.marketCap.toFixed(2))))}}else if(b==="marketCap"){l.marketCap=j(c.value,0);const p=l.dilutedShares>0?l.dilutedShares:l.basicShares;if(p>0){l.sharePrice=l.marketCap/p;const v=e.querySelector('[data-general="sharePrice"]');v&&(v.value=String(Number(l.sharePrice.toFixed(2))))}}else b==="dividendPerShare"?l.dividendPerShare=j(c.value,0):b==="week52Low"?l.week52Low=j(c.value,0):b==="week52High"&&(l.week52High=j(c.value,0))},c.tagName!=="SELECT")})}),(g=e.querySelector("#da-recognition-select"))==null||g.addEventListener("change",c=>{const b=c.target.value;a.updateCurrentCompany(o=>{o.financials.daRecognition=b})}),e.querySelectorAll("[data-year-label]").forEach(c=>{c.addEventListener("change",()=>{const b=Number(c.dataset.yearLabel);a.updateCurrentCompany(o=>{o.financials.years[b]=c.value.trim()||`Ano ${b+1}`})})});const r=()=>{const c=a.getCurrentCompany(),b=e.querySelector("#bs-check-strip");if(!c||!b)return;const o=Ke(c.financials);b.innerHTML=o.map(l=>`
      <div class="kpi-tile" style="padding:10px 12px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="kpi-label">${x(l.year)}</span>
          <span class="badge ${l.isBalanced?"badge-positive":"badge-warning"}">${l.isBalanced?"Fechado":`Dif: ${R(l.diff,1)}`}</span>
        </div>
        <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;" class="mono">
          Ativo: ${R(l.totalAssets,1)} | P+PL: ${R(l.totalLiabilitiesAndEquity,1)}
        </div>
      </div>
    `).join("")};e.querySelectorAll("[data-metric]").forEach(c=>{c.addEventListener("input",()=>{const b=c.dataset.metric,o=Number(c.dataset.period),l=j(c.value,0);a.updateCurrentCompany(p=>{p.financials[b][o]=l},!0),r()})}),(m=e.querySelector("#add-period-btn"))==null||m.addEventListener("click",()=>{a.updateCurrentCompany(c=>{if(c.financials.years.length>=6)return;const b=c.financials.years[c.financials.years.length-1],o=b==="LTM"?"LTM+1":String((Number.parseInt(b,10)||2024)+1);c.financials.years.push(o);for(const l of Be){const p=c.financials[l];p.push(p[p.length-1]??0)}})}),(y=e.querySelector("#remove-period-btn"))==null||y.addEventListener("click",()=>{a.updateCurrentCompany(c=>{if(!(c.financials.years.length<=3)){c.financials.years.shift();for(const b of Be)c.financials[b].shift()}})}),(f=e.querySelector("#sync-dcf-btn"))==null||f.addEventListener("click",()=>{a.updateCurrentCompany(c=>{const b=za(c.financials,c.valuationAssumptions.marginalTaxRate,c.valuationAssumptions.includeLeasesInDebt);c.valuationAssumptions.ebitMarginStart=b.ebitMargin,c.valuationAssumptions.ebitMarginTarget=b.ebitMargin,c.valuationAssumptions.effectiveTaxRate=b.effectiveTaxRate,c.valuationAssumptions.capexAsPercentOfSales=b.capexPercentSales,c.valuationAssumptions.depAsPercentOfSales=b.depPercentSales,c.valuationAssumptions.nwcAsPercentOfSales=b.nwcPercentSales,b.roic>5&&b.roic<35&&(c.valuationAssumptions.terminalROIC=b.roic)}),te({title:"Premissas DCF sincronizadas",message:"Margem EBIT, alíquota efetiva, CAPEX (% vendas), D&A (% vendas), Capital de Giro (% vendas) e ROIC terminal foram atualizados com as médias históricas reais da empresa."})}),(h=e.querySelector("#export-csv-inline-btn"))==null||h.addEventListener("click",()=>{const c=a.getCurrentCompany();c&&Ot(c)});const d=e.querySelector("#csv-file-input");(C=e.querySelector("#import-csv-btn"))==null||C.addEventListener("click",()=>d==null?void 0:d.click()),d==null||d.addEventListener("change",async()=>{var l;const c=(l=d.files)==null?void 0:l[0];if(!c)return;const b=await c.text();let o={updatedFields:0,yearsDetected:0};a.updateCurrentCompany(p=>{o=si(p,b)}),te({title:"Importação CSV",message:o.updatedFields>0?`${o.updatedFields} linha(s) contábil(is) importada(s) ao longo de ${o.yearsDetected} período(s).`:"Nenhuma conta reconhecida no CSV. Exporte um CSV modelo primeiro para ver o formato esperado."})})}function ri(e,a){const t=a.getCurrentCompany();if(!t)return;const i=t.financials,s=t.valuationAssumptions,n=i.years,u=ie(i),r=oe(t),d=je(i,s.marginalTaxRate,s.includeLeasesInDebt),g=Se(i),m=Fa(i),y=Ba(i),f=_a(i),h=at(t),C=d[u]??0,c=C-r.wacc,b=we(i.netSales),o=we(xe(i)),l=we(X(i)),p=we(me(i)),v=[{id:"profitability",title:"Rentabilidade & Criação de Valor",rows:[{label:"ROIC",tooltipKey:"ROIC",values:d,unit:"%"},{label:"ROE",tooltipKey:"ROE",values:g,unit:"%"},{label:"ROA (Ajustado por IR)",tooltipKey:"ROA",values:Oa(i,s.marginalTaxRate),unit:"%"},{label:"ROCE",tooltipKey:"ROCE",values:La(i),unit:"%"},{label:"Margem Bruta",tooltipKey:"Margem Bruta",values:ka(i),unit:"%"},{label:"Margem EBITDA",tooltipKey:"Margem EBITDA",values:wa(i),unit:"%"},{label:"Margem EBIT",tooltipKey:"Margem EBIT",values:Fe(i),unit:"%"},{label:"Margem Líquida",tooltipKey:"Margem Líquida",values:Da(i),unit:"%"},{label:"Margem FCO",values:Ta(i),unit:"%"},{label:"Margem FCF",tooltipKey:"Margem FCF",values:m,unit:"%"}]},{id:"stability",title:"Estrutura de Capital, Crédito & Liquidez",rows:[{label:"Índice de Capital Próprio",values:Ia(i),unit:"%"},{label:"Alavancagem (Dív. Líq. / PL)",values:qa(i,s.includeLeasesInDebt),unit:"x"},{label:"Dívida Líquida / EBITDA",tooltipKey:"Dívida Líquida / EBITDA",values:mt(i,s.includeLeasesInDebt),unit:"x"},{label:"Cobertura de Juros (EBIT / Juros)",tooltipKey:"Cobertura de Juros",values:St(i),unit:"x"},{label:"Liquidez Corrente",values:vt(i),unit:"x"},{label:"Liquidez Seca",values:ja(i),unit:"x"},{label:"CAPEX / FCO",values:Na(i),unit:"%"}]},{id:"working-capital",title:"Capital de Giro & Qualidade dos Lucros",rows:[{label:"Prazo Médio Recebimento (DSO)",values:Pt(i),unit:" d"},{label:"Prazo Médio Estoque (DIO)",values:Et(i),unit:" d"},{label:"Prazo Médio Pagamento (DPO)",values:$t(i),unit:" d"},{label:"Ciclo de Conversão de Caixa (CCC)",tooltipKey:"Ciclo de Conversão de Caixa",values:Ga(i),unit:" d"},{label:"FCO / EBITDA",values:Va(i),unit:"%"},{label:"Conversão FCF / Lucro Líquido",tooltipKey:"Conversão FCF / LL",values:y,unit:"%"}]}];e.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Análise Fundamentalista & Índices Chave</h1>
        <p class="page-subtitle">Criação de valor (ROIC vs. WACC), decomposição DuPont, qualidade dos lucros, ciclo de caixa e retorno ao acionista.</p>
      </div>
    </div>

    <!-- Executive KPI Strip -->
    <div class="grid-4" style="margin-bottom: 20px;">
      <div class="kpi-tile primary">
        <span class="kpi-label">${q("ROIC vs. WACC (Spread)","ROIC")}</span>
        <span class="kpi-value ${c>=0?"positive":"negative"}">${S(c,1,!0)}</span>
        <span class="kpi-sub">ROIC ${S(C,1)} | WACC ${S(r.wacc,1)}</span>
      </div>
      <div class="kpi-tile">
        <span class="kpi-label">CAGR Receita / EBITDA</span>
        <span class="kpi-value">${b!==null?S(b,1):"—"}</span>
        <span class="kpi-sub">EBITDA: ${o!==null?S(o,1):"—"} | LL: ${l!==null?S(l,1):"—"}</span>
      </div>
      <div class="kpi-tile">
        <span class="kpi-label">${q("Conversão FCF / LL","Conversão FCF / LL")}</span>
        <span class="kpi-value">${S(y[u]??0,1)}</span>
        <span class="kpi-sub">Margem FCF: ${S(m[u]??0,1)} | CAGR FCF: ${p!==null?S(p,1):"—"}</span>
      </div>
      <div class="kpi-tile">
        <span class="kpi-label">${q("Total Shareholder Yield","Total Shareholder Yield")}</span>
        <span class="kpi-value brand">${S(h.totalShareholderYield,2)}</span>
        <span class="kpi-sub">DY ${S(h.dividendYield,1)} + Buyback ${S(h.buybackYield,1)} | g sust. ${S(h.sustainableGrowthRate,1)}</span>
      </div>
    </div>

    <!-- Main Ratio Sections -->
    ${v.map(A=>`
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">${x(A.title)}</h2>
        </div>
        <div class="grid-2" style="align-items: start;">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Indicador</th>
                  ${n.map(D=>`<th>${x(D)}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${A.rows.map(D=>`
                  <tr>
                    <td>${D.tooltipKey?q(D.label,D.tooltipKey):x(D.label)}</td>
                    ${D.values.map(F=>`<td>${Number.isFinite(F)?`${R(F,2)}${D.unit}`:"—"}</td>`).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div class="chart-box">
            <canvas id="ratios-chart-${A.id}"></canvas>
          </div>
        </div>
      </section>
    `).join("")}

    <!-- DuPont & Shareholder Returns -->
    <div class="grid-2">
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Decomposição DuPont do ROE (3 Etapas)</h2>
            <p class="card-subtitle">ROE = Margem Líquida × Giro do Ativo × Alavancagem Financeira</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Componente</th>
                ${n.map(A=>`<th>${x(A)}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Margem Líquida (%)</td>
                ${f.map(A=>`<td>${S(A.netMargin,2)}</td>`).join("")}
              </tr>
              <tr>
                <td>Giro do Ativo (x)</td>
                ${f.map(A=>`<td>${R(A.assetTurnover,2)}x</td>`).join("")}
              </tr>
              <tr>
                <td>Multiplicador de Alavancagem (x)</td>
                ${f.map(A=>`<td>${R(A.equityMultiplier,2)}x</td>`).join("")}
              </tr>
              <tr class="row-highlight">
                <td>ROE Resultante (%)</td>
                ${f.map(A=>`<td>${S(A.roe,2)}</td>`).join("")}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Alocação de Capital & Retorno ao Acionista</h2>
            <p class="card-subtitle">Análise de Payout, Recompras e Crescimento Sustentável (último período)</p>
          </div>
        </div>
        <div class="grid-2">
          <div class="kpi-tile">
            <span class="kpi-label">Payout (% Lucro Líquido)</span>
            <span class="kpi-value">${S(h.payoutRatio,1)}</span>
            <span class="kpi-sub">Payout (% FCF): ${S(h.fcfPayoutRatio,1)}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Cresc. Sustentável (g)</span>
            <span class="kpi-value">${S(h.sustainableGrowthRate,1)}</span>
            <span class="kpi-sub">ROE × (1 − Payout)</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Dividend Yield</span>
            <span class="kpi-value">${S(h.dividendYield,2)}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Buyback Yield</span>
            <span class="kpi-value">${S(h.buybackYield,2)}</span>
          </div>
        </div>
      </section>
    </div>
  `,Te("ratios-chart-profitability",{type:"line",data:{labels:n,datasets:[{label:"ROIC (%)",data:d,borderColor:"#0284c7",backgroundColor:"rgba(2, 132, 199, 0.12)",tension:.25,borderWidth:2.5},{label:"ROE (%)",data:g,borderColor:"#059669",tension:.25,borderWidth:2},{label:"Margem EBIT (%)",data:Fe(i),borderColor:"#d97706",tension:.25,borderWidth:2},{label:"WACC (%)",data:n.map(()=>r.wacc),borderColor:"#dc2626",borderDash:[5,4],pointRadius:0,borderWidth:1.8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}},scales:{y:{ticks:{callback:A=>`${A}%`}}}}}),Te("ratios-chart-stability",{type:"bar",data:{labels:n,datasets:[{label:"Dívida Líq. / EBITDA (x)",data:mt(i,s.includeLeasesInDebt),backgroundColor:"rgba(2, 132, 199, 0.75)",borderRadius:4},{label:"Liquidez Corrente (x)",data:vt(i),backgroundColor:"rgba(13, 148, 136, 0.72)",borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}});const E=re(i),w=me(i);Te("ratios-chart-working-capital",{type:"bar",data:{labels:n,datasets:[{label:"Receita Líquida",data:i.netSales,backgroundColor:"rgba(148, 163, 184, 0.55)",borderRadius:4},{label:"EBIT",data:E,backgroundColor:"rgba(2, 132, 199, 0.8)",borderRadius:4},{label:"FCF (FCO − CAPEX)",data:w,backgroundColor:"rgba(5, 150, 105, 0.8)",borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}})}function oi(e){return e>=4.2?{label:"Qualidade Excepcional (Wide Moat)",badgeClass:"badge-positive"}:e>=3.5?{label:"Boa Qualidade (Narrow Moat)",badgeClass:"badge-info"}:e>=2.6?{label:"Qualidade Moderada / Neutra",badgeClass:"badge-warning"}:{label:"Frágil / Sem Moat Evidente",badgeClass:"badge-danger"}}function li(e,a){const t=a.getCurrentCompany();if(!t)return;const i=st(t),s=oi(i.overallScore),n=nt(t).filter(r=>r.category==="qualitative"||r.category==="sector"),u=Object.entries(_e);e.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Análise Qualitativa (Narrative & Numbers)</h1>
        <p class="page-subtitle">Avalie cada critério de 1 (muito fraco) a 5 (excelente) com evidências. O sistema verifica a coerência entre sua tese qualitativa e as premissas do DCF.</p>
      </div>
    </div>

    ${ot(n)}

    <div class="grid-2" style="margin-bottom: 18px;">
      <section class="card" style="margin-bottom: 0;">
        <div class="card-header">
          <div>
            <h2 class="card-title">Scorecard Consolidado</h2>
            <p class="card-subtitle">Média ponderada igualitária entre os 4 pilares estratégicos</p>
          </div>
          <span class="badge ${s.badgeClass}">${s.label}</span>
        </div>
        <div style="display:flex; align-items:baseline; gap:12px; margin-bottom:16px;">
          <span class="kpi-value brand" style="font-size:36px;">${R(i.overallScore,2)}</span>
          <span style="color:var(--text-muted); font-weight:600;">/ 5,00 (${i.answeredCount}/${i.totalCount} critérios)</span>
        </div>
        <div class="grid-2">
          ${u.map(([r,d])=>{const g=i.pillarScores[r]??0;return`
              <div class="kpi-tile">
                <span class="kpi-label">${x(d.title)}</span>
                <span class="kpi-value" style="font-size:18px;">${R(g,2)} <span style="font-size:12px; color:var(--text-muted);">/ 5</span></span>
              </div>
            `}).join("")}
        </div>
      </section>

      <section class="card" style="margin-bottom: 0;">
        <div class="card-header">
          <h2 class="card-title">Radar Estratégico & Moat</h2>
        </div>
        <div class="chart-box">
          <canvas id="qualitative-radar-chart"></canvas>
        </div>
      </section>
    </div>

    ${u.map(([,r])=>`
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">${x(r.title)}</h2>
        </div>
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${r.questions.map(d=>{const g=t.qualitative[d.key]??{score:3,note:""};return`
              <div style="padding-bottom:14px; border-bottom:1px solid var(--border-subtle); display:grid; grid-template-columns: minmax(260px, 1.4fr) auto minmax(220px, 1fr); gap:14px; align-items:center;">
                <div style="font-weight:500; font-size:13px;">${x(d.text)}</div>
                <div class="score-group" data-score-group="${d.key}">
                  ${[1,2,3,4,5].map(m=>`
                    <button
                      type="button"
                      class="score-pill ${g.score===m?"selected":""}"
                      data-qual-key="${d.key}"
                      data-score-val="${m}"
                    >${m}</button>
                  `).join("")}
                </div>
                <input
                  class="input"
                  type="text"
                  data-qual-note="${d.key}"
                  value="${x(g.note)}"
                  placeholder="Evidência / justificativa..."
                />
              </div>
            `}).join("")}
        </div>
      </section>
    `).join("")}
  `,Te("qualitative-radar-chart",Tt(u.map(([,r])=>r.title),u.map(([r])=>Number((i.pillarScores[r]??0).toFixed(2))))),e.querySelectorAll("[data-qual-key]").forEach(r=>{r.addEventListener("click",()=>{const d=r.dataset.qualKey,g=Number(r.dataset.scoreVal);a.updateCurrentCompany(m=>{const y=m.qualitative[d]??{score:3,note:""};m.qualitative[d]={...y,score:g}})})}),e.querySelectorAll("[data-qual-note]").forEach(r=>{r.addEventListener("input",()=>{const d=r.dataset.qualNote;a.updateCurrentCompany(g=>{const m=g.qualitative[d]??{score:3,note:""};g.qualitative[d]={...m,note:r.value}},!0)})})}function He(e,a){if(e.length===0)return 0;if(e.length===1)return e[0];const t=(e.length-1)*a,i=Math.floor(t),s=Math.ceil(t);return i===s?e[i]:e[i]+(e[s]-e[i])*(t-i)}function fe(e){const a=e.filter(i=>i!=null&&Number.isFinite(i)&&i>0).sort((i,s)=>i-s);if(a.length===0)return{count:0,mean:null,median:null,q1:null,q3:null,min:null,max:null};const t=a.reduce((i,s)=>i+s,0)/a.length;return{count:a.length,mean:t,median:He(a,.5),q1:He(a,.25),q3:He(a,.75),min:a[0],max:a[a.length-1]}}function lt(e){const a=e.financials,t=e.valuationAssumptions,i=ie(a),s=qe(e),n=Pe(e),u=ve(e),r=At(e),d=s>0?s+r.netDeductionFromEV:0,g=a.netSales[i]??0,m=re(a)[i]??0,y=xe(a)[i]??0,f=X(a)[i]??0,h=a.shareholdersEquity[i]??0,C=me(a)[i]??0,c={evToEbitda:d>0&&y>0?P(d,y):null,evToEbit:d>0&&m>0?P(d,m):null,evToSales:d>0&&g>0?P(d,g):null,pe:s>0&&f>0?P(s,f):null,pb:s>0&&h>0?P(s,h):null,fcfYield:s>0?P(C,s)*100:null},b=e.peers??[],o=(M,V)=>{if(M===null||V<=0||n<=0)return null;const T=M*V-r.netDeductionFromEV;return P(T,n)},l=(M,V)=>M===null||V<=0||n<=0?null:P(M*V,n),p=(M,V)=>{if(M===null||M<=0||V<=0||n<=0)return null;const O=P(V,M/100);return P(O,n)},v=(M,V,O,T,U,K=!1)=>{const W=U(K?T.q3:T.q1),ee=U(T.median),ce=U(K?T.q1:T.q3),J=ee!==null&&u>0?(ee-u)/u*100:null;return{metric:M,label:V,companyCurrentMultiple:O,peerStats:T,impliedPriceLow:W,impliedPriceMedian:ee,impliedPriceHigh:ce,upsideAtMedian:J}},E=[v("evToEbitda","EV / EBITDA",c.evToEbitda,fe(b.map(M=>M.evToEbitda)),M=>o(M,y)),v("evToEbit","EV / EBIT",c.evToEbit,fe(b.map(M=>M.evToEbit)),M=>o(M,m)),v("evToSales","EV / Receita",c.evToSales,fe(b.map(M=>M.evToSales)),M=>o(M,g)),v("pe","P / L (P/E)",c.pe,fe(b.map(M=>M.pe)),M=>l(M,f)),v("pb","P / VP (P/B)",c.pb,fe(b.map(M=>M.pb)),M=>l(M,h)),v("fcfYield","FCF Yield (%)",c.fcfYield,fe(b.map(M=>M.fcfYield)),M=>p(M,C),!0)],A=oe(e).costOfEquity/100,D=t.terminalGrowthRate/100,F=at(e),_=(Se(a)[i]??0)/100,Y=Math.min(1,Math.max(.1,F.payoutRatio/100||.4)),$=A>D?P(Y*(1+D),A-D):null,N=A>D&&_>D?P(_-D,A-D):null,B=G(e),Z=B.valid&&y>0?P(B.enterpriseValue,y):null,le=$!==null&&f>0&&n>0?P($*f,n):null,se=N!==null&&h>0&&n>0?P(N*h,n):null;return{peerValuations:E,fundamentals:{justifiedPE:$,justifiedPB:N,justifiedEvEbitda:Z,impliedPriceJustifiedPE:le,impliedPriceJustifiedPB:se,companyCurrent:c}}}function Lt(e){const a=oe(e),t=e.valuationAssumptions,i=[-2,-1,0,1,2],s=[-1.5,-.75,0,.75,1.5],n=i.map(d=>Number((a.wacc+d).toFixed(2))),u=s.map(d=>Number((t.terminalGrowthRate+d).toFixed(2))),r=i.map(d=>s.map(g=>{const m=G(e,{waccDelta:d,terminalGrowthOverride:t.terminalGrowthRate+g,terminalMethodOverride:t.terminalMethod==="exit_multiple"?"value_driver":t.terminalMethod});return{valuePerShare:m.valuePerShare,upsidePercent:m.upsidePercent,valid:m.valid&&m.valuePerShare>0}}));return{title:"Sensibilidade: WACC × Crescimento Perpétuo (g)",rowLabel:"WACC (%)",colLabel:"Cresc. Perpétuo g (%)",rowValues:n,colValues:u,rowUnit:"%",colUnit:"%",cells:r}}function ci(e){const a=oe(e),t=e.valuationAssumptions,i=[-2,-1,0,1,2],s=[-4,-2,0,2,4],n=i.map(d=>Number((a.wacc+d).toFixed(2))),u=s.map(d=>Number((t.ebitMarginTarget+d).toFixed(1))),r=i.map(d=>s.map(g=>{const m=G(e,{waccDelta:d,ebitMarginDelta:g});return{valuePerShare:m.valuePerShare,upsidePercent:m.upsidePercent,valid:m.valid&&m.valuePerShare>0}}));return{title:"Sensibilidade: WACC × Margem EBIT Alvo",rowLabel:"WACC (%)",colLabel:"Margem EBIT Alvo (%)",rowValues:n,colValues:u,rowUnit:"%",colUnit:"%",cells:r}}function di(e){const a=oe(e),t=e.valuationAssumptions,i=[-2,-1,0,1,2],s=[-2,-1,0,1,2],n=i.map(d=>Number((a.wacc+d).toFixed(2))),u=s.map(d=>Number(Math.max(1,t.exitEvEbitdaMultiple+d).toFixed(1))),r=i.map(d=>u.map(g=>{const m=G(e,{waccDelta:d,exitMultipleOverride:g,terminalMethodOverride:"exit_multiple"});return{valuePerShare:m.valuePerShare,upsidePercent:m.upsidePercent,valid:m.valid&&m.valuePerShare>0}}));return{title:"Sensibilidade: WACC × Múltiplo de Saída (EV/EBITDA)",rowLabel:"WACC (%)",colLabel:"EV/EBITDA Saída (x)",rowValues:n,colValues:u,rowUnit:"%",colUnit:"x",cells:r}}function ct(e){const a=e.valuationAssumptions,t=ve(e),s=["bear","base","bull"].map(d=>{const g=a.scenarios[d],m=G(e,{salesGrowthDelta:g.salesGrowthDelta,ebitMarginDelta:g.ebitMarginDelta,waccDelta:g.waccDelta,terminalGrowthDelta:g.terminalGrowthDelta});return{key:d,label:g.label,probability:g.probability,wacc:m.costOfCapital.wacc,terminalGrowth:a.terminalGrowthRate+g.terminalGrowthDelta,enterpriseValue:m.enterpriseValue,equityValue:m.equityValue,valuePerShare:m.valid?Math.max(0,m.valuePerShare):0,upsidePercent:m.valid?m.upsidePercent:null}}),n=s.reduce((d,g)=>d+Math.max(0,g.probability),0),u=n>0?s.reduce((d,g)=>d+g.valuePerShare*(Math.max(0,g.probability)/n),0):0,r=t>0&&u>0?(u-t)/t*100:null;return{outcomes:s,totalProbability:n,expectedValuePerShare:u,expectedUpsidePercent:r}}function It(e){const a=ve(e),t=[],i=ct(e),s=i.outcomes.find(p=>p.key==="bear"),n=i.outcomes.find(p=>p.key==="base"),u=i.outcomes.find(p=>p.key==="bull");if(n&&n.valuePerShare>0){const p=Math.min((s==null?void 0:s.valuePerShare)||n.valuePerShare,n.valuePerShare),v=Math.max((u==null?void 0:u.valuePerShare)||n.valuePerShare,n.valuePerShare);t.push({id:"dcf-fcff-scenarios",label:"DCF FCFF (Cenários)",subtitle:"Bear / Base / Bull",low:p,mid:n.valuePerShare,high:v,category:"intrinsic"})}const r=G(e,{terminalMethodOverride:"exit_multiple",exitMultipleOverride:Math.max(1,e.valuationAssumptions.exitEvEbitdaMultiple-1),waccDelta:1}),d=G(e,{terminalMethodOverride:"exit_multiple"}),g=G(e,{terminalMethodOverride:"exit_multiple",exitMultipleOverride:e.valuationAssumptions.exitEvEbitdaMultiple+1,waccDelta:-1});d.valid&&d.valuePerShare>0&&t.push({id:"dcf-fcff-exit",label:"DCF FCFF (Exit Multiple)",subtitle:"EV/EBITDA Saída (±1x)",low:Math.max(0,Math.min(r.valuePerShare,d.valuePerShare)),mid:d.valuePerShare,high:Math.max(g.valuePerShare,d.valuePerShare),category:"intrinsic"});const m=De(e,{keDelta:1}),y=De(e),f=De(e,{keDelta:-1});y.valid&&y.valuePerShare>0&&t.push({id:"dcf-fcfe",label:"DCF FCFE (Acionista)",subtitle:"Faixa Ke ±1,0%",low:Math.max(0,Math.min(m.valuePerShare,y.valuePerShare)),mid:y.valuePerShare,high:Math.max(f.valuePerShare,y.valuePerShare),category:"intrinsic"});const h=Ge(e);h.valid&&h.valuePerShare>0&&t.push({id:"ddm",label:"DDM (Dividendos)",subtitle:h.model==="gordon"?"Gordon":h.model==="two_stage"?"2 Estágios":"Modelo H",low:h.valuePerShare*.9,mid:h.valuePerShare,high:h.valuePerShare*1.1,category:"intrinsic"});const C=lt(e);for(const p of C.peerValuations)if(["evToEbitda","pe","evToSales"].includes(p.metric)&&p.impliedPriceMedian!==null&&p.impliedPriceMedian>0){const v=Math.max(0,p.impliedPriceLow??p.impliedPriceMedian*.9),E=Math.max(p.impliedPriceHigh??p.impliedPriceMedian*1.1,v);t.push({id:`peer-${p.metric}`,label:`Comps (${p.label})`,subtitle:`Q1 – Mediana – Q3 (${p.peerStats.count} pares)`,low:v,mid:p.impliedPriceMedian,high:E,category:"relative"})}e.week52Low>0&&e.week52High>e.week52Low&&t.push({id:"week52",label:"Faixa 52 Semanas",subtitle:"Mín – Atual – Máx",low:e.week52Low,mid:a>0?a:(e.week52Low+e.week52High)/2,high:e.week52High,category:"market"});const c=t.filter(p=>p.category!=="market"&&p.mid>0),b=c.length>0?c.reduce((p,v)=>p+v.low,0)/c.length:null,o=c.length>0?c.reduce((p,v)=>p+v.mid,0)/c.length:null,l=c.length>0?c.reduce((p,v)=>p+v.high,0)/c.length:null;return{currentSharePrice:a,bars:t,consensusLow:b,consensusMid:o,consensusHigh:l}}let ue="synthesis";function ui(e,a){const t=a?" base-cell":"";return e===null?`heatmap-cell neutral${t}`:e>=20?`heatmap-cell strong-up${t}`:e>=5?`heatmap-cell mild-up${t}`:e>=-5?`heatmap-cell neutral${t}`:e>=-20?`heatmap-cell mild-down${t}`:`heatmap-cell strong-down${t}`}function Ue(e,a){return`
    <div class="card">
      <div class="card-header">
        <div>
          <h3 class="card-title">${x(e.title)}</h3>
          <p class="card-subtitle">Linha: ${x(e.rowLabel)} | Coluna: ${x(e.colLabel)} (célula destacada = caso base)</p>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${x(e.rowLabel)} \\ ${x(e.colLabel)}</th>
              ${e.colValues.map(t=>`<th style="text-align:center;">${R(t,e.colUnit==="x"?1:2)}${e.colUnit}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${e.rowValues.map((t,i)=>`
              <tr>
                <td class="mono" style="font-weight:700;">${R(t,2)}${e.rowUnit}</td>
                ${e.cells[i].map((s,n)=>{const u=i===2&&n===2;return s.valid?`
                      <td class="${ui(s.upsidePercent,u)}">
                        <div>${k(s.valuePerShare,a.currency)}</div>
                        ${s.upsidePercent!==null?`<div style="font-size:10.5px; opacity:0.85;">${S(s.upsidePercent,1,!0)}</div>`:""}
                      </td>
                    `:`<td class="heatmap-cell neutral${u?" base-cell":""}">N/A</td>`}).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function qt(e,a){var h,C,c,b;const t=a.getCurrentCompany();if(!t)return;const i=nt(t),s=G(t),n=De(t),u=Ge(t),r=lt(t),d=Mt(t),g=ct(t),m=It(t),y=[{id:"synthesis",label:"Síntese & Football Field"},{id:"dcf",label:"DCF (FCFF, FCFE & Reverse)"},{id:"sensitivity",label:"Sensibilidade & Cenários"},{id:"multiples",label:"Múltiplos & Comparáveis"},{id:"ddm",label:"DDM (Dividendos)"}];let f="";if(ue==="synthesis"){const o=m.consensusMid!==null&&m.currentSharePrice>0?(m.consensusMid-m.currentSharePrice)/m.currentSharePrice*100:null;f=`
      <div class="grid-4" style="margin-bottom: 18px;">
        <div class="kpi-tile">
          <span class="kpi-label">Preço Atual de Mercado</span>
          <span class="kpi-value">${m.currentSharePrice>0?k(m.currentSharePrice,t.currency):"—"}</span>
          <span class="kpi-sub">Market Cap: ${I(t.marketCap,t.currency,t.scale)}</span>
        </div>
        <div class="kpi-tile primary">
          <span class="kpi-label">DCF FCFF (Caso Base)</span>
          <span class="kpi-value brand">${s.valid?k(s.valuePerShare,t.currency):"—"}</span>
          <span class="kpi-sub">${s.valid?z(s.upsidePercent):"Revise premissas"}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Valor Esperado (Cenários)</span>
          <span class="kpi-value">${g.expectedValuePerShare>0?k(g.expectedValuePerShare,t.currency):"—"}</span>
          <span class="kpi-sub">${z(g.expectedUpsidePercent)}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Preço-Teto (Margem Seg. ${t.valuationAssumptions.safetyMarginTarget}%)</span>
          <span class="kpi-value ${s.valid&&m.currentSharePrice>0&&m.currentSharePrice<=s.safetyMarginPrice?"positive":""}">${s.valid?k(s.safetyMarginPrice,t.currency):"—"}</span>
          <span class="kpi-sub">Média dos métodos: ${m.consensusMid!==null?k(m.consensusMid,t.currency):"—"} ${o!==null?`(${S(o,1,!0)})`:""}</span>
        </div>
      </div>

      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Football Field — Síntese Comparativa de Valuation</h2>
            <p class="card-subtitle">Faixas de valor justo por metodologia (azul: intrínseco | verde-petróleo: múltiplos comparáveis | cinza: 52 semanas) vs. linha vermelha do Preço Atual.</p>
          </div>
        </div>
        ${m.bars.length>0?'<div class="chart-box tall"><canvas id="football-field-chart"></canvas></div>':'<p style="color:var(--text-muted);">Preencha os demonstrativos financeiros e quantidade de ações para gerar o gráfico Football Field.</p>'}
      </section>

      <section class="card">
        <div class="card-header">
          <h2 class="card-title">Quadro Resumo por Metodologia</h2>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Metodologia</th>
                <th>Detalhe / Base</th>
                <th>Mínimo</th>
                <th>Valor Base / Mediana</th>
                <th>Máximo</th>
                <th>Upside (Base)</th>
              </tr>
            </thead>
            <tbody>
              ${m.bars.map(l=>{const p=m.currentSharePrice>0&&l.category!=="market"?(l.mid-m.currentSharePrice)/m.currentSharePrice*100:null;return`
                  <tr>
                    <td>${x(l.label)}</td>
                    <td style="font-family:var(--font-sans); text-align:left; color:var(--text-secondary);">${x(l.subtitle)}</td>
                    <td>${k(l.low,t.currency)}</td>
                    <td style="font-weight:700;">${k(l.mid,t.currency)}</td>
                    <td>${k(l.high,t.currency)}</td>
                    <td>${l.category==="market"?"Referência":z(p)}</td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `}else if(ue==="dcf"){const o=t.valuationAssumptions,l=s.costOfCapital,p=s.bridge;f=`
      <!-- Top Results Strip -->
      <div class="grid-4" style="margin-bottom: 18px;">
        <div class="kpi-tile primary">
          <span class="kpi-label">DCF FCFF / Ação</span>
          <span class="kpi-value brand">${s.valid?k(s.valuePerShare,t.currency):"—"}</span>
          <span class="kpi-sub">WACC: ${S(l.wacc,2)} | ${s.valid?z(s.upsidePercent):""}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">DCF FCFE / Ação</span>
          <span class="kpi-value">${n.valid?k(n.valuePerShare,t.currency):"—"}</span>
          <span class="kpi-sub">Ke: ${S(n.costOfEquity,2)} | ${n.valid?z(n.upsidePercent):""}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">${q("Reverse DCF (CAGR Implícito)","Reverse DCF")}</span>
          <span class="kpi-value">${d.impliedSalesCAGR!==null?S(d.impliedSalesCAGR,1):"—"}</span>
          <span class="kpi-sub">Seu CAGR base: ${S(d.baseProjectedCAGR,1)} | Margem impl.: ${d.impliedEbitMargin!==null?S(d.impliedEbitMargin,1):"—"}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Peso do Valor Terminal</span>
          <span class="kpi-value ${s.terminalValueShareOfEV>75?"negative":""}">${s.valid?S(s.terminalValueShareOfEV,1):"—"}</span>
          <span class="kpi-sub">EV/EBITDA impl.: ${Q(s.impliedExitMultiple,1)} | g impl.: ${S(s.impliedTerminalGrowth,2)}</span>
        </div>
      </div>

      <!-- WACC & CAPM + Operational Assumptions -->
      <div class="grid-2">
        <section class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Custo de Capital (CAPM, Hamada & WACC)</h2>
              <p class="card-subtitle">Ke = Rf + βL × ERP + CRP + Size | Tax Shield com alíquota marginal</p>
            </div>
          </div>

          <div class="field" style="margin-bottom: 12px;">
            <label>Base de Moeda / Inflação (aplica preset de mercado)</label>
            <select class="select" id="valuation-base-select">
              ${Object.entries(Ne).map(([v,E])=>`<option value="${v}" ${o.valuationBase===v?"selected":""}>${x(E.label)}</option>`).join("")}
            </select>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>${q("Taxa Livre de Risco (%)","Taxa Livre de Risco")}</label>
              <input class="input num-input" type="number" step="0.1" data-assump="riskFreeRate" value="${o.riskFreeRate}" />
            </div>
            <div class="field">
              <label>${q("Prêmio de Risco ERP (%)","Prêmio de Risco (ERP)")}</label>
              <input class="input num-input" type="number" step="0.1" data-assump="equityRiskPremium" value="${o.equityRiskPremium}" />
            </div>
            <div class="field">
              <label>${q("Risco-País CRP (%)","Prêmio de Risco-País (CRP)")}</label>
              <input class="input num-input" type="number" step="0.1" data-assump="countryRiskPremium" value="${o.countryRiskPremium}" />
            </div>
            <div class="field">
              <label>Prêmio Tamanho / Específico (%)</label>
              <input class="input num-input" type="number" step="0.1" data-assump="sizePremium" value="${o.sizePremium}" />
            </div>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>${q("Modo do Beta","Beta (CAPM / Hamada)")}</label>
              <select class="select" data-assump-str="betaMode">
                <option value="direct" ${o.betaMode==="direct"?"selected":""}>Beta Alavancado Direto (βL)</option>
                <option value="hamada" ${o.betaMode==="hamada"?"selected":""}>Hamada (Desalavancado βU → βL)</option>
              </select>
            </div>
            <div class="field">
              <label>${o.betaMode==="hamada"?"Beta Desalavancado Setorial (βU)":"Beta Alavancado (βL)"}</label>
              <input class="input num-input" type="number" step="0.02" data-assump="${o.betaMode==="hamada"?"unleveredBeta":"leveredBeta"}" value="${o.betaMode==="hamada"?o.unleveredBeta:o.leveredBeta}" />
              <span class="field-hint">Efetivo: βL = ${R(l.leveredBeta,2)} | βU = ${R(l.unleveredBeta,2)}</span>
            </div>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>${q("Modo do Custo da Dívida","Rating Sintético (Kd)")}</label>
              <select class="select" data-assump-str="costOfDebtMode">
                <option value="manual" ${o.costOfDebtMode==="manual"?"selected":""}>Manual (Kd pré-IR)</option>
                <option value="synthetic" ${o.costOfDebtMode==="synthetic"?"selected":""}>Rating Sintético Damodaran (${l.syntheticRating.rating})</option>
              </select>
            </div>
            <div class="field">
              <label>Custo da Dívida Pré-IR (%)</label>
              <input class="input num-input" type="number" step="0.1" data-assump="costOfDebt" value="${o.costOfDebtMode==="synthetic"?Number(l.preTaxCostOfDebt.toFixed(2)):o.costOfDebt}" ${o.costOfDebtMode==="synthetic"?"disabled":""} />
              <span class="field-hint">ICR ${R(l.syntheticRating.interestCoverage,1)}x → Spread +${S(l.syntheticRating.spread,2)} | Kd pós-IR: ${S(l.afterTaxCostOfDebt,2)}</span>
            </div>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>Estrutura de Capital (Pesos WACC)</label>
              <select class="select" data-assump-str="capitalStructureMode">
                <option value="current" ${o.capitalStructureMode==="current"?"selected":""}>Atual (Market Cap + Dívida)</option>
                <option value="target" ${o.capitalStructureMode==="target"?"selected":""}>Estrutura Alvo (D/V fixo)</option>
              </select>
            </div>
            <div class="field">
              <label>Peso Dívida D/V Alvo (%)</label>
              <input class="input num-input" type="number" step="1" data-assump="targetDebtToCapital" value="${o.capitalStructureMode==="target"?o.targetDebtToCapital:Number(l.debtWeight.toFixed(1))}" ${o.capitalStructureMode!=="target"?"disabled":""} />
              <span class="field-hint">Pesos: E/V ${S(l.equityWeight,1)} | D/V ${S(l.debtWeight,1)}</span>
            </div>
            <div class="field">
              <label>Alíquota Efetiva Inicial (%)</label>
              <input class="input num-input" type="number" step="0.5" data-assump="effectiveTaxRate" value="${o.effectiveTaxRate}" />
            </div>
            <div class="field">
              <label>Alíquota Marginal / Perpetuidade (%)</label>
              <input class="input num-input" type="number" step="0.5" data-assump="marginalTaxRate" value="${o.marginalTaxRate}" />
            </div>
          </div>

          <div class="kpi-tile primary" style="flex-direction:row; justify-content:space-between; align-items:center;">
            <div>
              <div class="kpi-label">Resumo do Custo de Capital</div>
              <div class="kpi-sub">Ke = ${S(l.costOfEquity,2)} | Kd(1−t) = ${S(l.afterTaxCostOfDebt,2)}</div>
            </div>
            <div class="kpi-value brand">WACC ${S(l.wacc,2)}</div>
          </div>
        </section>

        <!-- Operational & Terminal Assumptions -->
        <section class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Projeções Operacionais & Valor Terminal</h2>
              <p class="card-subtitle">Horizonte configurável (5–10 anos), convergência de margem e método de perpetuidade.</p>
            </div>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>Horizonte Explícito (Anos)</label>
              <select class="select" data-assump-num-select="projectionYears">
                ${[5,6,7,8,9,10].map(v=>`<option value="${v}" ${o.projectionYears===v?"selected":""}>${v} anos</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label>Margem de Segurança Alvo (%)</label>
              <input class="input num-input" type="number" step="1" data-assump="safetyMarginTarget" value="${o.safetyMarginTarget}" />
            </div>
          </div>

          <div class="field" style="margin-bottom:12px;">
            <label>Crescimento de Receita Anual (%, separado por vírgula — ${o.projectionYears} anos)</label>
            <input class="input mono" type="text" id="sales-growth-input" value="${o.salesGrowth.slice(0,o.projectionYears).join(", ")}" />
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>Margem EBIT Ano 1 (%)</label>
              <input class="input num-input" type="number" step="0.2" data-assump="ebitMarginStart" value="${o.ebitMarginStart}" />
            </div>
            <div class="field">
              <label>Margem EBIT Ano ${o.projectionYears} — Alvo (%)</label>
              <input class="input num-input" type="number" step="0.2" data-assump="ebitMarginTarget" value="${o.ebitMarginTarget}" />
            </div>
            <div class="field">
              <label>CAPEX (% Receita)</label>
              <input class="input num-input" type="number" step="0.2" data-assump="capexAsPercentOfSales" value="${o.capexAsPercentOfSales}" />
            </div>
            <div class="field">
              <label>Depreciação & Amort. (% Receita)</label>
              <input class="input num-input" type="number" step="0.2" data-assump="depAsPercentOfSales" value="${o.depAsPercentOfSales}" />
            </div>
            <div class="field">
              <label>Capital de Giro NWC (% Receita)</label>
              <input class="input num-input" type="number" step="0.5" data-assump="nwcAsPercentOfSales" value="${o.nwcAsPercentOfSales}" />
            </div>
            <div class="field">
              <label>Financ. Reinvestimento via Dívida — FCFE (%)</label>
              <input class="input num-input" type="number" step="1" data-assump="fcfeTargetDebtRatio" value="${o.fcfeTargetDebtRatio}" />
            </div>
          </div>

          <div style="border-top:1px solid var(--border-subtle); padding-top:12px; margin-bottom:12px;">
            <div class="grid-2" style="gap:10px;">
              <div class="field">
                <label>${q("Método do Valor Terminal","Value Driver (ROIC Terminal)")}</label>
                <select class="select" data-assump-str="terminalMethod">
                  <option value="value_driver" ${o.terminalMethod==="value_driver"?"selected":""}>Value Driver (ROIC Terminal — Recomendado)</option>
                  <option value="gordon" ${o.terminalMethod==="gordon"?"selected":""}>Gordon Growth (sobre último FCFF)</option>
                  <option value="exit_multiple" ${o.terminalMethod==="exit_multiple"?"selected":""}>Múltiplo de Saída (EV / EBITDA)</option>
                </select>
              </div>
              <div class="field">
                <label>Crescimento Perpétuo g (%)</label>
                <input class="input num-input" type="number" step="0.1" data-assump="terminalGrowthRate" value="${o.terminalGrowthRate}" />
              </div>
              <div class="field">
                <label>ROIC na Perpetuidade (%)</label>
                <input class="input num-input" type="number" step="0.5" data-assump="terminalROIC" value="${o.terminalROIC}" />
                <span class="field-hint">Reinvestimento terminal = g / ROIC = ${S(s.impliedReinvestmentRate,1)}</span>
              </div>
              <div class="field">
                <label>Múltiplo de Saída EV/EBITDA (x)</label>
                <input class="input num-input" type="number" step="0.5" data-assump="exitEvEbitdaMultiple" value="${o.exitEvEbitdaMultiple}" />
              </div>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px;">
            <label class="checkbox-row">
              <input type="checkbox" data-assump-bool="midYearConvention" ${o.midYearConvention?"checked":""} />
              <span>${q("Usar Mid-Year Convention (desconto em t − 0,5)","Mid-Year Convention")}</span>
            </label>
            <label class="checkbox-row">
              <input type="checkbox" data-assump-bool="includeLeasesInDebt" ${o.includeLeasesInDebt?"checked":""} />
              <span>Incluir Arrendamentos (IFRS 16) na Dívida Bruta e Ponte EV → Equity</span>
            </label>
            <label class="checkbox-row">
              <input type="checkbox" data-assump-bool="includeProvisionsInBridge" ${o.includeProvisionsInBridge?"checked":""} />
              <span>Deduzir Provisões / Contingências na Ponte EV → Equity</span>
            </label>
          </div>
        </section>
      </div>

      <!-- Transparent FCFF Year-by-Year Table -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Demonstrativo Aberto — DCF Fluxo de Caixa da Firma (FCFF)</h2>
            <p class="card-subtitle">Projeção linha a linha auditável (${x(t.currency)}, mesma escala dos demonstrativos) descontada ao WACC de ${S(l.wacc,2)}.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Linha do Fluxo</th>
                ${s.projections.map(v=>`<th>${x(v.yearLabel)}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Receita Líquida</td>
                ${s.projections.map(v=>`<td>${R(v.sales,1)}</td>`).join("")}
              </tr>
              <tr>
                <td style="color:var(--text-muted);">Crescimento YoY (%)</td>
                ${s.projections.map(v=>`<td style="color:var(--text-muted);">${S(v.salesGrowth,1)}</td>`).join("")}
              </tr>
              <tr>
                <td>EBIT</td>
                ${s.projections.map(v=>`<td>${R(v.ebit,1)}</td>`).join("")}
              </tr>
              <tr>
                <td style="color:var(--text-muted);">Margem EBIT (%)</td>
                ${s.projections.map(v=>`<td style="color:var(--text-muted);">${S(v.ebitMargin,1)}</td>`).join("")}
              </tr>
              <tr>
                <td>(−) Impostos sobre EBIT</td>
                ${s.projections.map(v=>`<td>(${R(v.taxes,1)})</td>`).join("")}
              </tr>
              <tr class="row-total">
                <td>NOPAT (Lucro Operacional Pós-IR)</td>
                ${s.projections.map(v=>`<td>${R(v.nopat,1)}</td>`).join("")}
              </tr>
              <tr>
                <td>(+) Depreciação & Amortização</td>
                ${s.projections.map(v=>`<td>${R(v.da,1)}</td>`).join("")}
              </tr>
              <tr>
                <td>(−) CAPEX</td>
                ${s.projections.map(v=>`<td>(${R(v.capex,1)})</td>`).join("")}
              </tr>
              <tr>
                <td>(−) Variação Capital de Giro (ΔNWC)</td>
                ${s.projections.map(v=>`<td>${R(-v.deltaNWC,1)}</td>`).join("")}
              </tr>
              <tr class="row-total">
                <td>FCFF (Fluxo de Caixa Livre da Firma)</td>
                ${s.projections.map(v=>`<td>${R(v.fcff,1)}</td>`).join("")}
              </tr>
              <tr>
                <td style="color:var(--text-muted);">Fator de Desconto (${o.midYearConvention?"Mid-Year":"Fim Ano"})</td>
                ${s.projections.map(v=>`<td style="color:var(--text-muted);">${R(v.discountFactor,4)}</td>`).join("")}
              </tr>
              <tr class="row-highlight">
                <td>Valor Presente do FCFF</td>
                ${s.projections.map(v=>`<td>${R(v.pvFcff,1)}</td>`).join("")}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- EV -> Equity Bridge & Terminal Value Cross-Check -->
      <div class="grid-2">
        <section class="card">
          <div class="card-header">
            <h2 class="card-title">${q("Ponte Enterprise Value → Equity Value","Ponte EV → Equity")}</h2>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <tbody>
                <tr><td>(+) VP dos FCFFs Explícitos</td><td>${I(s.pvOfExplicitFcff,t.currency,t.scale)}</td></tr>
                <tr><td>(+) VP do Valor Terminal (${S(s.terminalValueShareOfEV,1)} do EV)</td><td>${I(s.pvOfTerminalValue,t.currency,t.scale)}</td></tr>
                <tr class="row-total"><td>Enterprise Value (EV)</td><td>${I(s.enterpriseValue,t.currency,t.scale)}</td></tr>
                <tr><td>(−) Dívida Bruta (CP + LP)</td><td>(${I(p.shortAndLongTermDebt,t.currency,t.scale)})</td></tr>
                <tr><td>(−) Arrendamentos IFRS 16 ${o.includeLeasesInDebt?"":"(desabilitado)"}</td><td>(${I(o.includeLeasesInDebt?p.leaseLiabilities:0,t.currency,t.scale)})</td></tr>
                <tr><td>(+) Caixa e Equivalentes</td><td>${I(p.cashAndEquivalents,t.currency,t.scale)}</td></tr>
                <tr><td>(−) Participação de Não Controladores</td><td>(${I(p.minorityInterest,t.currency,t.scale)})</td></tr>
                <tr><td>(−) Ações Preferenciais / Provisões</td><td>(${I(p.preferredStock+p.provisionsAdjustment,t.currency,t.scale)})</td></tr>
                <tr><td>(+) Ativos Não Operacionais / Coligadas</td><td>${I(p.nonOperatingAssets,t.currency,t.scale)}</td></tr>
                <tr class="row-total"><td>Equity Value (Valor Justo do PL)</td><td>${I(s.equityValue,t.currency,t.scale)}</td></tr>
                <tr><td>(÷) Ações Diluídas</td><td>${R(s.sharesUsed,2)}</td></tr>
                <tr class="row-highlight"><td>Valor Intrínseco por Ação (FCFF)</td><td>${k(s.valuePerShare,t.currency)}</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Transparent FCFE Summary & Table -->
        <section class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">DCF — Fluxo de Caixa do Acionista (FCFE)</h2>
              <p class="card-subtitle">FCFE = Lucro Líquido − (1 − δ)(CAPEX − D&A + ΔNWC), descontado ao Ke (${S(n.costOfEquity,2)}).</p>
            </div>
          </div>
          <div class="table-wrap" style="margin-bottom:14px;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Linha FCFE</th>
                  ${n.projections.slice(0,6).map(v=>`<th>${x(v.yearLabel)}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                <tr><td>EBIT</td>${n.projections.slice(0,6).map(v=>`<td>${R(v.ebit,1)}</td>`).join("")}</tr>
                <tr><td>(−) Juros sobre Dívida</td>${n.projections.slice(0,6).map(v=>`<td>(${R(v.interestExpense,1)})</td>`).join("")}</tr>
                <tr><td>Lucro Líquido</td>${n.projections.slice(0,6).map(v=>`<td>${R(v.netIncome,1)}</td>`).join("")}</tr>
                <tr><td>(+) Emissão Líq. Dívida</td>${n.projections.slice(0,6).map(v=>`<td>${R(v.netDebtIssuance,1)}</td>`).join("")}</tr>
                <tr class="row-total"><td>FCFE</td>${n.projections.slice(0,6).map(v=>`<td>${R(v.fcfe,1)}</td>`).join("")}</tr>
                <tr class="row-highlight"><td>VP do FCFE</td>${n.projections.slice(0,6).map(v=>`<td>${R(v.pvFcfe,1)}</td>`).join("")}</tr>
              </tbody>
            </table>
          </div>
          <div class="grid-2">
            <div class="kpi-tile">
              <span class="kpi-label">VP Explícito + VP Terminal</span>
              <span class="kpi-value" style="font-size:16px;">${I(n.pvOfExplicitFcfe+n.pvOfTerminalValue,t.currency,t.scale)}</span>
              <span class="kpi-sub">+ Caixa/Não-Op: ${I(n.cashAndNonOperatingAdded,t.currency,t.scale)}</span>
            </div>
            <div class="kpi-tile primary">
              <span class="kpi-label">Valor Intrínseco (FCFE)</span>
              <span class="kpi-value brand" style="font-size:18px;">${n.valid?k(n.valuePerShare,t.currency):"—"}</span>
              <span class="kpi-sub">${n.valid?z(n.upsidePercent):""}</span>
            </div>
          </div>
        </section>
      </div>
    `}else if(ue==="sensitivity"){const o=Lt(t),l=ci(t),p=di(t),v=t.valuationAssumptions.scenarios;f=`
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Análise de Cenários (Bear / Base / Bull)</h2>
            <p class="card-subtitle">Ajuste probabilidades e desvios (em p.p.) sobre o caso base para calcular o Valor Esperado Ponderado.</p>
          </div>
          <div style="text-align:right;">
            <div class="kpi-label">Valor Esperado Ponderado</div>
            <div class="kpi-value brand" style="font-size:20px;">${k(g.expectedValuePerShare,t.currency)} ${z(g.expectedUpsidePercent)}</div>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cenário</th>
                <th>Prob. (%)</th>
                <th>Δ Cresc. Vendas (p.p.)</th>
                <th>Δ Margem EBIT (p.p.)</th>
                <th>Δ WACC (p.p.)</th>
                <th>Δ g Perpétuo (p.p.)</th>
                <th>Valor / Ação</th>
                <th>Upside</th>
              </tr>
            </thead>
            <tbody>
              ${["bear","base","bull"].map(E=>{const w=v[E],A=g.outcomes.find(D=>D.key===E);return`
                  <tr class="${E==="base"?"row-highlight":""}">
                    <td>${x(w.label)}</td>
                    <td><input class="table-cell-input" type="number" step="5" data-scenario="${E}" data-sfield="probability" value="${w.probability}" /></td>
                    <td><input class="table-cell-input" type="number" step="0.5" data-scenario="${E}" data-sfield="salesGrowthDelta" value="${w.salesGrowthDelta}" /></td>
                    <td><input class="table-cell-input" type="number" step="0.5" data-scenario="${E}" data-sfield="ebitMarginDelta" value="${w.ebitMarginDelta}" /></td>
                    <td><input class="table-cell-input" type="number" step="0.25" data-scenario="${E}" data-sfield="waccDelta" value="${w.waccDelta}" /></td>
                    <td><input class="table-cell-input" type="number" step="0.25" data-scenario="${E}" data-sfield="terminalGrowthDelta" value="${w.terminalGrowthDelta}" /></td>
                    <td style="font-weight:700;">${k(A.valuePerShare,t.currency)}</td>
                    <td>${z(A.upsidePercent)}</td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </section>

      ${Ue(o,t)}
      <div class="grid-2">
        ${Ue(l,t)}
        ${Ue(p,t)}
      </div>
    `}else if(ue==="multiples"){const o=r.fundamentals;f=`
      <!-- Justified Multiples -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Múltiplos Atuais vs. Múltiplos Justificados por Fundamentos</h2>
            <p class="card-subtitle">Base teórica (CFA/Damodaran): P/L Justificado = Payout × (1+g) / (Ke − g) | P/VP Justificado = (ROE − g) / (Ke − g).</p>
          </div>
        </div>
        <div class="grid-4">
          <div class="kpi-tile">
            <span class="kpi-label">EV / EBITDA Atual</span>
            <span class="kpi-value">${Q(o.companyCurrent.evToEbitda)}</span>
            <span class="kpi-sub">Justificado (DCF): ${Q(o.justifiedEvEbitda)}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">P / L Atual</span>
            <span class="kpi-value">${Q(o.companyCurrent.pe)}</span>
            <span class="kpi-sub">Justificado: ${Q(o.justifiedPE)} (${o.impliedPriceJustifiedPE?k(o.impliedPriceJustifiedPE,t.currency):"—"})</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">P / VP Atual</span>
            <span class="kpi-value">${Q(o.companyCurrent.pb)}</span>
            <span class="kpi-sub">Justificado: ${Q(o.justifiedPB)} (${o.impliedPriceJustifiedPB?k(o.impliedPriceJustifiedPB,t.currency):"—"})</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">EV / Receita & FCF Yield</span>
            <span class="kpi-value">${Q(o.companyCurrent.evToSales)}</span>
            <span class="kpi-sub">FCF Yield: ${o.companyCurrent.fcfYield!==null?S(o.companyCurrent.fcfYield,2):"—"}</span>
          </div>
        </div>
      </section>

      <!-- Peer Group Implied Valuation -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Valuation Implícito por Comparáveis (Peer Group)</h2>
            <p class="card-subtitle">Aplica Mediana e Faixa Interquartil (Q1–Q3) dos pares com ponte completa EV → Equity para múltiplos de EV.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Múltiplo</th>
                <th>Empresa Atual</th>
                <th>Média Pares</th>
                <th>Mediana Pares</th>
                <th>Faixa Q1 – Q3</th>
                <th>Preço Implícito (Mediana)</th>
                <th>Faixa Preço (Q1–Q3)</th>
                <th>Upside</th>
              </tr>
            </thead>
            <tbody>
              ${r.peerValuations.map(l=>{const p=l.metric==="fcfYield",v=E=>E===null?"—":p?S(E,1):Q(E,2);return`
                  <tr>
                    <td>${x(l.label)}</td>
                    <td>${v(l.companyCurrentMultiple)}</td>
                    <td>${v(l.peerStats.mean)}</td>
                    <td style="font-weight:700;">${v(l.peerStats.median)}</td>
                    <td>${v(l.peerStats.q1)} – ${v(l.peerStats.q3)}</td>
                    <td style="font-weight:700; color:var(--brand-700);">${l.impliedPriceMedian!==null?k(l.impliedPriceMedian,t.currency):"—"}</td>
                    <td>${l.impliedPriceLow!==null&&l.impliedPriceHigh!==null?`${k(l.impliedPriceLow,t.currency)} – ${k(l.impliedPriceHigh,t.currency)}`:"—"}</td>
                    <td>${z(l.upsideAtMedian)}</td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Editable Peer Table -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Tabela de Empresas Comparáveis (Trading Comps)</h2>
            <p class="card-subtitle">Cadastre pares do mesmo setor/porte para alimentar automaticamente a avaliação relativa e o Football Field.</p>
          </div>
          <button id="add-peer-btn" class="btn btn-primary btn-sm" type="button">
            <i data-lucide="plus"></i> Adicionar Par
          </button>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Ticker</th>
                <th>EV/EBITDA</th>
                <th>EV/EBIT</th>
                <th>EV/Sales</th>
                <th>P/L</th>
                <th>P/VP</th>
                <th>PEG</th>
                <th>FCF Yield %</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${t.peers.length===0?'<tr><td colspan="10" style="text-align:center; color:var(--text-muted); padding:20px;">Nenhum par cadastrado. Clique em "Adicionar Par" para começar.</td></tr>':t.peers.map(l=>`
                <tr>
                  <td><input class="table-cell-input" style="text-align:left; min-width:140px;" data-peer-id="${x(l.id)}" data-pfield="name" value="${x(l.name)}" /></td>
                  <td><input class="table-cell-input" style="text-align:left; min-width:70px;" data-peer-id="${x(l.id)}" data-pfield="ticker" value="${x(l.ticker)}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${x(l.id)}" data-pfield="evToEbitda" value="${l.evToEbitda??""}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${x(l.id)}" data-pfield="evToEbit" value="${l.evToEbit??""}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${x(l.id)}" data-pfield="evToSales" value="${l.evToSales??""}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${x(l.id)}" data-pfield="pe" value="${l.pe??""}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${x(l.id)}" data-pfield="pb" value="${l.pb??""}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${x(l.id)}" data-pfield="peg" value="${l.peg??""}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${x(l.id)}" data-pfield="fcfYield" value="${l.fcfYield??""}" /></td>
                  <td><button class="btn btn-ghost btn-sm" type="button" data-remove-peer="${x(l.id)}" style="color:var(--danger-text);">✕</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `}else{const o=t.valuationAssumptions,l=u.shareholderReturns;f=`
      <div class="grid-4" style="margin-bottom: 18px;">
        <div class="kpi-tile primary">
          <span class="kpi-label">Valor Intrínseco (DDM)</span>
          <span class="kpi-value brand">${u.valid?k(u.valuePerShare,t.currency):"—"}</span>
          <span class="kpi-sub">${u.valid?z(u.upsidePercent):x(u.errorMessage??"")}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Dividendo D0 / D1</span>
          <span class="kpi-value">${k(u.d0,t.currency)}</span>
          <span class="kpi-sub">D1 projetado: ${k(u.d1,t.currency)} | Ke: ${S(u.costOfEquity,2)}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Payout & g Sustentável</span>
          <span class="kpi-value">${S(l.payoutRatio,1)}</span>
          <span class="kpi-sub">g sust. ROE×(1−Payout): ${S(l.sustainableGrowthRate,1)}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">${q("Total Shareholder Yield","Total Shareholder Yield")}</span>
          <span class="kpi-value">${S(l.totalShareholderYield,2)}</span>
          <span class="kpi-sub">DY ${S(l.dividendYield,2)} + Buyback ${S(l.buybackYield,2)}</span>
        </div>
      </div>

      <div class="grid-2">
        <section class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">${q("Premissas do Modelo de Dividendos (DDM)","Modelo H (DDM)")}</h2>
              <p class="card-subtitle">Suporta Gordon (1 Estágio), DDM em 2 Estágios e Modelo H (Fuller-Hsia).</p>
            </div>
          </div>
          <div class="field" style="margin-bottom: 12px;">
            <label>Variante do DDM</label>
            <select class="select" data-assump-str="ddmModel">
              <option value="gordon" ${o.ddmModel==="gordon"?"selected":""}>Gordon Growth (1 Estágio)</option>
              <option value="two_stage" ${o.ddmModel==="two_stage"?"selected":""}>2 Estágios (Alto Crescimento + Perpetuidade)</option>
              <option value="h_model" ${o.ddmModel==="h_model"?"selected":""}>Modelo H — Fuller-Hsia (Fade Linear)</option>
            </select>
          </div>
          <div class="grid-2" style="gap:10px;">
            <div class="field">
              <label>Dividendo por Ação D0 (${t.currency})</label>
              <input class="input num-input" type="number" step="0.01" id="ddm-d0-input" value="${t.dividendPerShare}" />
            </div>
            <div class="field">
              <label>Crescimento Perpétuo g_L (%)</label>
              <input class="input num-input" type="number" step="0.1" data-assump="dividendGrowthRate" value="${o.dividendGrowthRate}" />
            </div>
            ${o.ddmModel!=="gordon"?`
              <div class="field">
                <label>Crescimento Inicial g_S (%)</label>
                <input class="input num-input" type="number" step="0.2" data-assump="ddmHighGrowthRate" value="${o.ddmHighGrowthRate}" />
              </div>
              <div class="field">
                <label>${o.ddmModel==="h_model"?"Período de Fade 2H (anos)":"Duração Fase 1 (anos)"}</label>
                <input class="input num-input" type="number" step="1" min="1" max="15" data-assump="ddmHighGrowthYears" value="${o.ddmHighGrowthYears}" />
              </div>
            `:""}
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <h2 class="card-title">Fluxo Projetado de Dividendos</h2>
          </div>
          ${u.valid?`
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr><th>Ano</th><th>Crescimento</th><th>Dividendo / Ação</th><th>Valor Presente</th></tr>
                </thead>
                <tbody>
                  ${u.projections.map(p=>`
                    <tr>
                      <td>Ano ${p.year}</td>
                      <td>${S(p.growthRate,2)}</td>
                      <td>${k(p.dividend,t.currency)}</td>
                      <td>${k(p.pvDividend,t.currency)}</td>
                    </tr>
                  `).join("")}
                  <tr class="row-highlight">
                    <td colspan="3">Valor Intrínseco Total (incl. Perpetuidade)</td>
                    <td>${k(u.valuePerShare,t.currency)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `:`<p style="color:var(--text-muted);">${x(u.errorMessage??"Insira D0 > 0 para visualizar a projeção.")}</p>`}
        </section>
      </div>
    `}e.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Motor de Valuation</h1>
        <p class="page-subtitle">Avaliação intrínseca (DCF FCFF/FCFE, Reverse DCF, DDM), análise de sensibilidade e avaliação relativa por pares.</p>
      </div>
    </div>

    ${ot(i)}

    <div class="subtabs" role="tablist">
      ${y.map(o=>`<button type="button" class="subtab-btn ${ue===o.id?"active":""}" data-subtab="${o.id}">${o.label}</button>`).join("")}
    </div>

    <div id="valuation-subtab-body">${f}</div>
  `,ue==="synthesis"&&m.bars.length>0&&Te("football-field-chart",Dt(m,t.currency)),e.querySelectorAll("[data-subtab]").forEach(o=>{o.addEventListener("click",()=>{ue=o.dataset.subtab,qt(e,a)})}),(h=e.querySelector("#valuation-base-select"))==null||h.addEventListener("change",o=>{const l=o.target.value,p=Ne[l];a.updateCurrentCompany(v=>{v.valuationAssumptions.valuationBase=l,v.currency=p.currency,v.valuationAssumptions.riskFreeRate=p.riskFreeRate,v.valuationAssumptions.equityRiskPremium=p.equityRiskPremium,v.valuationAssumptions.countryRiskPremium=p.countryRiskPremium,v.valuationAssumptions.costOfDebt=p.costOfDebt,v.valuationAssumptions.effectiveTaxRate=p.effectiveTaxRate,v.valuationAssumptions.marginalTaxRate=p.marginalTaxRate,v.valuationAssumptions.terminalGrowthRate=p.terminalGrowthRate,v.valuationAssumptions.dividendGrowthRate=p.dividendGrowthRate})}),e.querySelectorAll("[data-assump]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.assump,p=j(o.value,0);a.updateCurrentCompany(v=>{v.valuationAssumptions[l]=p})})}),e.querySelectorAll("[data-assump-str]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.assumpStr;a.updateCurrentCompany(p=>{p.valuationAssumptions[l]=o.value})})}),e.querySelectorAll("[data-assump-num-select]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.assumpNumSelect,p=Number(o.value);a.updateCurrentCompany(v=>{v.valuationAssumptions[l]=p})})}),e.querySelectorAll("[data-assump-bool]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.assumpBool;a.updateCurrentCompany(p=>{p.valuationAssumptions[l]=o.checked})})}),(C=e.querySelector("#sales-growth-input"))==null||C.addEventListener("change",o=>{const p=o.target.value.split(",").map(v=>j(v,NaN)).filter(v=>Number.isFinite(v));p.length>0&&a.updateCurrentCompany(v=>{v.valuationAssumptions.salesGrowth=p})}),(c=e.querySelector("#ddm-d0-input"))==null||c.addEventListener("change",o=>{const l=j(o.target.value,0);a.updateCurrentCompany(p=>{p.dividendPerShare=l})}),e.querySelectorAll("[data-scenario]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.scenario,p=o.dataset.sfield,v=j(o.value,0);a.updateCurrentCompany(E=>{E.valuationAssumptions.scenarios[l][p]=v})})}),(b=e.querySelector("#add-peer-btn"))==null||b.addEventListener("click",()=>{a.updateCurrentCompany(o=>{o.peers.push({id:`peer_${Date.now()}`,name:`Par ${o.peers.length+1}`,ticker:`PAR${o.peers.length+1}`,evToEbitda:null,evToEbit:null,evToSales:null,pe:null,pb:null,peg:null,fcfYield:null})})}),e.querySelectorAll("[data-remove-peer]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.removePeer;a.updateCurrentCompany(p=>{p.peers=p.peers.filter(v=>v.id!==l)})})}),e.querySelectorAll("[data-peer-id]").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.peerId,p=o.dataset.pfield;a.updateCurrentCompany(v=>{const E=v.peers.find(w=>w.id===l);if(E)if(p==="name"||p==="ticker")E[p]=p==="ticker"?o.value.toUpperCase():o.value;else{const w=o.value.trim();E[p]=w===""?null:j(w,0)}})})})}function pi(e,a){var D,F,_,Y;const t=a.getCurrentCompany();if(!t)return;const i=t.financials,s=t.valuationAssumptions,n=G(t),u=De(t),r=Ge(t),d=lt(t),g=Mt(t),m=ct(t),y=It(t),f=st(t),h=nt(t),C=Lt(t),c=je(i,s.marginalTaxRate,s.includeLeasesInDebt),b=Se(i),o=xe(i),l=X(i),p=me(i),v=y.bars.length>0?Ye(Dt(y,t.currency),840,320):"",E=Ye({type:"line",data:{labels:i.years,datasets:[{label:"ROIC (%)",data:c,borderColor:"#0284c7",borderWidth:2.5,tension:.25},{label:"ROE (%)",data:b,borderColor:"#059669",borderWidth:2,tension:.25},{label:"Margem EBIT (%)",data:Fe(i),borderColor:"#d97706",borderWidth:2,tension:.25},{label:"WACC (%)",data:i.years.map(()=>n.costOfCapital.wacc),borderColor:"#dc2626",borderDash:[5,4],pointRadius:0,borderWidth:1.8}]},options:{plugins:{legend:{position:"bottom"}},scales:{y:{ticks:{callback:$=>`${$}%`}}}}},760,300),w=Object.entries(_e),A=Ye(Tt(w.map(([,$])=>$.title),w.map(([$])=>Number((f.pillarScores[$]??0).toFixed(2)))),460,300);e.innerHTML=`
    <div class="page-header no-print">
      <div>
        <h1 class="page-title">Relatório Executivo & Exportação</h1>
        <p class="page-subtitle">Relatório institucional completo com gráficos renderizados em alta resolução para PDF e impressão.</p>
      </div>
      <div class="btn-group">
        <button id="rep-pdf-btn" class="btn btn-danger" type="button">
          <i data-lucide="file-text"></i> Baixar Relatório PDF
        </button>
        <button id="rep-print-btn" class="btn btn-primary" type="button">
          <i data-lucide="printer"></i> Imprimir / PDF Nativo
        </button>
        <button id="rep-csv-btn" class="btn btn-success" type="button">
          <i data-lucide="file-spreadsheet"></i> Exportar CSV
        </button>
        <button id="rep-json-btn" class="btn btn-secondary" type="button">
          <i data-lucide="download"></i> Exportar JSON
        </button>
      </div>
    </div>

    <div id="executive-report-sheet" class="report-sheet">
      <!-- Report Header -->
      <header class="report-header">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span class="ticker-badge">${x(t.companyTicker||"N/A")}</span>
            <span style="font-size:12px; color:var(--text-muted);">${x(rt[t.sectorProfile])} • ${x(t.currency)} (${x(ne[t.scale].label)})</span>
          </div>
          <h2 style="margin:0; font-size:26px; font-weight:800;">${x(t.companyName)}</h2>
        </div>
        <div style="text-align:right;">
          <div style="font-size:12px; color:var(--text-muted);">Relatório de Equity Valuation — ValuationPRO</div>
          <div style="font-size:12.5px; font-weight:600;">Gerado em ${new Date().toLocaleDateString("pt-BR")}</div>
        </div>
      </header>

      <!-- 1. Executive Summary -->
      <section class="report-section">
        <h3 class="report-section-title">1. Sumário Executivo & Veredito</h3>
        ${t.investmentThesis?`<p style="margin:0 0 16px; color:var(--text-primary); font-size:13.5px; line-height:1.6;">${x(t.investmentThesis)}</p>`:""}
        <div class="grid-4" style="margin-bottom: 16px;">
          <div class="kpi-tile">
            <span class="kpi-label">Preço Atual</span>
            <span class="kpi-value">${y.currentSharePrice>0?k(y.currentSharePrice,t.currency):"—"}</span>
          </div>
          <div class="kpi-tile primary">
            <span class="kpi-label">Valor Justo (DCF FCFF)</span>
            <span class="kpi-value brand">${n.valid?k(n.valuePerShare,t.currency):"—"}</span>
            <span class="kpi-sub">${n.valid?z(n.upsidePercent):""}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Esperado (Bear/Base/Bull)</span>
            <span class="kpi-value">${m.expectedValuePerShare>0?k(m.expectedValuePerShare,t.currency):"—"}</span>
            <span class="kpi-sub">${z(m.expectedUpsidePercent)}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Reverse DCF (CAGR Impl.)</span>
            <span class="kpi-value">${g.impliedSalesCAGR!==null?S(g.impliedSalesCAGR,1):"—"}</span>
            <span class="kpi-sub">Score Qualitativo: ${R(f.overallScore,2)} / 5</span>
          </div>
        </div>
        ${v?`<img class="report-chart-img" src="${v}" alt="Gráfico Football Field de Valuation" />`:""}
      </section>

      ${h.length>0?`<section class="report-section"><h3 class="report-section-title">Alertas & Guardrails do Modelo</h3>${ot(h)}</section>`:""}

      <!-- 2. Historical Financials & Ratios -->
      <section class="report-section">
        <h3 class="report-section-title">2. Desempenho Histórico & Criação de Valor</h3>
        <div class="table-wrap" style="margin-bottom:14px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Métrica (${x(t.currency)} ${x(ne[t.scale].shortLabel)})</th>
                ${i.years.map($=>`<th>${x($)}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              <tr><td>Receita Líquida</td>${i.netSales.map($=>`<td>${R($,1)}</td>`).join("")}</tr>
              <tr><td>EBITDA</td>${o.map($=>`<td>${R($,1)}</td>`).join("")}</tr>
              <tr><td>Lucro Líquido</td>${l.map($=>`<td>${R($,1)}</td>`).join("")}</tr>
              <tr><td>Fluxo de Caixa Livre (FCF)</td>${p.map($=>`<td>${R($,1)}</td>`).join("")}</tr>
              <tr class="row-total"><td>ROIC (%)</td>${c.map($=>`<td>${S($,1)}</td>`).join("")}</tr>
              <tr><td>ROE (%)</td>${b.map($=>`<td>${S($,1)}</td>`).join("")}</tr>
            </tbody>
          </table>
        </div>
        ${E?`<img class="report-chart-img" src="${E}" alt="Evolução ROIC vs WACC e Margens" />`:""}
      </section>

      <!-- 3. Qualitative Analysis -->
      <section class="report-section">
        <h3 class="report-section-title">3. Análise Qualitativa & Vantagens Competitivas</h3>
        <div class="grid-2" style="align-items:center;">
          <div>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Pilar Estratégico</th><th>Nota Média (1–5)</th></tr></thead>
                <tbody>
                  ${w.map(([$,N])=>`<tr><td>${x(N.title)}</td><td style="font-weight:700;">${R(f.pillarScores[$]??0,2)} / 5,00</td></tr>`).join("")}
                  <tr class="row-highlight"><td>Score Consolidado</td><td>${R(f.overallScore,2)} / 5,00</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style="text-align:center;">
            ${A?`<img class="report-chart-img" style="max-height:260px;" src="${A}" alt="Radar Qualitativo" />`:""}
          </div>
        </div>
      </section>

      <!-- 4. DCF Projection & Bridge -->
      <section class="report-section">
        <h3 class="report-section-title">4. Modelo DCF (FCFF & FCFE) e Ponte EV → Equity</h3>
        <p style="font-size:12.5px; color:var(--text-secondary); margin:0 0 12px;">
          WACC: <strong>${S(n.costOfCapital.wacc,2)}</strong> (Ke ${S(n.costOfCapital.costOfEquity,2)} | βL ${R(n.costOfCapital.leveredBeta,2)} | Kd pós-IR ${S(n.costOfCapital.afterTaxCostOfDebt,2)}) •
          Valor Terminal: <strong>${x(s.terminalMethod)}</strong> (g = ${S(s.terminalGrowthRate,2)}, ROIC term. = ${S(s.terminalROIC,1)}, ${S(n.terminalValueShareOfEV,1)} do EV) •
          DCF FCFE: <strong>${u.valid?k(u.valuePerShare,t.currency):"—"}</strong>.
        </p>
        <div class="table-wrap" style="margin-bottom:14px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Projeção FCFF</th>
                ${n.projections.map($=>`<th>${x($.yearLabel)}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              <tr><td>Receita Líquida</td>${n.projections.map($=>`<td>${R($.sales,1)}</td>`).join("")}</tr>
              <tr><td>EBIT</td>${n.projections.map($=>`<td>${R($.ebit,1)}</td>`).join("")}</tr>
              <tr><td>NOPAT</td>${n.projections.map($=>`<td>${R($.nopat,1)}</td>`).join("")}</tr>
              <tr class="row-total"><td>FCFF</td>${n.projections.map($=>`<td>${R($.fcff,1)}</td>`).join("")}</tr>
              <tr class="row-highlight"><td>VP do FCFF</td>${n.projections.map($=>`<td>${R($.pvFcff,1)}</td>`).join("")}</tr>
            </tbody>
          </table>
        </div>
        <div class="grid-4">
          <div class="kpi-tile"><span class="kpi-label">Enterprise Value</span><span class="kpi-value" style="font-size:16px;">${I(n.enterpriseValue,t.currency,t.scale)}</span></div>
          <div class="kpi-tile"><span class="kpi-label">Ajuste Ponte EV→Eq</span><span class="kpi-value" style="font-size:16px;">${I(-n.bridge.netDeductionFromEV,t.currency,t.scale)}</span></div>
          <div class="kpi-tile"><span class="kpi-label">Equity Value</span><span class="kpi-value" style="font-size:16px;">${I(n.equityValue,t.currency,t.scale)}</span></div>
          <div class="kpi-tile primary"><span class="kpi-label">Valor / Ação (FCFF)</span><span class="kpi-value brand" style="font-size:18px;">${k(n.valuePerShare,t.currency)}</span></div>
        </div>
      </section>

      <!-- 5. Sensitivity, Comps & DDM -->
      <section class="report-section">
        <h3 class="report-section-title">5. Sensibilidade (WACC × g), Comparáveis & DDM</h3>
        <div class="grid-2">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>WACC \\ g</th>
                  ${C.colValues.map($=>`<th style="text-align:center;">${S($,2)}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${C.rowValues.map(($,N)=>`
                  <tr>
                    <td style="font-weight:700;">${S($,2)}</td>
                    ${C.cells[N].map((B,Z)=>`<td style="text-align:center; ${N===2&&Z===2?"font-weight:800; background:var(--brand-50);":""}">${B.valid?k(B.valuePerShare,t.currency):"—"}</td>`).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr><th>Método Relativo / DDM</th><th>Múltiplo Mediana</th><th>Preço Implícito</th></tr>
              </thead>
              <tbody>
                ${d.peerValuations.filter($=>["evToEbitda","evToEbit","pe","pb"].includes($.metric)).map($=>`
                  <tr>
                    <td>Comps ${x($.label)}</td>
                    <td>${Q($.peerStats.median)}</td>
                    <td style="font-weight:700;">${$.impliedPriceMedian!==null?k($.impliedPriceMedian,t.currency):"—"}</td>
                  </tr>
                `).join("")}
                <tr>
                  <td>DDM (${x(r.model)})</td>
                  <td>g = ${S(r.longTermGrowth,1)}</td>
                  <td style="font-weight:700;">${r.valid?k(r.valuePerShare,t.currency):"—"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  `,(D=e.querySelector("#rep-pdf-btn"))==null||D.addEventListener("click",async()=>{const $=e.querySelector("#executive-report-sheet");if($)try{await ai($,t.companyTicker||t.companyName)}catch{te({title:"Erro ao gerar PDF",message:'Não foi possível gerar o PDF via canvas. Utilize o botão "Imprimir / PDF Nativo" como alternativa.'})}}),(F=e.querySelector("#rep-print-btn"))==null||F.addEventListener("click",()=>{window.print()}),(_=e.querySelector("#rep-csv-btn"))==null||_.addEventListener("click",()=>{Ot(t)}),(Y=e.querySelector("#rep-json-btn"))==null||Y.addEventListener("click",()=>{const $=a.exportJSON(!0),N=(t.companyTicker||t.companyName||"empresa").replace(/[^a-zA-Z0-9_-]/g,"_");Ft($,`${N}_valuation.json`)})}const mi={BarChart2:na,LayoutDashboard:va,FileSpreadsheet:ua,PieChart:ra,ClipboardCheck:ca,Calculator:sa,FileText:pa,PlusCircle:la,Plus:ha,Minus:ba,Sparkles:ya,Upload:xa,Download:da,Trash2:Ca,RefreshCw:fa,FileUp:ma,Printer:ga,CheckCircle2:oa,ArrowLeft:ia};class vi{constructor(){ge(this,"store");ge(this,"currentPage","dashboard");this.store=new Qa}init(){this.bindNavigation(),this.store.subscribe(()=>{this.renderCompanyBanner(),this.renderCurrentPage()}),this.renderCompanyBanner(),this.navigateTo("dashboard")}renderIcons(){Sa({icons:mi})}bindNavigation(){var a;document.querySelectorAll(".nav-link").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();const s=t.dataset.page;if(s){if(s!=="dashboard"&&!this.store.getCurrentCompany()){te({title:"Nenhuma empresa selecionada",message:"Inicie uma nova análise, carregue os exemplos ou selecione uma empresa no Painel primeiro."});return}this.navigateTo(s)}})}),(a=document.getElementById("banner-switch-btn"))==null||a.addEventListener("click",()=>{this.navigateTo("dashboard")})}navigateTo(a){a!=="dashboard"&&!this.store.getCurrentCompany()&&(a="dashboard"),this.currentPage=a,document.querySelectorAll(".page").forEach(t=>{t.classList.toggle("active",t.id===a)}),document.querySelectorAll(".nav-link").forEach(t=>{t.classList.toggle("active",t.dataset.page===a)}),this.renderCompanyBanner(),this.renderCurrentPage()}renderCompanyBanner(){const a=document.getElementById("company-banner"),t=this.store.getCurrentCompany();if(!a)return;if(!t||this.currentPage==="dashboard"){a.classList.add("hidden");return}a.classList.remove("hidden");const i=document.getElementById("banner-ticker"),s=document.getElementById("banner-name"),n=document.getElementById("banner-meta"),u=ve(t),r=qe(t);i&&(i.textContent=t.companyTicker||"SEM TICKER"),s&&(s.textContent=t.companyName||"Nova Empresa"),n&&(n.innerHTML=`
        <span>Moeda: <strong>${x(t.currency)}</strong> (${x(ne[t.scale].label)})</span>
        <span>Preço: <strong class="mono">${u>0?k(u,t.currency):"—"}</strong></span>
        <span>Market Cap: <strong class="mono">${r>0?I(r,t.currency,t.scale):"—"}</strong></span>
      `)}renderCurrentPage(){Za();const a=document.getElementById(this.currentPage);if(!a)return;const t=i=>this.navigateTo(i);switch(this.currentPage){case"dashboard":ii(a,this.store,t);break;case"data-input":ni(a,this.store);break;case"ratios":ri(a,this.store);break;case"qualitative":li(a,this.store);break;case"valuation":qt(a,this.store);break;case"report":pi(a,this.store);break}this.renderIcons()}}document.addEventListener("DOMContentLoaded",()=>{new vi().init()});export{ft as _};
