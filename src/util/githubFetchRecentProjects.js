import axios from "axios";

/**
 * Fetches the most recent projects of a GitHub user.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of the user's most recent projects.
 */
const fetchRecentProjects = async () => {
  const url = `https://7rt1o1m8b3.execute-api.eu-west-2.amazonaws.com/dev/github-projects/list`;
    const response = await axios.get(url, {});
  if(response.status === 200){
    return response.data.map((repo) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      language: repo.language,
    }));
  }else{
    return [];
  }
};

export default fetchRecentProjects;
