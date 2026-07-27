const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector(".cta-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target.querySelector("input");
  alert(`Thanks! We'll notify ${input.value} when FlyRank launches.`);
  input.value = "";
});
