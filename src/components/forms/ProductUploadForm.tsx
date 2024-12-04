import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SizeSelector from "./SizeSelector";
import ColorPicker from "./ColorPicker";
import PhotoUploader from "./PhotoUploader";
import type { Product } from "../../types";

interface ProductUploadFormProps {
  onSubmit: (product: Partial<Product>) => void;
  initialData?: Product;
}

const ProductUploadForm = ({
  onSubmit,
  initialData,
}: ProductUploadFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Product>({
    product_name: initialData?.product_name || "",
    description: initialData?.description || "",
    brand_name: initialData?.brand_name || "",
    category_name: initialData?.category_name || "",
    subcategory_name: initialData?.subcategory_name || "",
    product_care: initialData?.product_care || [],
    product_colors: initialData?.product_colors || [],
    product_images: initialData?.product_images || [],
    product_sizes: initialData?.product_sizes || [],
    product_specifications: initialData?.product_specifications || [],
    product_tags: initialData?.product_tags || [],
    regional_prices: initialData?.regional_prices || [],
    product_id: Date.now(),
    product_more_info: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate("/products");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-[#1a1a1a] rounded-lg p-6"
      >
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            Upload Products
          </h2>
          <p className="text-gray-400 text-sm">
            Add new products to your store
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.product_name}
              onChange={(e) =>
                setFormData({ ...formData, product_name: e.target.value })
              }
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category_name}
                onChange={(e) =>
                  setFormData({ ...formData, category_name: e.target.value })
                }
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Select a category</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="footwear">Footwear</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Collection
              </label>
              <select
                value={formData.subcategory_name}
                onChange={(e) =>
                  setFormData({ ...formData, subcategory_name: e.target.value })
                }
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Select a collection</option>
                <option value="summer-2024">Summer 2024</option>
                <option value="winter-2024">Winter 2024</option>
                <option value="spring-2024">Spring 2024</option>
              </select>
            </div>
          </div>

          <PhotoUploader
            photos={formData.product_images as any[]}
            onPhotosChange={(photos: any[]) =>
              setFormData({ ...formData, product_images: photos })
            }
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 h-32 resize-none"
              placeholder="Write the description for this product..."
            />
          </div>

          <SizeSelector
            selectedSizes={formData.product_sizes as any[]}
            onSizeChange={(sizes: any[]) =>
              setFormData({ ...formData, product_sizes: sizes })
            }
          />

          <ColorPicker
            selectedColors={formData.product_colors as any[]}
            onColorChange={(colors: any[]) =>
              setFormData({ ...formData, product_colors: colors })
            }
          />

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Save Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUploadForm;
