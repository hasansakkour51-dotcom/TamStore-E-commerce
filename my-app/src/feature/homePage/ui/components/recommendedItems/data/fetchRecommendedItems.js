export const fetchRecommendedItems = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=20");
  const data = await res.json();

  // ترتيب المنتجات حسب السعر أو حسب الخصم
  const sorted = data.products
    .filter(p => p.thumbnail && p.price) // فلترة المنتجات الناقصة
    .sort((a, b) => a.price - b.price); // ترتيب حسب السعر

  return sorted;
};
