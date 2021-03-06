import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../action-reducers/action/profileAction";
import Spinner from "../../spinner/spinner";

const ProfileGithubRepo = ({ getGithubRepos, repos, githubusername }) => {
  useEffect(() => {
    getGithubRepos(githubusername);
  }, [getGithubRepos]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo, index) => (
          <div className="repo bg-white p-1 my-1" key={repo._id}>
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
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithubRepo.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  githubUserName: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
  };
};
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithubRepo);
