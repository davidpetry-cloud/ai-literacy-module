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

  function syncAll(){
    var dark=root.getAttribute("data-theme")==="dark";
    var btns=document.querySelectorAll("[data-theme-toggle]");
    for(var i=0;i<btns.length;i++){
      btns[i].setAttribute("aria-pressed", String(dark));
      btns[i].textContent = dark ? "☀ Light" : "🌙 Dark";
    }
  }

  if(mq && mq.addEventListener){
    mq.addEventListener("change", function(e){
      if(saved) return;
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
      syncAll();
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    syncAll();
    document.addEventListener("click", function(e){
      if(!e.target.closest || !e.target.closest("[data-theme-toggle]")) return;
      var next = root.getAttribute("data-theme")==="dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      saved=next;
      try{ localStorage.setItem(KEY, next); }catch(err){}
      syncAll();
    });
  });
})();
