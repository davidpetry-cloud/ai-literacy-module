/* If the page hasn't started after 6 seconds, say why. A classic script, so it still runs
   when modules can't load (for example, a page opened straight from disk). */
setTimeout(function () {
  if (document.body.dataset.ready) return;
  var what = { hub: "course", sources: "sources", lesson: "lesson" }[document.body.dataset.page] || "page";
  var box = document.getElementById("content");
  if (!box) return;
  var p = document.createElement("p");
  p.className = "warn";
  p.innerHTML = "<b>The " + what + " didn’t load.</b> It must be served over http — not opened as a file. Run <code>npm run preview</code> locally.";
  box.replaceChildren(p);
}, 6000);
