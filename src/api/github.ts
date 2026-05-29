export const fetchGithubUser = async (username: string) => {
	const res = await fetch(
		`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`,
	);
	if (!res.ok) throw new Error("username not found");
	const data = await res.json();
	return data;
};

export const searchGithubUser = async (query: string) => {
	const res = await fetch(
		`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`,
	);
	if (!res.ok) throw new Error("no user found");
	const data = await res.json();
	return data.items;
};

//check if following a user on Github

export const checkIfFollowingUser = async (username: string) => {
	const res = await fetch(
		`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
		{
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
				Acceopt: "application/vnd.github+json",
			},
		},
	);
	if (res.status === 204) {
		return true; //following
	} else if (res.status === 404) {
		return false; //not following
	} else {
		const errorData = await res.json().catch(() => null);
		throw new Error(errorData.message || "Failed to check follow status");
	}
};

//follow user on Github
export const followGithubUser = async (username: string) => {
	const res = await fetch(
		`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
		{
			method: "PUT",
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
				Acceopt: "application/vnd.github+json",
				"Content-Type": "application/json",
			},
		},
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Failed to follow user");
	}
	return true;
};

//unfollow user on Github
export const unfollowGithubUser = async (username: string) => {
	const res = await fetch(
		`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
				Acceopt: "application/vnd.github+json",
				"Content-Type": "application/json",
			},
		},
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Failed to unfollow user");
	}
	return true;
};
