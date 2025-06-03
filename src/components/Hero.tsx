import { Card, CardBody, Image } from "@heroui/react";
import { Button } from "@heroui/react";
import { useQuery } from "@apollo/client";
import { GET_CATS } from "@/graphql/queries";
import { useState } from "react";

export default function Hero() {
  const { loading, error, data, refetch } = useQuery(GET_CATS);

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  };

  if (error)
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="flex flex-col items-center justify-center mx-[25%]">
      <Button
        onPress={handleRefresh}
        className="mr-auto my-4"
        color="danger"
        isLoading={loading}
      >
        <h1 className="text-white text-sm font-bold">
          {loading ? "Loading..." : "Load more kittens! 🐱"}
        </h1>
      </Button>
      <div className="gap-2 grid grid-cols-3 sm:grid-cols-3">
        {data?.cats?.map((cat: any, index: number) => (
          <Card key={cat.id} shadow="sm">
            <CardBody className="overflow-visible p-0">
              <Image
                alt={`Cat ${index + 1}`}
                className="w-full object-cover h-[250px]"
                radius="lg"
                shadow="sm"
                src={cat.url}
                width="100%"
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
