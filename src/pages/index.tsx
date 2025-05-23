import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { GetServerSidePropsContext } from "next";
import { auth0 } from "@/lib/auth0";
import { getCats } from "@/utils/fetchCats";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth0.getSession(ctx.req);

  if (!session) {
    const cats = await getCats();
    return { props: { user: null, cats } };
  }

  return { props: { user: session.user } };
}

export default function Home({ user, cats }: { user: any; cats: any }) {
  return (
    <div>
      <NavBar user={user} />
      {user ? (
        <div>
          <h1>Welcome {user.name || user.email}</h1>
        </div>
      ) : (
        <div>
          <Hero cats={cats} />
        </div>
      )}
    </div>
  );
}
