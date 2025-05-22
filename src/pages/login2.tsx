import { auth0 } from "@/lib/auth0";
import { useUser } from "@auth0/nextjs-auth0";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth0.getSession(ctx.req);

  if (!session) return { props: { user: null } };

  return { props: { user: session.user } };
}

export default function Login({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user2 = useUser();

  console.log("from server", user);
  console.log("from useUser", user2);

  if (!user) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome, {user.name}!</h1>
    </main>
  );
}
