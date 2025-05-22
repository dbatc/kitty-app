import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🐱 Kitty App</h1>
      
      {session ? (
        <div>
          <p>¡Hola {session.user?.name}! 👋</p>
          <p>Email: {session.user?.email}</p>
          
          <button 
            onClick={() => signOut()}
            style={{ padding: '10px 20px', marginTop: '10px' }}
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div>
          <p>No estás logueado</p>
          <Link href="/login">
            <button style={{ padding: '10px 20px' }}>
              Iniciar Sesión
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}