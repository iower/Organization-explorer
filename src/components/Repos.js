import React from 'react';
import './Repos.css';

const Repo = (props) => {
	const { data } = props;
	return (
		<tr className="Repo">
			<td className="repo-stars-count">{data.stargazers_count}</td>
			<td className="repo-forks-count">{data.forks_count}</td>
			<td className="repo-open-issues-count">{data.open_issues_count}</td>
			<td>
				<h3 className="repo-name">{data.name}</h3>
				<div className="repo-description">{data.description}</div>
			</td>
			<td>
				...
			</td>
		</tr>
	);
};

const Repos = (props) => {
	const repos = props.data;
	repos.sort((repo1, repo2) => {
		return repo1.stargazers_count > repo2.stargazers_count ? -1 : 1;
	});
	return (
		<table className="Repos">
			<thead>
				<tr>
					<td>⭐</td>
					<td>🥢</td>
					<td>⚠️</td>
					<td></td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				{
					repos.map(repo => {
							return <Repo data={repo} />
						})
				}
			</tbody>
		</table>
	);
};

export default Repos;