import type { GitHubUser } from "../types";

type SuggestionDropdownProps = {
	suggestions: GitHubUser[];
	onSelect: (username: string) => void;
};
export default function SuggestionDropdown({
	suggestions,
	onSelect,
}: SuggestionDropdownProps) {
	console.log(suggestions);
	return (
		<ul className="suggestions">
			{suggestions.slice(0, 5).map((user: GitHubUser) => (
				<li key={user.login} onClick={() => onSelect(user.login)}>
					<img src={user.avatar_url} alt={user.login} className="avatar-xs" />
					{user.login}
				</li>
			))}
		</ul>
	);
}
