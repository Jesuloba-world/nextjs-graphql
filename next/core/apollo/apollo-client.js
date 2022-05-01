import { InMemoryCache, ApolloClient, HttpLink } from "@apollo/client";

const createApolloClient = () => {
	const link = new HttpLink({
		uri: "http://127.0.0.1:8000/graphql/",
		credentials: "include",
	});

	return new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});
};

export default createApolloClient;
