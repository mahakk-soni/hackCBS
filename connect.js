// Function to fetch and display problem statements
async function fetchAndDisplayProblems(innovationKeyword) {
    const backendUrl = 'http://127.0.0.1:5000'; // Replace with your actual deployed URL
    const endpoint = `/api/get-innovations?keywords=${encodeURIComponent(innovationKeyword)}`;

    try {
        const response = await fetch(backendUrl + endpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 1. Target the container in your HTML (e.g., the "Digital platform..." box)
        const container = document.getElementById(innovationKeyword.replace(/\s/g, '-')); 
        
        // 2. Clear previous content and populate with new problem statements
        let htmlContent = '<ul>';
        data.problem_statements.slice(0, 5).forEach(item => { // Display top 5
            htmlContent += `<li>**${item.statement}**</li>`;
        });
        htmlContent += '</ul>';
        
        // Assume you have an inner element to show results
        container.querySelector('.results-area').innerHTML = htmlContent; 
        
    } catch (error) {
        console.error("Could not fetch data:", error);
        // Display an error message to the user
        // container.querySelector('.results-area').innerHTML = '<p>Error loading latest data.</p>';
    }
}

// Example: Trigger the fetch when the "Digital platform for small artisans" box is clicked/loaded
// fetchAndDisplayProblems('Digital platform for small artisans');
