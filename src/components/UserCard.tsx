import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
	checkIfFollowingUser,
	followGithubUser,
	unfollowGithubUser,
} from "../api/github";
import type { GitHubUser } from "../types";
import { FaGithubAlt, FaUserMinus, FaUserPlus } from "react-icons/fa";

export default function UserCard({ user }: { user: GitHubUser }) {
	// check if following user
	const { data: isFollowing, refetch } = useQuery({
		queryKey: ["follow-status", user.login],
		queryFn: () => checkIfFollowingUser(user.login),
		enabled: !!user.login,
	});

	// mutation to follow user
	const followMutation = useMutation({
		mutationFn: () => followGithubUser(user.login),
		onSuccess: () => {
			toast.success(`You are now following ${user.login}`);
			refetch();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	// mutation to unfollow user
	const unfollowMutation = useMutation({
		mutationFn: () => unfollowGithubUser(user.login),
		onSuccess: () => {
			toast.success(`You just unfollow  ${user.login}`);
			refetch();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const handleFollow = () => {
		if (isFollowing) {
			//Todo unfollow
			unfollowMutation.mutate();
		} else {
			//Todo follow
			followMutation.mutate();
		}
	};
	return (
		<div className="user-card">
			<img src={user.avatar_url} alt={user.name} className="avatar" />
			<h2>{user.name || user.login}</h2>
			<p className="bio">{user.bio}</p>
			<div className="user-card-buttons">
				<button
					disabled={followMutation.isPending || unfollowMutation.isPending}
					onClick={handleFollow}
					className={`follow-btn ${isFollowing ? "following" : ""}`}
				>
					{isFollowing ? (
						<>
							<FaUserMinus className="follow-icon" /> Following
						</>
					) : (
						<>
							<FaUserPlus className="follow-icon" /> Follow User
						</>
					)}
				</button>

				<a
					href={user.html_url}
					className="profile-btn"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithubAlt /> View GitHub Proflie
				</a>
			</div>
		</div>
	);
}
