const sidebar = document.getElementById('sidebar');
        const hamburgerButton = document.getElementById('hamburger-button');
        const body = document.body;
    
        hamburgerButton.addEventListener('click', () => {
          sidebar.classList.toggle('-translate-x-full');
        });

        body.addEventListener('click', (event) => {
      if (!sidebar.contains(event.target) && !hamburgerButton.contains(event.target)) {
        sidebar.classList.add('-translate-x-full');
      }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu-link");
    const pageContents = document.querySelectorAll(".page-content");
  
    pageContents.forEach(function (content) {
      content.style.display = "none"; // Hide all page contents by default
    });

    document.getElementById("home").style.display = "block";

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const contentId = link.getAttribute("data-content");
        pageContents.forEach(function (content) {
          content.style.display = "none";
        });
        document.getElementById(contentId).style.display = "block";
      });
    });
  });

