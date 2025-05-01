const apiUrl = 'http://localhost:3000/api/entries';

// Fetch existing journal entries
async function fetchEntries() {
    const response = await fetch(apiUrl);
    const entries = await response.json();
    const entriesList = document.getElementById('entries-list');

    entries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.timestamp}: ${entry.content}`;
        entriesList.appendChild(li);
    });
}

// Post a new entry
async function postEntry(entryContent) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: entryContent }),
    });

    if (response.ok) {
        fetchEntries(); // Refresh the list
    }
}

// Add event listener to the form (for submitting new entries)
document.getElementById('entry-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const entryContent = document.getElementById('entry-input').value;
    postEntry(entryContent);
});

fetchEntries(); // Load existing entries when the page loads
