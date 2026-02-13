(() => {
  const PROD = true;
  if (!PROD) return;
  const noop = function () { };
  console.log = noop;
  console.info = noop;
  console.debug = noop;


  const origErr = console.error.bind(console);
  console.error = function () { origErr("An error occurred."); };
})();


(() => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
    navLinks.forEach((link, i) => {
      link.style.animation = link.style.animation ? "" : `navLinkFade .5s ease forwards ${i / 7 + .3}s`;
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


(() => {
  const githubUser = "varad-kulkarni172";
  const calendarContainer = ".calendar";


  GitHubCalendar(calendarContainer, githubUser, {
    global_stats: false,
    responsive: true,
    summary_text: "",
    year: "last"
  });
})();


setTimeout(() => {
  document.querySelectorAll('.calendar a').forEach(el => {
    if (el.textContent.includes("Skip to contributions year list")) {
      el.remove();
    }
  });
}, 1000);



setTimeout(() => {
  const footer = document.querySelector(".calendar .contrib-footer");
  if (footer) footer.remove();

  const skipLink = document.querySelector('.calendar a[href*="contributions"]');
  if (skipLink) skipLink.remove();
}, 1000);


(() => {  
  const firebaseConfig = {
    apiKey: "AIzaSyAdEeCMgOVJkP0owJKmQUJ7WzZVDDOn9nQ",
    authDomain: "varad-portfolio-344d2.firebaseapp.com",
    projectId: "varad-portfolio-344d2",
    storageBucket: "varad-portfolio-344d2.firebasestorage.app",
    messagingSenderId: "279433494647",
    appId: "1:279433494647:web:8403c51bf2f8d8f9e14672",
    measurementId: "G-L1CHB6HQB8"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const database = firebase.database();
  const visitorRef = database.ref('totalVisitors');
  const logoElement = document.getElementById('visitor-logo');
  const adminViewCount = document.getElementById('viewCount');
  
  visitorRef.transaction((currentValue) => {
    return (currentValue || 0) + 1;
  });

visitorRef.on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    
    if (logoElement) {
      logoElement.innerHTML = `Visitors Count: ${count.toLocaleString()}`;
    }

    if (adminViewCount) {
      adminViewCount.innerText = count.toLocaleString();
    }
  });
})();