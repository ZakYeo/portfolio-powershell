import fetchRecentProjects from "../util/githubFetchRecentProjects";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchRecentProjectsAsync = async () => {
      try {
        const fetchedProjects = await fetchRecentProjects();
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
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "1rem",
              paddingBottom: "0.5rem",
            }}
          >
            <a
              href={project.url}
              style={{ fontSize: "1.5rem" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}{" "}
            </a>
            <div style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
              Created{" "}
              {new Date(project.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              | {project.language}
            </div>
          </div>
          <div style={{ fontStyle: "italic" }}>
            Last Updated{" "}
            {new Date(project.pushed_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
