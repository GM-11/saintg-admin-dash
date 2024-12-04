import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import type { Product } from "./types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleEditProduct = (product: Product) => {
    // Implement edit logic
    console.log("Editing product:", product);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((p) => p.product_id !== productId));
  };

  const getProducts = async () => {
    try {
      const response = await fetch(
        "http://13.126.237.254:8080/products/get-all",
      );
      const result = await response.json();

      // Assuming the API returns { success: boolean, data: Product[] }
      if (response.ok && Array.isArray(result.data)) {
        setProducts(result.data);
      } else {
        console.error("Invalid data format received:", result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddProduct = async (productData: Partial<Product>) => {
    try {
      // You might want to implement the actual API call here
      // For now, we'll just add it to the local state
      const newProduct: Product = {
        product_id: Date.now(), // This should come from the backend in reality
        product_name: productData.product_name || "",
        description: productData.description || "",
        brand_name: productData.brand_name || "",
        category_name: productData.category_name || "",
        subcategory_name: productData.subcategory_name || "",
        product_care: productData.product_care || [],
        product_colors: productData.product_colors || [],
        product_images: productData.product_images || [],
        product_more_info: null,
        product_sizes: productData.product_sizes || [],
        product_specifications: null,
        product_tags: null,
        regional_prices: productData.regional_prices || [],
      };

      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-[#121212]">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/products"
              element={
                <ProductList
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              }
            />
            <Route
              path="/products/new"
              element={<ProductForm onSubmit={handleAddProduct} />}
            />
            {/* Add more routes for categories, collections, etc. */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
