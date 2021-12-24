import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.FIREBASE_GOOGLE_CLIENT_ID,
      clientSecret: process.env.FIREBASE_GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,

  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#F13287', // Hex color value
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png', // Absolute URL to logo image
  },

  pages: {
    signIn: '/auth/signin',
  },

  callbacks: {
    async session({ session, token }) {
      session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
      session.user.uid = token.sub;

      return session;
    },
  },
});
