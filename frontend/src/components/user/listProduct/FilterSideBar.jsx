// FilterSideBar.jsx
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import PopupFilters from "./PopupFilters";

const { Option } = Select;

const FilterSideBar = ({ products, setFilteredProducts, searchTerm, setSearchTerm }) => {
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [stockFilter, setStockFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  const seriesOptions = [...new Set(products.map((p) => p.series).filter(Boolean))];
  const categoryOptions = [...new Set(products.map((p) => p.category_name).filter(Boolean))];
  const manufacturerOptions = [...new Set(products.map((p) => p.manufacturer).filter(Boolean))];

  useEffect(() => {
    let filtered = [...products];

    if (selectedSeries.length) filtered = filtered.filter((p) => selectedSeries.includes(p.series));
    if (selectedCategories.length) filtered = filtered.filter((p) => selectedCategories.includes(p.category_name));
    if (selectedManufacturers.length) filtered = filtered.filter((p) => selectedManufacturers.includes(p.manufacturer));
    if (stockFilter) {
      filtered = filtered.filter((p) => {
        if (stockFilter === "inStock") return p.stock >= 50;
        if (stockFilter === "few") return p.stock > 0 && p.stock < 50;
        if (stockFilter === "soldOut") return p.stock === 0;
        return true;
      });
    }
    if (statusFilter) filtered = filtered.filter((p) => p.status === statusFilter);
    if (sortPrice === "asc") filtered.sort((a, b) => a.price - b.price);
    if (sortPrice === "desc") filtered.sort((a, b) => b.price - a.price);

    setFilteredProducts(filtered);
  }, [
    selectedSeries,
    selectedCategories,
    selectedManufacturers,
    stockFilter,
    statusFilter,
    sortPrice,
    products,
    setFilteredProducts,
  ]);

  const selectStyle = { width: "100%", marginBottom: "12px" }; // full width + margin between rows

  return (
    <div className="space-y-3">
       <div className="relative w-full   ">
  <img
    src="https://www.goodsmile.com/img/icon/search.svg"
    alt="search"
    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
  />
    <input
    type="text"
    placeholder="Search..."
    className="border border-gray-300  rounded-lg pl-10 py-2 w-full"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

</div>

<div className="flex flex-col gap-0">
  <Select
    placeholder="Stock"
    value={stockFilter}
    onChange={setStockFilter}
    allowClear
    style={selectStyle}
  >
    <Option value="">Sort by stock</Option>
    <Option value="inStock">In Stock (≥50)</Option>
    <Option value="few">Few left (1-49)</Option>
    <Option value="soldOut">Sold Out</Option>
  </Select>

  <Select
    placeholder="Status"
    value={statusFilter}
    onChange={setStatusFilter}
    allowClear
    style={selectStyle}
  >
    <Option value="">Sort by status</Option>
    <Option value="available">Available</Option>
    <Option value="preorder">Pre-Order</Option>
    <Option value="soldout">Sold Out</Option>
  </Select>

  <Select
    placeholder="Sort Price"
    value={sortPrice}
    onChange={setSortPrice}
    style={selectStyle}
  >
    <Option value="">Sort by price</Option>
    <Option value="asc">Low → High</Option>
    <Option value="desc">High → Low</Option>
  </Select>
</div>
<hr className="border-t pb-2 border-gray-400" />

       <div>
        {/* 3 filter đầu bằng PopupFilters */}
       <PopupFilters
        placeholder="Search by Series"
        options={seriesOptions}
        selected={selectedSeries}
        setSelected={setSelectedSeries}
      />
      <PopupFilters
        placeholder="Search by Category"
        options={categoryOptions}
        selected={selectedCategories}
        setSelected={setSelectedCategories}
      />
      <PopupFilters
        placeholder="Search by Manufacturer"
        options={manufacturerOptions}
        selected={selectedManufacturers}
        setSelected={setSelectedManufacturers}
      />
       </div>
    </div>
  );
};

export default FilterSideBar;
