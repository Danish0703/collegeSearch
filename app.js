let url = "http://universities.hipolabs.com/search?country=";

async function searchColleges() {
    const country = document.getElementById('country').value.trim();
    const state = document.getElementById('state').value.trim();
    
    // Fetch colleges by country
    const response = await fetch(url + country);
    const colleges = await response.json();
    
    // If state is provided, filter the colleges by state
    let filteredColleges = colleges;
    if (state) {
        filteredColleges = colleges.filter(college => {
            // Check if the college name or state-related fields contain the state name
            // This is a basic filter as API does not support state natively
            return college.name.toLowerCase().includes(state.toLowerCase()) ||
                   (college["state-province"] && college["state-province"].toLowerCase().includes(state.toLowerCase()));
        });
    }
    
    // Display results
    displayResults(filteredColleges);
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
