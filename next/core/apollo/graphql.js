import { gql } from "@apollo/client";

export const loginMutation = gql`
	mutation login($username: String!, $password: String!) {
		tokenAuth(username: $username, password: $password) {
			token
			payload
		}
	}
`;

export const userDetails = gql`
	query {
		userDetail {
			id
			username
			email
		}
	}
`;
