import axios from 'axios';

export const handler = async (event) => {

    let resp = {
        statusCode: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: ""
    }
    console.log("Calling github api");

    const url = `https://api.github.com/users/ZakYeo/repos?sort=created&per_page=10`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });
        resp.body = JSON.stringify(response.data.map(repo => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description
        })));
    } catch (error) {
        console.error('Error fetching projects:', error);
        resp.body = JSON.stringify({ message: "Failed to fetch projects", error: error.message });
    }

    resp.statusCode = 200;
    console.log("Success", resp);
    return resp;
};