    document.documentElement.dataset.theme = "dark";

    const pages = document.querySelectorAll("[data-page]");
    const links = document.querySelectorAll("[data-nav]");

    function showPage(id, push = true) {
      pages.forEach((page) => {
        page.hidden = page.id !== id;
      });

      links.forEach((link) => {
        link.toggleAttribute(
          "aria-current",
          link.getAttribute("href") === `/${id}`,
        );
      });

      if (push) {
        history.pushState({ page: id }, "", `/${id}`);
      }
    }

    // Intercept nav clicks
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("href").replace("/", "");
        showPage(id);
      });
    });

    // Handle back/forward
    globalThis.addEventListener("popstate", (event) => {
      const page = event.state?.page || "about";
      showPage(page, false);
    });

    // Initial load
    const initial = location.pathname.replace("/", "") || "about";
    showPage(initial, false);