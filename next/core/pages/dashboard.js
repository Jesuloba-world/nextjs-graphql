import { useQuery } from "@apollo/client";
import { userDetails } from "../apollo/graphql";
import { useAuthentication } from "../apollo/authorization";
import Router from "next/router";

function Dashboard() {
	const { isSignedIn } = useAuthentication();

	function Check() {
		if (isSignedIn()) return <p>YOU ARE SIGNED IN!</p>;
	}

	const { data, loading } = useQuery(userDetails);

	if (loading) {
		return <>Page Loading...</>;
	}

	return (
		<>
			<Check />
			How are you doing {data.userDetail.username} ?
		</>
	);
}

export default Dashboard;
