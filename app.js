const baseUrl = "http://universities.hipolabs.com/search?";

// Function to search colleges by country and state
async function searchColleges() {
    const country = document.getElementById('country').value.trim();
    const state = document.getElementById('state').value.trim();
    
    if (!country) {
        alert("Please enter a country.");
        return;
    }

    // Construct the URL based on whether the state is provided
    let searchUrl = `${baseUrl}country=${country}`;
    if (state) {
        searchUrl += `&state-province=${state}`;
    }

    try {
        const response = await fetch(searchUrl);
        const colleges = await response.json();
        
        if (colleges.length === 0) {
            alert("No colleges found for the entered country or state.");
        } else {
            displayResults(colleges);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching college data. Please try again.");
    }
}

// Function to display search results
function displayResults(colleges) {
    const results = document.getElementById('results');
    results.innerHTML = '';  // Clear previous results

    colleges.forEach(college => {
        const li = document.createElement('li');
        li.textContent = `${college.name} (${college['state-province'] || 'N/A'})`;
        results.appendChild(li);
    });
}
