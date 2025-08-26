(() => {
  const PROD = true; // set false to debug locally
  if (!PROD) return;
  const noop = function(){};
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  // This ensures that the custom console.error is used instead of the original one,
  // preventing sensitive information from being logged.
  const origErr = console.error.bind(console);
  console.error = function(){ origErr("An error occurred."); };
})();

// =================== Nav + UI ===================
(() => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
    navLinks.forEach((link, i) => {
      link.style.animation = link.style.animation ? "" : `navLinkFade .5s ease forwards ${i/7 + .3}s`;
    });
  });

  navLinks.forEach(link =>
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      burger.classList.remove("active");
    })
  );

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(a.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
  });

  const backToTopButton = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("visible", window.pageYOffset > 300);
    document.querySelector("header").classList.toggle("scrolled", window.pageYOffset > 50);
    document.querySelectorAll(".fade-in").forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 150) { el.style.opacity = 1; el.style.transform = "translateY(0)"; }
    });
  });

  setTimeout(() => { document.querySelectorAll(".fade-in").forEach(el => el.style.opacity = 0); }, 100);
})();

// =================== GitHub Contributions ===================
(() => {
  const githubUser = "varad-kulkarni172";
  const calendarContainer = ".calendar";

  // Directly render the GitHub calendar without year selection
  GitHubCalendar(calendarContainer, githubUser, {
    global_stats: false,
    responsive: true,
    summary_text: "",
    year: "last" 
  });
})();

// Remove the injected "Skip to contributions year list" element
setTimeout(() => {
  document.querySelectorAll('.calendar a').forEach(el => {
    if (el.textContent.includes("Skip to contributions year list")) {
      el.remove();
    }
  });
}, 1000);


// Force remove the "Skip to contributions year list" text after calendar renders
setTimeout(() => {
  const footer = document.querySelector(".calendar .contrib-footer");
  if (footer) footer.remove();

  const skipLink = document.querySelector('.calendar a[href*="contributions"]');
  if (skipLink) skipLink.remove();
}, 1000);
