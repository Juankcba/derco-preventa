import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { dbUsers } from '../../../database';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID!,
        //     clientSecret: process.env.GITHUB_SECRET!,
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID!,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        // ...add more providers here
        CredentialsProvider({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
            },
            async authorize(credentials) {
                console.log({ credentials })
                // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);

            }
        }),
    ],
    // Custom Pages

    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },
    // Callbacks
    jwt: {
        // secret: process.env.JWT_SECRET_SEED, // deprecated
    },

    session: {
        maxAge: 2592000, /// 30d
        strategy: 'jwt',
        updateAge: 86400, // cada día
    },


    callbacks: {

        async jwt({ token, account, user }) {
            //console.log({ token, account, user });

            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {

                    case 'oauth':
                        token.user = await dbUsers.oAUthToDbUser(user?.email || '', user?.name || '', user?.image || '');
                        break;

                    case 'credentials':
                        token.user = user;
                        break;
                }

            }

            return token;
        },


        async session({ session, token, user }) {
            // console.log({ session, token, user });

            session.accessToken = token.accessToken;
            session.user = token.user as any;

            return session;
        }


    }

}



export default NextAuth(authOptions)  