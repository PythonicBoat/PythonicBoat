const fs = require('fs');
const axios = require('axios');

async function updateReadme() {
    const username = 'pythonicboat';
    const url = `https://api.github.com/users/${username}`;
    
    try {
        // Fetch GitHub profile data
        const response = await axios.get(url);
        const { 
            login, 
            followers, 
            public_repos, 
            created_at, 
            updated_at, 
            bio, 
            location, 
            company, 
            blog, 
            html_url,
            public_gists,
            following
        } = response.data;

        // Prepare data object
        const data = {
            username: login,
            bio: bio || 'No bio available',
            location: location || 'No location available',
            company: company || 'No company available',
            blog: blog || 'No blog available',
            followers,
            following,
            public_repos,
            public_gists,
            account_created_at: new Date(created_at).toLocaleDateString(),
            last_updated_at: new Date(updated_at).toLocaleDateString(),
            html_url,
            updatedate: new Date().toLocaleDateString() // New field for the update date
        };

        // Write data to data.json file
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
        console.log('Data updated successfully in data.json.');
    } catch (error) {
        console.error('Error fetching data from GitHub:', error);
    }
}

updateReadme();
