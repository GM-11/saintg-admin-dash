import React, { useEffect, useState } from "react";
import { Upload, Plus, X } from "lucide-react";

interface ProductFormProps {
  onSubmit: (product: any) => void;
  initialData?: any;
}

const ProductForm = ({ onSubmit, initialData }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    product_name: initialData?.product_name || "",
    description: initialData?.description || "",
    brand_id: initialData?.brand_id || "",
    category_id: initialData?.category_id || "",
    subcategory_id: initialData?.subcategory_id || "",
    sku: initialData?.sku || "",
    stock: initialData?.stock || 0,
    gender: initialData?.gender || "",
    images: initialData?.images || [],
    colors: initialData?.colors || [],
    specifications: initialData?.specifications || [{ label: "", content: "" }],
    more_info: initialData?.more_info || [{ label: "", content: "" }],
    care: initialData?.care || [{ type: "", content: "" }],
    tags: initialData?.tags || [],
    size: initialData?.size || [],
  });

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);
  const [availableBrands, setAvailableBrands] = useState<any[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<any[]>(
    [],
  );
  const [newTag, setNewTag] = useState("");

  const availableSizeTypes = ["EURO", "US", "UK"];
  const availableGenders = ["men", "women", "unisex"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically upload images first and get their URLs
    const productData = {
      ...formData,
      // Remove any empty specifications, more_info, or care instructions
      specifications: formData.specifications.filter(
        (spec: any) => spec.label && spec.content,
      ),
      more_info: formData.more_info.filter(
        (info: any) => info.label && info.content,
      ),
      care: formData.care.filter((care: any) => care.type && care.content),
    };
    onSubmit(productData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload to your server/cloud storage
      // This is just a demonstration using local URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        images: [
          ...formData.images,
          {
            image_url: imageUrl,
            preference: formData.images.length + 1,
          },
        ],
      });
    }
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { label: "", content: "" }],
    });
  };

  const updateSpecification = (
    index: number,
    field: "label" | "content",
    value: string,
  ) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
  };

  const addMoreInfo = () => {
    setFormData({
      ...formData,
      more_info: [...formData.more_info, { label: "", content: "" }],
    });
  };

  const addCareInstruction = () => {
    setFormData({
      ...formData,
      care: [...formData.care, { type: "", content: "" }],
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const addSize = (label: string, type: string) => {
    setFormData({
      ...formData,
      size: [...formData.size, { label, type }],
    });
  };

  async function loadInitialData() {
    try {
      const [categories, brands, subcategories] = await Promise.all([
        fetch("http://13.126.237.254:8080/categories/get"),
        fetch("http://13.126.237.254:8080/brands/get"),
        fetch("http://13.126.237.254:8080/subcategories/get"),
      ]);

      setAvailableCategories((await categories.json()).data);
      setAvailableBrands((await brands.json()).data);
      setAvailableSubcategories((await subcategories.json()).data);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1a1a] rounded-lg p-6 text-gray-300"
    >
      <h2 className="text-xl text-white mb-6">Upload Product</h2>

      <div className="space-y-6">
        {/* Product Name and Description */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              value={formData.product_name}
              onChange={(e) =>
                setFormData({ ...formData, product_name: e.target.value })
              }
              className="w-full bg-gray-800 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-gray-800 rounded-lg px-4 py-2 h-32"
              required
            />
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">SKU</label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              className="w-full bg-gray-800 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: parseInt(e.target.value) })
              }
              className="w-full bg-gray-800 rounded-lg px-4 py-2"
              required
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block mb-2">Images</label>
          <div className="grid grid-cols-4 gap-4">
            {formData.images.map(
              (
                image: { image_url: string | undefined },
                index: React.Key | null | undefined,
              ) => (
                <div key={index} className="relative">
                  <img
                    src={image.image_url}
                    alt=""
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = formData.images.filter(
                        (_: any, i: any) => i !== index,
                      );
                      setFormData({ ...formData, images: newImages });
                    }}
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ),
            )}
            <label className="h-32 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <Upload size={24} />
            </label>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <label className="block mb-2">Specifications</label>
          {formData.specifications.map((spec: any, index: any) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Label"
                value={spec.label}
                onChange={(e) =>
                  updateSpecification(index, "label", e.target.value)
                }
                className="bg-gray-800 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Content"
                value={spec.content}
                onChange={(e) =>
                  updateSpecification(index, "content", e.target.value)
                }
                className="bg-gray-800 rounded-lg px-4 py-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSpecification}
            className="mt-2 px-4 py-2 bg-gray-700 rounded-lg"
          >
            Add Specification
          </button>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map(
              (
                tag:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined,
                index: React.Key | null | undefined,
              ) => (
                <span
                  key={index}
                  className="bg-gray-700 px-3 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      const newTags = formData.tags.filter(
                        (_: any, i: any) => i !== index,
                      );
                      setFormData({ ...formData, tags: newTags });
                    }}
                    className="ml-2"
                  >
                    <X size={14} />
                  </button>
                </span>
              ),
            )}
          </div>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleAddTag}
            placeholder="Type and press Enter to add tags"
            className="w-full bg-gray-800 rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-purple-600 rounded-lg">
            Save Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
