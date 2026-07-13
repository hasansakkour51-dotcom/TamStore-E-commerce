import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  FaFilter,
  FaStar,
  FaDollarSign,
  FaRedo,
  FaThLarge,
  FaList,
  FaSort,
  FaSearch,
} from "react-icons/fa";
import "./Products.css";
import { fetchProducts } from "../../data/fetchProducts";
import ProductCard from "./productCard/ProductCard";
import ProductListView from "./productListView/ProductListView";
import Header from "../../../../shared/header/Header";
import Footer from "../../../../shared/footer/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [filters, setFilters] = useState({ brand: "", rating: 0, price: 0 });
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data || []); // تأكد إنه يرجع Array
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("⚠️ Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const applyFilters = (items) => {
    let filtered = items.filter((item) => {
      const brandMatch = filters.brand ? item.brand === filters.brand : true;
      const ratingMatch = filters.rating ? item.rating >= filters.rating : true;
      const priceMatch = filters.price ? item.price <= filters.price : true;
      const searchMatch = searchTerm
        ? ((item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase())))
        : true;
      return brandMatch && ratingMatch && priceMatch && searchMatch;
    });

    if (sortBy === "priceLow") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const visibleProducts = applyFilters(products).slice(0, 20);

  return (
    <>
      <Header />
      <section className="productsSection">
        <Container fluid>
          <Row className="align-items-start">
            {/* Sidebar Filters */}
            <Col lg={3} md={4} className="sidebarFilters">
              <h5><FaFilter /> Filters</h5>

              <div className="filterGroup">
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setFilters({ ...filters, brand: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Poco">Poco</option>
                </Form.Select>
              </div>

              <div className="filterGroup">
                <Form.Label><FaStar /> Rating</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    setFilters({ ...filters, rating: Number(e.target.value) })
                  }
                >
                  <option value={0}>All</option>
                  <option value={4}>4★ & above</option>
                  <option value={3}>3★ & above</option>
                </Form.Select>
              </div>

              <div className="filterGroup">
                <Form.Label><FaDollarSign /> Max Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  onChange={(e) =>
                    setFilters({ ...filters, price: Number(e.target.value) })
                  }
                />
              </div>

              <button
                className="resetBtn"
                onClick={() => {
                  setFilters({ brand: "", rating: 0, price: 0 });
                  setSearchTerm("");
                  setSortBy("");
                }}
              >
                <FaRedo /> Reset Filters
              </button>
            </Col>

            {/* Products Section */}
            <Col lg={9} md={8}>
              <div className="productsHeader d-flex align-items-center justify-content-between flex-wrap">
                <h3 className="productsTitle">All Products</h3>
                <div className="headerControls d-flex gap-3 flex-wrap">
                  {/* Search */}
                  <div className="searchBox d-flex align-items-center gap-1">
                    <FaSearch className="searchIcon" />
                    <Form.Control
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="viewToggle">
                    <button
                      className={viewMode === "grid" ? "active" : ""}
                      onClick={() => setViewMode("grid")}
                    >
                      <FaThLarge /> Grid
                    </button>
                    <button
                      className={viewMode === "list" ? "active" : ""}
                      onClick={() => setViewMode("list")}
                    >
                      <FaList /> List
                    </button>
                  </div>

                  {/* Sort */}
                  <div className="sortOptions d-flex align-items-center">
                    <Form.Label><FaSort /> Sort By:</Form.Label>
                    <Form.Select onChange={(e) => setSortBy(e.target.value)}>
                      <option value="">Default</option>
                      <option value="priceLow">Price: Low to High</option>
                      <option value="priceHigh">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </Form.Select>
                  </div>
                </div>
              </div>

              {/* Error State */}
              {error && <p className="errorMsg">{error}</p>}

              {/* Loading / Products */}
              {loading ? (
                <Row className="g-3">
                  {[...Array(12)].map((_, i) => (
                    <Col lg={4} md={6} sm={12} key={i}>
                      <ProductCard loading={true} />
                    </Col>
                  ))}
                </Row>
              ) : visibleProducts.length === 0 ? (
                <p className="noResults">No products found matching your search.</p>
              ) : viewMode === "grid" ? (
                <Row className="g-3">
                  {visibleProducts.map((item, index) => (
                    <Col lg={4} md={6} sm={12} key={index}>
                      <ProductCard item={item} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="listView">
                  {visibleProducts.map((item, index) => (
                    <ProductListView key={index} item={item} />
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Products;
