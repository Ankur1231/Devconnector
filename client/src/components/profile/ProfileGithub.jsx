import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";

//redux
import { getGithubRepos } from "../../store/profile-actions";

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.profile.repos);

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, []);

  if (repos.length === 0) {
    return (
      <div className="profile-github">
        <h2 className="text-primary my-1">Github Repos</h2>
        <p className="text-primary">No Repos Found</p>
      </div>
    );
  }

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>
                {repo.description === null
                  ? "No description"
                  : repo.description}
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li class="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li class="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileGithub;
