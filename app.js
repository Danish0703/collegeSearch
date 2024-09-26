let url = "https://universities.hipolabs.com/search?country="; // Change to HTTPS

async function searchColleges() {
    const country = document.getElementById('country').value.trim();
    const state = document.getElementById('state').value.trim();
    
    // Fetch colleges by country
    try {
        const response = await fetch(url + country);
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const colleges = await response.json();
        
        // If state is provided, filter the colleges by state
        let filteredColleges = colleges;
        if (state) {
            filteredColleges = colleges.filter(college => {
                return college.name.toLowerCase().includes(state.toLowerCase()) ||
                       (college["state-province"] && college["state-province"].toLowerCase().includes(state.toLowerCase()));
            });
        }
        
        // Display results
        displayResults(filteredColleges);
    } catch (error) {
        console.error("Error fetching college data:", error);
        alert("An error occurred while fetching data. Please try again later.");
    }
}

function displayResults(colleges) {
    const results = document.getElementById('results');
    results.innerHTML = '';
    
    if (colleges.length === 0) {
        results.textContent = 'No colleges found.';
    } else {
        colleges.forEach(college => {
            const li = document.createElement('li');
            li.textContent = `${college.name} (${college.country}${college["state-province"] ? ', ' + college["state-province"] : ''})`;
            results.appendChild(li);
        });
    }
}
