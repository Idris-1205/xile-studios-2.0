function setYear() {
  const yearElements = document.querySelectorAll("#year");
  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

function createProjectCard(project) {
  return `
    <article class="project-card reveal is-visible">
      <div class="project-card__image">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
      </div>
      <div class="project-card__content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-card__actions">
          <a class="text-link" href="${project.url}" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
      </div>
    </article>
  `;
}

function renderProjects() {
  if (!window.XILE_PROJECTS || !Array.isArray(window.XILE_PROJECTS)) return;

  const homeProjects = document.getElementById("home-projects");
  const allProjects = document.getElementById("all-projects");

  if (homeProjects) {
    homeProjects.innerHTML = window.XILE_PROJECTS
      .slice(0, 3)
      .map(createProjectCard)
      .join("");
  }

  if (allProjects) {
    allProjects.innerHTML = window.XILE_PROJECTS
      .map(createProjectCard)
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  renderProjects();
});