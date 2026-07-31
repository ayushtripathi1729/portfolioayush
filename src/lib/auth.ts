import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authService } from "@/services/auth.service";


const SESSION_MAX_AGE =
  8 * 60 * 60; // 8 hours


const INACTIVITY_TIMEOUT =
  30 * 60; // 30 minutes





export const authOptions: NextAuthOptions = {


  session: {

    strategy: "jwt",

    maxAge:
      SESSION_MAX_AGE,

  },



  jwt: {

    maxAge:
      SESSION_MAX_AGE,

    secret:
      process.env.NEXTAUTH_SECRET,

  },



  pages: {

    signIn:
      "/login",

  },



  providers: [


    CredentialsProvider({

      name:
        "Credentials",


      credentials: {

        email: {

          label:
            "Email",

          type:
            "email",

        },


        password: {

          label:
            "Password",

          type:
            "password",

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

          id:
            user.id,

          name:
            user.name,

          email:
            user.email,

        };


      },


    }),


  ],







  callbacks: {



    async jwt({

      token,

      user,

    }) {


      const now =
        Math.floor(
          Date.now() / 1000
        );





      // First login

      if (user) {


        token.id =
          user.id;


        token.lastActivity =
          now;


        token.expired =
          false;


      }






      // Inactivity timeout check

      if (

        token.lastActivity &&

        now -
          (token.lastActivity as number)
          >
          INACTIVITY_TIMEOUT

      ) {


        token.expired =
          true;


        return token;


      }






      // Refresh activity time

      token.lastActivity =
        now;





      return token;


    },









    async session({

      session,

      token,

    }) {



      // Session expired due to inactivity

      if (
        token.expired
      ) {


        return {

          ...session,

          user:
            undefined,

          expires:
            new Date(0)
              .toISOString(),

        };


      }








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