import React from "react";

type FilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  contentType: string;
  onContentTypeChange: (type: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  contentType,
  onContentTypeChange,
}) => {
  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
      <select
        value={contentType}
        onChange={(e) => onContentTypeChange(e.target.value)}
        style={{ padding: "0.5rem" }}
      >
        <option value="all">All</option>
        <option value="blogs">Blogs</option>
        <option value="videos">Videos</option>
      </select>

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{ padding: "0.5rem" }}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
