import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { GetServerSidePropsContext } from "next";
import { auth0 } from "@/lib/auth0";
import AllKitties from "../components/AllKitties";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth0.getSession(ctx.req);

  if (!session) {
    return { props: { user: null } };
  }

  return { props: { user: session.user } };
}

export default function Home({ user }: { user: any }) {
  return (
    <div>
      <NavBar user={user} />
      {user ? (
        <div className="w-[80%] mx-auto">
          <AllKitties />
        </div>
      ) : (
        <div>
          <Hero />
        </div>
      )}
    </div>
  );
}
