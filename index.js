import{a as b,S as n,i}from"./assets/vendor-DcHCnVjq.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))p(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&p(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function p(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();const v="55986974-95063b7eefc1c790e2c5195a1",E="https://pixabay.com/api/";async function B(e,s=1){try{return(await b.get(E,{params:{key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}})).data}catch(t){throw new Error(`Failed to fetch images: ${t.message}`)}}const g=document.querySelector(".gallery"),y=document.getElementById("loader"),w=document.getElementById("load-more-btn");n&&n.prototype&&!n.prototype._patchedRefresh&&(n.prototype.refresh,n.prototype.refresh=function(){if(!this.initialSelector)throw"refreshing only works when you initialize using a selector!";const e=this.options,s=this.initialSelector;this.destroy();const t=new this.constructor(s,e);return t._patchedRefresh=!0,t},n.prototype._patchedRefresh=!0);let h=new n(".gallery a",{captionsData:"alt",captionDelay:250,scrollZoom:!1});function m(e){if(!e.length)return;const s=e.map(t=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${t.largeImageURL}">
        <img
          class="gallery-image"
          src="${t.webformatURL}"
          alt="${t.tags}"
          loading="lazy"
        />
      </a>
      <div class="gallery-info">
        <p class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${t.likes}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${t.views}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${t.comments}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${t.downloads}</span>
        </p>
      </div>
    </li>
  `).join("");g.insertAdjacentHTML("beforeend",s),h=h.refresh()}function R(){g.innerHTML=""}function S(){y.classList.remove("loader-hidden")}function f(){y.classList.add("loader-hidden")}function $(){w.classList.remove("load-more-hidden")}function l(){w.classList.add("load-more-hidden")}const I=document.getElementById("search-form"),P=document.getElementById("load-more-btn");document.querySelector(".gallery");let d="",a=1,c=0;I.addEventListener("submit",async e=>{if(e.preventDefault(),d=e.currentTarget["search-text"].value.trim(),!d){i.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}a=1,c=0,R(),l(),await L()});P.addEventListener("click",async()=>{a+=1,await L()});async function L(){try{S();const e=await B(d,a);if(!e.hits.length){a===1&&i.warning({title:"No results",message:`No images found for "${d}".`,position:"topRight"}),l(),f();return}c=e.totalHits,a===1?(m(e.hits),i.success({title:"Success",message:`Found ${c} images.`,position:"topRight"})):(m(e.hits),M());const s=Math.ceil(c/15);a<s?$():(l(),i.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),f()}catch(e){f(),l(),i.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"}),console.error("Error fetching images:",e)}}function M(){const e=document.querySelectorAll(".gallery-item");if(e.length===0)return;const s=e[0].getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
