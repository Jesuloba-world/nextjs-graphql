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

export const allProductsQuery = gql`
	query Products {
		allProducts {
			id
			title
			description
			regularPrice
			slug
			productImage {
				image
				altText
			}
		}
	}
`;

export const allCategoriesQuery = gql`
	query Categories {
		allCategories {
			id
			name
			slug
		}
	}
`;

export const getProductSlugQuery = gql`
	{
		allProducts {
			slug
		}
	}
`;

export const productByNameQuery = gql`
	query ($slug: String!) {
		productByName(slug: $slug) {
			id
			title
			description
			regularPrice
			productImage {
				id
				image
				altText
			}
		}
	}
`;

export const CategoryByNameQuery = gql`
	query ($name: String!) {
		categoryByName(name: $name) {
			id
			name
			products {
				id
				title
				description
				regularPrice
				productImage {
					id
					image
					altText
				}
			}
		}
	}
`;
