import { Package, FolderOpen, Tags, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "./saintg_logo.png";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Package, label: "Products", path: "/products" },
    { icon: FolderOpen, label: "Categories", path: "/categories" },
    { icon: Tags, label: "Collections", path: "/collections" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="w-64 min-h-screen bg-black text-white p-6">
      <div className="mb-10">
        <img src={logo} alt="Logo" width={100} height={100} />
        <p className="text-sm text-gray-400">Dashboard</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
