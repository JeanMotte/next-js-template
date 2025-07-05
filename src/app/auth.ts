import { DrizzleAdapter } from "@auth/drizzle-adapter"

import NextAuth from "next-auth"

import Keycloak from "next-auth/providers/keycloak"

import { db } from "../app/server/database"

import {
	accounts,
	sessions,
	users,
	verificationTokens,
} from "../app/server/database/schema"

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Keycloak({
			clientId: process.env.KEYCLOAK_AUTH_CLIENT_ID,
			clientSecret: process.env.KEYCLOAK_AUTH_CLIENT_SECRET,
			issuer: process.env.KEYCLOAK_ISSUER,
			profile: async (profile) => {
				return {
					...profile,
					id: profile.sub,
					firstName: profile.given_name,
					lastName: profile.family_name,
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
})
