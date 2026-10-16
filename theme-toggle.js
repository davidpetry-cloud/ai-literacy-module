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

  // Motion preference: a saved choice wins; otherwise follow the device's reduce-motion setting.
  // Set before first paint, so nothing animates for someone who has turned motion off.
  var MKEY="ai-literacy-motion";
  var savedMotion=null;
  try{ savedMotion=localStorage.getItem(MKEY); }catch(e){}
  var mqMotion=window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  function motionInitial(){
    if(savedMotion==="on"||savedMotion==="off") return savedMotion;
    return mqMotion && mqMotion.matches ? "off" : "on";
  }
  root.setAttribute("data-motion", motionInitial());

  function syncAll(){
    var dark=root.getAttribute("data-theme")==="dark";
    var btns=document.querySelectorAll("[data-theme-toggle]");
    for(var i=0;i<btns.length;i++){
      // The visible words are the accessible name, so it always names what a click will switch to.
      btns[i].innerHTML = dark ? '<span aria-hidden="true">☀</span> Light mode' : '<span aria-hidden="true">🌙</span> Dark mode';
    }
    var moving=root.getAttribute("data-motion")!=="off";
    var mbtns=document.querySelectorAll("[data-motion-toggle]");
    for(var j=0;j<mbtns.length;j++){
      mbtns[j].textContent = moving ? "Reduce motion" : "Allow motion";
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
      if(savedMotion) return;
      root.setAttribute("data-motion", e.matches ? "off" : "on");
      syncAll();
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    syncAll();
    document.addEventListener("click", function(e){
      if(e.target.closest && e.target.closest("[data-motion-toggle]")){
        var m = root.getAttribute("data-motion")==="off" ? "on" : "off";
        root.setAttribute("data-motion", m);
        savedMotion=m;
        try{ localStorage.setItem(MKEY, m); }catch(err){}
        syncAll();
        var say=document.getElementById("announce");
        if(say) say.textContent = m==="off" ? "Motion is off." : "Motion is on.";
        return;
      }
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
