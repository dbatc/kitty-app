import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { supabase } from '../../../lib/supabase'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const { data: user, error } = await supabase
          .from('users')
          .select('id, email, full_name, username, password_hash')
          .eq('email', credentials.email)
          .single()

        if (error || !user) {
          return null
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash)
        
        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.full_name
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
})