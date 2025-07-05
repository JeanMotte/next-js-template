// src/app/page.tsx
import { Button } from "@mui/material";
import { auth, signIn, signOut } from "./auth";
import ExampleForm from "./(component)/ExampleForm";

function SignIn() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("keycloak");
			}}
		>
			<Button type="submit" variant="contained">
				Sign in with Keycloak
			</Button>
		</form>
	);
}

function SignOut({ name }: { name?: string | null }) {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<div style={{ marginBottom: "1rem" }}>
				Hello, {name || "User"}!
			</div>
			<Button type="submit" variant="outlined">
				Sign Out
			</Button>
		</form>
	);
}

export default async function Home() {
	const session = await auth();

	return (
		<main
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				padding: "2rem",
			}}
		>
			<div style={{ marginBottom: "2rem" }}>
				{session?.user ? <SignOut name={session.user.name} /> : <SignIn />}
			</div>

			{session?.user && (
				<div>
					<h2>Example Form (Client Component)</h2>
					<ExampleForm />
				</div>
			)}
		</main>
	);
}