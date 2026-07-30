import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authService } from "@/services/auth.service";


export const authOptions: NextAuthOptions = {

  session: {
    strategy: "jwt",

    maxAge: 8 * 60 * 60, // 8 hours
  },


  jwt: {

    maxAge: 8 * 60 * 60, // 8 hours

    secret:
      process.env.NEXTAUTH_SECRET,

  },


  pages: {

    signIn: "/login",

  },


  providers: [

    CredentialsProvider({

      name: "Credentials",


      credentials: {

        email: {

          label: "Email",

          type: "email",

        },


        password: {

          label: "Password",

          type: "password",

        },

      },



      async authorize(credentials) {


        if (
          !credentials?.email ||
          !credentials?.password
        ) {

          return null;

        }



        const user =
          await authService.authenticate(
            credentials.email,
            credentials.password
          );



        if (!user) {

          return null;

        }



        return {

          id: user.id,

          name: user.name,

          email: user.email,

        };

      },


    }),

  ],





  callbacks: {


    async jwt({

      token,

      user,

    }) {


      if (user) {

        token.id =
          user.id;

      }


      return token;

    },





    async session({

      session,

      token,

    }) {


      if (
        session.user &&
        token.id
      ) {


        session.user.id =
          token.id as string;


      }



      return session;

    },


  },



  secret:
    process.env.NEXTAUTH_SECRET,

};