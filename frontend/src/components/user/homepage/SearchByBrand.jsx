import React, { useEffect, useState } from "react";
import { getCategories } from "./../../../api/categories";
import { Link } from 'react-router-dom';
const SearchByBrand = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        // Nếu API trả về { data: [...] }
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Lỗi khi load categories:", error);
        setCategories([]); // fallback
      }
    };
    fetchData();
  }, []);
  

  return (
    <div className="py-8 space-y-8">
      <div className="">
        <div className="flex flex-col items-center gap-1">
          <img
            className="w-15 h-15"
            src="https://www.goodsmile.com/img/common/face.svg?202406"
            alt=""
          />
          <p className="text-lg font-semibold">Search by brand</p>
        </div>
      </div>

    <div className="px-20">
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-4">
        {categories.map((c) => (
         <Link
         to={`/category/${c.id}`}
         key={c.id}
         className="flex relative flex-col items-center cursor-pointer group"
       >
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="font-semibold absolute bottom-2 left-3  text-white uppercase ">{c.name}</p>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SearchByBrand;
