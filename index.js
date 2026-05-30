import{a as w,S as b,i as n}from"./assets/vendor-DcHCnVjq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))f(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const v="55986974-95063b7eefc1c790e2c5195a1",E="https://pixabay.com/api/";async function B(e,t=1){try{return(await w.get(E,{params:{key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}catch(s){throw new Error(`Failed to fetch images: ${s.message}`)}}const g=document.querySelector(".gallery"),h=document.getElementById("loader"),y=document.getElementById("load-more-btn");let $=new b(".gallery a",{captionsData:"alt",captionDelay:250,scrollZoom:!1});function m(e){if(!e.length)return;const t=e.map(s=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${s.largeImageURL}">
        <img
          class="gallery-image"
          src="${s.webformatURL}"
          alt="${s.tags}"
          loading="lazy"
        />
      </a>
      <div class="gallery-info">
        <p class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${s.likes}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${s.views}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${s.comments}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${s.downloads}</span>
        </p>
      </div>
    </li>
  `).join("");g.insertAdjacentHTML("beforeend",t),$.refresh()}function I(){g.innerHTML=""}function P(){h.classList.remove("loader-hidden")}function u(){h.classList.add("loader-hidden")}function p(){y.classList.remove("load-more-hidden")}function a(){y.classList.add("load-more-hidden")}const S=document.getElementById("search-form"),R=document.getElementById("load-more-btn"),M=document.querySelector(".gallery");let l="",c=1,i=0;S.addEventListener("submit",async e=>{if(e.preventDefault(),l=e.currentTarget["search-text"].value.trim(),!l){n.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}c=1,i=0,I(),a(),await L()});R.addEventListener("click",async()=>{const e=c+1;a(),await L(e)});async function L(e=c){try{P();const t=await B(l,e);if(!t.hits.length){e===1&&n.warning({title:"No results",message:`No images found for "${l}".`,position:"topRight"}),a(),u();return}i=t.totalHits,e===1?(m(t.hits),n.success({title:"Success",message:`Found ${i} images.`,position:"topRight"})):(m(t.hits),q()),c=e;const s=Math.ceil(i/15);e<s?p():(a(),n.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),u()}catch(t){u(),M.children.length>0?p():a(),n.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"}),console.error("Error fetching images:",t)}}function q(){const e=document.querySelectorAll(".gallery-item");if(e.length===0)return;const t=e[0].getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
