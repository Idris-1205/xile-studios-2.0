document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".site-loader");
  if (!loader) return;

  const loaderSeen = sessionStorage.getItem("xileLoaderSeen");
  const hideLoader = () => loader.classList.add("is-hidden");

  if (loaderSeen) {
    hideLoader();
    return;
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      hideLoader();
      sessionStorage.setItem("xileLoaderSeen", "true");
    }, 900);
  });
});
