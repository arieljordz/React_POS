
function ActiveMenu(id) {
  var targetObj = document.getElementById(id);
  var navSidebar = document.querySelector(".nav-sidebar");

  var menuOpenElements = navSidebar.querySelectorAll(".menu-open");
  menuOpenElements.forEach(function (element) {
    element.classList.remove("menu-open");
  });

  var navLinkElements = navSidebar.querySelectorAll(".nav-link");
  navLinkElements.forEach(function (element) {
    element.classList.remove("active");
  });

  var navItemElements = document.querySelectorAll(".nav-item");
  navItemElements.forEach(function (element) {
    element.classList.remove("menu-open");
  });

  setTimeout(function () {
    var currObj = targetObj;
    if (currObj.classList.contains("nav-link")) {
      currObj.classList.add("active");
    }
    while (!currObj.classList.contains("nav-sidebar")) {
      if (currObj.classList.contains("nav")) {
        currObj.style.display = "block";
      }
      if (currObj.classList.contains("nav-item")) {
        currObj.classList.add("menu-open");
      }
      currObj = currObj.parentNode;
    }
  }, 100);
}

export default ActiveMenu;
