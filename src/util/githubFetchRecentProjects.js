import axios from 'axios';



/**
 * Fetches the most recent projects of a GitHub user.
 * Note: The use of .env for storing the GitHub API key is TEMPORARY
 * and should be moved to server-side in a production environment to keep the API key secure.
 *
 * @param {string} username - The GitHub username to fetch projects for.
 * @param {number} count - The number of most recent projects to fetch.
 * @returns {Promise<Array>} A promise that resolves to an array of the user's most recent projects.
 */
const fetchRecentProjects = async (username, count) => {
    const url = `https://api.github.com/users/${username}/repos?sort=created&per_page=${count}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });
        return response.data.map(repo => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description
        }));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export default fetchRecentProjects;
