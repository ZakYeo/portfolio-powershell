import fetchRecentProjects from "../util/githubFetchRecentProjects";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchRecentProjectsAsync = async () => {
      try {
        const fetchedProjects = await fetchRecentProjects("ZakYeo", 5);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchRecentProjectsAsync();
  }, []);

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index}>
          <h3>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
