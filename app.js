const url = "http://universities.hipolabs.com/search?country=";

async function searchColleges() {
    const country = document.getElementById('country').value.trim();
    const state = document.getElementById('state').value.trim();

    if (!country) {
        alert("Please enter a country.");
        return;
    }

    // Construct the complete URL
    const fetchUrl = url + encodeURIComponent(country); // Encode country for URL

    // Log the URL being fetched
    console.log("Fetching data from:", fetchUrl);

    // Fetch colleges by country
    try {
        const response = await fetch(fetchUrl);

        // Log the response status
        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const colleges = await response.json();

        // If state is provided, filter the colleges by state
        let filteredColleges = colleges;
        if (state) {
            filteredColleges = colleges.filter(college => {
                return (
                    college.name.toLowerCase().includes(state.toLowerCase()) ||
                    (college["state-province"] && college["state-province"].toLowerCase().includes(state.toLowerCase()))
                );
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
