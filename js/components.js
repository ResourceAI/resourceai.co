// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // Update active state in sidebar
        const currentPath = window.location.pathname.split('/').pop();
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        
        sidebarLinks.forEach(link => {
            link.classList.remove('w--current');
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('w--current');
            }
        });
    } catch (error) {
        console.error('Error loading component:', error);
        document.getElementById(elementId).innerHTML = '<p>Error loading component. Please ensure you\'re using a local development server (see README.md)</p>';
    }
} 