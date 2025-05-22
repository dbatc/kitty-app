import { auth0 } from "@/lib/auth0";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

export default function Home({ session }: { session: any }) {
  console.log(session);

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🐱 Kitty App</h1>

      {session ? (
        <div>
          <p>¡Hola {session.user?.name}! 👋</p>
          <p>Email: {session.user?.email}</p>

          <button style={{ padding: "10px 20px", marginTop: "10px" }}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div>
          <p>No estás logueado</p>
          <Link href="/login">
            <button style={{ padding: "10px 20px" }}>Iniciar Sesión</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth0.getSession(ctx.req);

  console.log(session);
  return { props: { session } };
}
