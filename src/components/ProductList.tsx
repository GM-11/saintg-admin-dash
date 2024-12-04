import { Plus, Upload, Edit, Trash } from "lucide-react";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  const navigate = useNavigate();

  const getDefaultPrice = (product: Product) => {
    const inrPrice = product.regional_prices.find(
      (price) => price.currency_type === "INR",
    );
    return inrPrice ? `₹${inrPrice.price.toLocaleString()}` : "N/A";
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl text-white">Product List</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("new")}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <Plus size={20} />
            <span>Add New Product</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
            <Upload size={20} />
            <span>Add Multiple Products</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="pb-3">Product Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Price (INR)</th>
              <th className="pb-3">Brand</th>
              <th className="pb-3">Status</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.map((product) => (
              <tr key={product.product_id} className="hover:bg-gray-800">
                <td className="py-4 flex items-center space-x-3">
                  <img
                    src={product.product_images[0]?.image_url}
                    alt={product.product_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{product.product_name}</span>
                </td>
                <td className="py-4">{product.category_name}</td>
                <td className="py-4">{getDefaultPrice(product)}</td>
                <td className="py-4">{product.brand_name}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      product.product_sizes.some((size) => size.stock > 0)
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {product.product_sizes.some((size) => size.stock > 0)
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product.product_id)}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="flex justify-between items-center mt-4 text-gray-400">
        <span>1 - 10 of 256</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded hover:bg-gray-700">
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-purple-600 text-white">
            1
          </button>
          <button className="px-3 py-1 rounded hover:bg-gray-700">2</button>
          <button className="px-3 py-1 rounded hover:bg-gray-700">3</button>
          <button className="px-3 py-1 rounded hover:bg-gray-700">Next</button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default ProductList;
