let menu = document.querySelector(".menu-icone");

menu.onclick = () => {
  menu.classList.toggle("move");
};

const secoes = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (enters) => {
    enters.forEach((enter) => {
      if (enter.isIntersecting) {
        const secao = enter.target;
        const url = secao.getAttribute("data-src");

        if (url) {
          fetch(url)
            .then((res) => res.text())
            .then((html) => {
              secao.innerHTML = html;
              observer.unobserve(secao);
            })
            .catch(() => {
              secao.innerHTML = "<h3>Erro ao carreg</h3>";
            });
        }
      }
    });
  },
  {
    rootMargin: "0px 0px -20% 0px",
    threshold: 0.1,
  }
);

secoes.forEach((sec) => observer.observe(sec));
