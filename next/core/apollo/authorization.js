import React, { useState, useContext, createContext } from "react";
import { loginMutation } from "./graphql";
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";
import Router from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const auth = userAuthentication();

	return (
		<AuthContext.Provider value={auth}>
			<ApolloProvider client={auth.createApolloClient()}>
				{children}
			</ApolloProvider>
		</AuthContext.Provider>
	);
};

export const useAuthentication = () => {
	const auth = useContext(AuthContext);
	return auth;
};

function userAuthentication() {
	const [authToken, setAuthToken] = useState(null);
	const [username, setUsername] = useState(null);

	const isSignedIn = () => {
		if (authToken) {
			return true;
		} else {
			return false;
		}
	};

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

	const signIn = async ({ username, password }) => {
		const client = createApolloClient();

		const { data } = await client.mutate({
			mutation: loginMutation,
			variables: { username, password },
		});

		if (data?.tokenAuth?.token) {
			setAuthToken(data.tokenAuth.token);
			setUsername(data.tokenAuth.payload.username);
			Router.push("/dashboard");
		}
	};

	return { signIn, createApolloClient, isSignedIn };
}
