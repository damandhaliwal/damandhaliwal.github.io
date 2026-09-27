(function () {
  var root = document.querySelector("[data-home-panels]");
  if (!root) return;

  var panels = Array.prototype.slice.call(root.querySelectorAll("[data-home-panel]"));
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-home-panel-target]"));
  var panelNames = panels.map(function (panel) {
    return panel.getAttribute("data-home-panel");
  });

  if (!panels.length || !links.length) return;

  function validTarget(target) {
    return panelNames.indexOf(target) !== -1;
  }

  function showPanel(target, options) {
    options = options || {};
    if (!validTarget(target)) target = "about";

    panels.forEach(function (panel) {
      var active = panel.getAttribute("data-home-panel") === target;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    root.setAttribute("data-active-panel", target);

    links.forEach(function (link) {
      if (link.getAttribute("data-home-panel-target") === target) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (options.updateHistory) {
      var url = new URL(window.location.href);
      url.hash = options.reset ? "" : target;
      window.history.pushState({ homePanel: target }, "", url.pathname + url.search + url.hash);
    }

    document.documentElement.classList.add("home-panels-ready");

    if (options.scroll !== false) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();

      var target = link.getAttribute("data-home-panel-target");
      showPanel(target, {
        updateHistory: true,
        reset: link.hasAttribute("data-home-panel-reset")
      });
    });
  });

  window.addEventListener("popstate", function () {
    var target = window.location.hash.slice(1) || "about";
    showPanel(target);
  });

  var initialTarget = window.location.hash.slice(1) || "about";
  showPanel(initialTarget, {
    scroll: initialTarget !== "about"
  });
})();
