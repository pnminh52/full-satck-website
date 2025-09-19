import React, { useEffect, useState } from "react";
import { getCategories } from "./../../../api/categories";
import { Link } from 'react-router-dom';
const SearchByBrand = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Lỗi khi load categories:", error);
        setCategories([]); // fallback
      }
    };
    fetchData();
  }, []);
  

  return (
    <div className="space-y-4 py-4">
     
        <div className="flex flex-col items-center  ">
          <img
            className="sm:w-15 w-10"
            src="https://www.goodsmile.com/img/common/face.svg?202406"
            alt=""
          />
                  <p className="sm:text-lg text-sm font-semibold">Search By Brand</p>

        </div>
    

    <div className="md:px-20 px-4">
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  sm:gap-4 gap-2">
        {categories.map((c) => (
         <Link
         to={`/product`}
         key={c.id}
         className="flex relative flex-col items-center cursor-pointer group"
       >
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-full object-contain sm:rounded-lg rounded-sm"
            />
            <p className="font-semibold test-sm absolute bottom-2 left-3  text-white  ">{c.name}</p>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SearchByBrand;
