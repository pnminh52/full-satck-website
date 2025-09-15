import React, { useState, useEffect } from "react";
import Title from "./../../../Title";
import { getCategories } from "../../../../api/categories";
import Slider1 from './../../slider/Slider1';
import Slider2 from "../../slider/Slider2";

const StorePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="body-container h-900
    ">
      <Title />

      <div className="flex items-center gap-10 pt-8 pb-10 ">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col gap-0 items-center cursor-pointer group"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-30 h-30 object-contain "
            />
            <h3 className=" hover:underline font-semibold  text-gray-800 group-hover:text-black">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
     <div className="py-8 space-y-8">
     <p className="font-sf text-3xl">Thế hệ mới nhất. <span className="text-gray-500"> Xem ngay có gì mới.</span> </p>
     <Slider1 />
     </div>
{/* <div className="py-8 space-y-8">
<p className="font-sf text-3xl">Phụ kiện.  <span className="text-gray-500"> Những phụ kiện kết hợp hoàn hảo với thiết bị yêu thích của bạn.</span> </p>
<Slider2 />
</div> */}
    </div>
  );
};

export default StorePage;
