import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAllUsers } from "../../../services/fetch.service";
import { User } from "../../../types/user";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "kwan" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const payload = {
                    nickname: credentials.username,
                    token: credentials.password,
                };
                const users = await getAllUsers();
                const loginUser = users.filter((user) => credentials.username === user.nickname && credentials.password === user.token);
                if (loginUser) {
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        id: loginUser[0].id,
                        name: loginUser[0].nickname,
                    }
                } else {
                    return null
                }
            }
        })
    ],
    secret: 'test', // secret should be stored in .env
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {

                token.id = user.id
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id;
            }
            return session;
        },
    },

})