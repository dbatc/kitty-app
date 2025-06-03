import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from "@heroui/react";

interface Breed {
  weight: {
    imperial: string;
    metric: string;
  };
  id: string;
  name: string;
  temperament: string;
  description: string;
  life_span: string;
}

interface CatCard {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  isFavorite?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
  onFavorite?: () => void;
}

export default function CatCard({
  cat,
  onLike,
  onDislike,
  onFavorite,
}: {
  cat: CatCard;
  onLike?: () => void;
  onDislike?: () => void;
  onFavorite?: () => void;
}) {
  const breed = cat.breeds[0]; // Get the first breed since there's usually only one

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">
          {breed?.name || "Unknown Breed"}
        </p>
        <small className="text-default-500">
          {breed?.temperament || "No temperament info"}
        </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={`${breed?.name || "Cat"} image`}
          className="object-cover rounded-xl"
          src={cat.url}
          width={370}
          height={270}
        />
      </CardBody>
      <CardFooter className="flex justify-between items-center gap-2">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={cat.isLiked ? "solid" : "light"}
            color={cat.isLiked ? "primary" : "default"}
            onPress={onLike}
            aria-label="Me gusta"
          >
            👍
          </Button>
          <Button
            size="sm"
            variant={cat.isDisliked ? "solid" : "light"}
            color={cat.isDisliked ? "danger" : "default"}
            onPress={onDislike}
            aria-label="No me gusta"
          >
            👎
          </Button>
          <Button
            size="sm"
            variant={cat.isFavorite ? "solid" : "light"}
            color={cat.isFavorite ? "secondary" : "default"}
            onPress={onFavorite}
            aria-label="Favorito"
          >
            ❤️
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
