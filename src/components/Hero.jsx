import { Card, CardBody, Image } from "@heroui/react";
import { Button } from "@heroui/react";
import { getCats } from "@/utils/fetchCats";
import { useState } from "react";

export default function Hero({ cats: initialCats }) {
  const [currentCats, setCurrentCats] = useState(initialCats);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const newCats = await getCats();
      setCurrentCats(newCats);
    } catch (error) {
      console.error("Error fetching cats:", error);
    } finally {
      setLoading(false);
    }
  };

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
        {currentCats &&
          currentCats.map((cat, index) => (
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
