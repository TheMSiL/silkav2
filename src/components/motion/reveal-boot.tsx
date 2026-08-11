/**
 * The reveal engine, inlined into the document head.
 *
 * It runs before the body is parsed, which is the whole point: a MutationObserver
 * picks up elements as the HTML parser produces them, so content fades in while
 * the document is still streaming instead of sitting invisible until the React
 * bundle lands and then appearing all at once. It is deliberately not a React
 * component with an effect — an effect runs after hydration, which is exactly
 * the wait this exists to remove.
 *
 * Two safety properties matter more than the animation:
 *   1. Nothing is hidden unless this script has run and set `data-motion`, so a
 *      blocked or failed script leaves a fully readable page.
 *   2. It bails out under `prefers-reduced-motion` before hiding anything.
 *
 * The visibility test is a rAF-throttled sweep rather than an IntersectionObserver.
 * IO delivers entries asynchronously and drops them when the scroll position
 * jumps further than a frame — an anchor link, scroll restoration on back, or a
 * hard flick — which leaves elements hidden permanently. Measuring directly means
 * "above the fold" is always true the frame after it becomes true. The sweep only
 * runs while scrolling, only over elements not yet revealed, and unhooks itself
 * once none are left.
 */
const BOOT = `(function(){
try{
var d=document.documentElement;
if(!window.MutationObserver||!window.requestAnimationFrame)return;
if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
d.setAttribute("data-motion","on");

var pending=[],queued=false;

function sweep(){
queued=false;
var limit=window.innerHeight*0.92,keep=[];
for(var i=0;i<pending.length;i++){
var el=pending[i];
if(!el.isConnected)continue;
if(el.getBoundingClientRect().top<limit)el.setAttribute("data-reveal-in","");
else keep.push(el);
}
pending=keep;
if(!pending.length)window.removeEventListener("scroll",schedule);
}

function schedule(){if(!queued){queued=true;requestAnimationFrame(sweep)}}

function add(el){
if(el.getAttribute("data-reveal-on")==="load")return;
pending.push(el);
window.addEventListener("scroll",schedule,{passive:true});
schedule();
}

function scan(root){
if(!root||root.nodeType!==1)return;
if(root.hasAttribute("data-reveal"))add(root);
var found=root.querySelectorAll("[data-reveal]:not([data-reveal-in])");
for(var i=0;i<found.length;i++)add(found[i]);
}

new MutationObserver(function(records){
for(var i=0;i<records.length;i++){
var added=records[i].addedNodes;
for(var j=0;j<added.length;j++)scan(added[j]);
}
}).observe(d,{childList:true,subtree:true});

window.addEventListener("resize",schedule,{passive:true});
window.addEventListener("load",schedule);

function start(){
scan(document.body);
/* Images and fonts landing after the last sweep push elements around, and no
   scroll event follows. Re-sweep whenever the page changes height. */
if(window.ResizeObserver)new ResizeObserver(schedule).observe(document.body);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);
else start();
}catch(e){
/* Never leave the page hidden because of this. */
document.documentElement.removeAttribute("data-motion");
}
})();`;

export function RevealBoot() {
  return <script dangerouslySetInnerHTML={{ __html: BOOT }} />;
}
