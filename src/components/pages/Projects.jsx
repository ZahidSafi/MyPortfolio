import React, { useEffect } from "react";
import ProjectItems from "./ProjectItems";

const Projects = () => {
  const [repoData, setRepoData] = React.useState([]);

  useEffect(() => {
    const url = "https://api.github.com/users/ZahidSafi/repos";
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error getting repo data");
        }
      })
      .then((repos) => {
        const filteredRepos = repos
          .filter((repo) => (!repo.fork && repo.name !== "ZahidSafiResume"))
          .map((repo) => {
            return {
              name: repo.name,
              description: repo.description,
              languages: repo.topics,
              html_url: repo.html_url,
            };
          });
        setRepoData(filteredRepos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-screen-xl flex flex-col items-center justify-between mx-auto p-4 opacity-0 animate-fade-in-down">
      <h1 className="text-5xl text-center font-extrabold mb-5 text-white opacity-0 animate-fade-in-down">
        My Past <strong className="text-purple-400"> Projects</strong>
      </h1>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {repoData.map((repo, index) => {
          return (
            <ProjectItems
              key={index}
              index={index}
              name={repo.name}
              description={repo.description}
              languages={repo.languages}
              repoLink={repo.html_url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
