export const resolvers = {
  Query: {
    cats: async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?has_breeds=true&limit=9",
          {
            headers: {
              "x-api-key":
                process.env.NEXT_PUBLIC_CAT_API_KEY || "live_1234567890",
            },
          }
        );
        const cats = await response.json();
        return cats;
      } catch (error) {
        console.error("Error fetching cats:", error);
        return [];
      }
    },
  },
};
