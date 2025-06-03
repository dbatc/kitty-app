import React from "react";
import CatCard from "@/components/CatCard";
import { useQuery } from "@apollo/client";
import { GET_CATS } from "@/graphql/queries";

export default function AllKitties() {
  const { loading, error, data } = useQuery(GET_CATS);

  if (loading) return <div className="text-center p-4">Loading cats...</div>;
  if (error)
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-10 w-full">
      {data?.cats?.map((cat: any) => (
        <CatCard
          key={cat.id}
          cat={cat}
          onLike={() => console.log("Like:", cat.id)}
          onDislike={() => console.log("Dislike:", cat.id)}
          onFavorite={() => console.log("Favorite:", cat.id)}
        />
      ))}
    </div>
  );
}
