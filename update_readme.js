const fs = require('fs');
const axios = require('axios');

async function updateReadme() {
    const username = 'pythonicboat';
    const url = `https://api.github.com/users/${username}`;
    
    try {
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

        const readmeContent = `
# ${login}'s GitHub Profile

- **Username:** [${login}](${html_url})
- **Bio:** ${bio || 'No bio available'}
- **Location:** ${location || 'No location available'}
- **Company:** ${company || 'No company available'}
- **Blog:** ${blog ? `[${blog}](${blog})` : 'No blog available'}
- **Followers:** ${followers}
- **Following:** ${following}
- **Public Repositories:** ${public_repos}
- **Public Gists:** ${public_gists}
- **Account Created At:** ${new Date(created_at).toLocaleDateString()}
- **Last Updated At:** ${new Date(updated_at).toLocaleDateString()}

Updated on: ${new Date().toLocaleDateString()}
        `;

        fs.writeFileSync('README.md', readmeContent);
        console.log('README.md updated successfully.');
    } catch (error) {
        console.error('Error fetching data from GitHub:', error);
    }
}

updateReadme();
