import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AuthSessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});





export const metadata: Metadata = {

  metadataBase:
    new URL(
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000"
    ),


  title: {

    default:
      "Ayush Tripathi | Computer Science Engineer",

    template:
      "%s | Ayush Tripathi",

  },


  description:
    "Ayush Tripathi is a Computer Science Engineer specializing in Competitive Programming, Artificial Intelligence, Machine Learning, Cybersecurity, and Full Stack Development.",



  keywords: [

    "Ayush Tripathi",

    "Computer Science Engineer",

    "Software Engineer",

    "Competitive Programming",

    "Artificial Intelligence",

    "Machine Learning",

    "Cybersecurity",

    "Full Stack Developer",

    "Next.js",

    "React",

    "TypeScript",

    "C++",

    "Python",

  ],



  authors: [

    {
      name:
        "Ayush Tripathi",
    },

  ],



  creator:
    "Ayush Tripathi",



  openGraph: {

    type:
      "website",

    locale:
      "en_US",

    url:
      "/",

    title:
      "Ayush Tripathi | Computer Science Engineer",

    description:
      "Portfolio of Ayush Tripathi — CS Engineer, Competitive Programmer, AI and Cybersecurity Enthusiast.",

    siteName:
      "Ayush Tripathi Portfolio",

  },



  twitter: {

    card:
      "summary_large_image",

    title:
      "Ayush Tripathi | Computer Science Engineer",

    description:
      "Portfolio showcasing projects, research, skills, and achievements.",

  },


  robots: {

    index:
      true,

    follow:
      true,

  },

};







export const viewport: Viewport = {

  width:
    "device-width",

  initialScale:
    1,

  themeColor:
    "#000000",

};








export default function RootLayout({

  children,

}: Readonly<{

  children:
    React.ReactNode;

}>) {


  return (

    <html

      lang="en"

      suppressHydrationWarning

      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}

    >

      <body

        className="
          min-h-screen
          flex
          flex-col
          bg-background
          text-foreground
        "

      >

        <ThemeProvider>

          <AuthSessionProvider>

            {children}

          </AuthSessionProvider>

        </ThemeProvider>


      </body>


    </html>

  );

}