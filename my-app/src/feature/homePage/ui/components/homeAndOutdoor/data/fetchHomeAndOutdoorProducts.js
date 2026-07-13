export const fetchHomeAndOutdoorProducts = async (category) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`,
        {
          cache: "no-store",
        }
      );
  
      const data = await res.json();
      return data.products.slice(0, 12);
  
    } catch (error) {
      console.log("Error fetching products:", error);
      return [];
    }
  };
  