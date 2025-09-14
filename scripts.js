// scripts.js

// Function to create a project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    // Check if this project has a CAD model to show instead of a static image
    let visualElementHtml;
    if (project.cadModel) {
        visualElementHtml = `
            <model-viewer
                src="${project.cadModel}"
                alt="3D model of ${project.title}"
                camera-controls
                auto-rotate
                ar
                shadow-intensity="1">
            </model-viewer>
        `;
    } else {
        visualElementHtml = `<img src="${project.image}" alt="${project.title}" class="project-image">`;
    }

    card.innerHTML = `
        ${visualElementHtml}
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-skills">
                ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <p class="outcome"><strong>Outcome:</strong> ${project.outcome}</p>
        </div>
    `;
    return card;
}

// Function to load projects from the JSON file
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Could not load projects:', error);
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '<p>Sorry, projects could not be loaded at this time.</p>';
    }
}

// Function to display projects in the DOM
function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    // Clear any existing placeholder content
    projectsContainer.innerHTML = '';

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

// Load the projects when the page content is fully loaded
document.addEventListener('DOMContentLoaded', loadProjects);
