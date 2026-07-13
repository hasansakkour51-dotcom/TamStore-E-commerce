export const fetchDealsProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      return data.products.slice(0, 4);
    } catch (error) {
      console.log("Error fetching deals products:", error);
      return [];
    }
  };
  