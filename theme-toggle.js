/* theme-toggle.js — light/dark toggle, same pattern as grade6-singapore-math-cpa.
   Loaded in <head> right after course.css so the theme applies before first
   paint (no flash of the wrong theme). With no saved choice it follows the
   system setting; a click saves an explicit choice. */
(function(){
  var KEY="ai-literacy-theme";
  var root=document.documentElement;
  var saved=null;
  try{ saved=localStorage.getItem(KEY); }catch(e){}
  var mq=window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function initial(){
    if(saved==="dark"||saved==="light") return saved;
    return mq && mq.matches ? "dark" : "light";
  }
  root.setAttribute("data-theme", initial());

  // Motion follows the device's own reduce-motion setting (an accessibility setting for people whom
  // movement makes unwell). There is no on-site switch (David, 2026-10-16); set before first paint.
  var mqMotion=window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  root.setAttribute("data-motion", mqMotion && mqMotion.matches ? "off" : "on");

  function syncAll(){
    var dark=root.getAttribute("data-theme")==="dark";
    var btns=document.querySelectorAll("[data-theme-toggle]");
    for(var i=0;i<btns.length;i++){
      // The visible words are the accessible name, so it always names what a click will switch to.
      btns[i].innerHTML = dark ? '<span aria-hidden="true">☀</span> Light mode' : '<span aria-hidden="true">🌙</span> Dark mode';
    }
  }

  if(mq && mq.addEventListener){
    mq.addEventListener("change", function(e){
      if(saved) return;
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
      syncAll();
    });
  }
  if(mqMotion && mqMotion.addEventListener){
    mqMotion.addEventListener("change", function(e){
      root.setAttribute("data-motion", e.matches ? "off" : "on");
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    syncAll();
    document.addEventListener("click", function(e){
      if(!e.target.closest || !e.target.closest("[data-theme-toggle]")) return;
      var next = root.getAttribute("data-theme")==="dark" ? "light" : "dark";
      saved=next;
      try{ localStorage.setItem(KEY, next); }catch(err){}
      function apply(){ root.setAttribute("data-theme", next); syncAll(); }
      // The new theme spreads in a circle from the button (a View Transition). With reduced
      // motion, or a browser without View Transitions, it changes at once, as before.
      var calm = root.getAttribute("data-motion")==="off";
      if(calm || typeof document.startViewTransition!=="function"){ apply(); return; }
      var b = e.target.closest("[data-theme-toggle]").getBoundingClientRect();
      root.style.setProperty("--vt-x", Math.round(b.left + b.width/2) + "px");
      root.style.setProperty("--vt-y", Math.round(b.top + b.height/2) + "px");
      root.classList.add("vt-theme");
      var t = document.startViewTransition(apply);
      t.finished.then(function(){ root.classList.remove("vt-theme"); }, function(){ root.classList.remove("vt-theme"); });
    });
  });
})();
