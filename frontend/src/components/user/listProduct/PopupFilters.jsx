// PopupFilters.jsx
import React, { useState, useEffect } from "react";
import PopupCard from "./PopupCard";

const PopupFilters = ({ label, options, selected, setSelected,placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selected);

  useEffect(() => {
    setTempSelected(selected); // đồng bộ khi selected thay đổi từ parent
  }, [selected]);

  const handleToggle = (value) => {
    if (tempSelected.includes(value)) setTempSelected(tempSelected.filter((v) => v !== value));
    else setTempSelected([...tempSelected, value]);
  };

  const handleApply = () => {
    setSelected(tempSelected);
    setIsOpen(false);
  };

  const handleClose = () => {
    setTempSelected(selected);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setTempSelected([]);
    setSelected([]); // cập nhật luôn parent
  };
  

  return (
    <div className=" relative">

    

      {/* Button mở popup */}
<div className="py-1.5">
<button
  type="button"
  onClick={() => setIsOpen(true)}
  className="w-full rounded-full  gap-1  p-2.5 cursor-pointer font-semibold bg-[#F4F4F6] transition duration-300 hover:bg-gray-200 flex items-center justify-center"
>
    <img src="https://www.goodsmile.com/img/icon/search.svg" alt="" />
  {selected.length > 0 ? `${placeholder} (${selected.length})` : placeholder}
</button>
  </div>

{/* Selected tags */}
{selected.length > 0 && (
  <div className="py-2 space-y-1.5">
    <div className="flex flex-wrap gap-1 space-y-1">
      {selected.map((s) => (
        <span key={s} className="bg-[#F4F4F6] px-2 rounded-full flex items-center gap-1 text-">
          {s}
          <button
            className="cursor-pointer"
            onClick={() => setSelected(selected.filter((v) => v !== s))}
          >
            <svg
              fillRule="#EA1717"
              className="w-3 h-3"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="#EA1717"
            >
              <polygon points="328.96 30.2933333 298.666667 0 164.48 134.4 30.2933333 0 0 30.2933333 134.4 164.48 0 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"></polygon>
            </svg>
          </button>
        </span>
      ))}
    </div>

    {selected.length > 2 && (
      <span
        className="px-2 cursor-pointer py-0 text-[#EA1717] border border-[#EA1717] rounded-full"
        onClick={handleClearAll}
      >
        Clear All
      </span>
    )}
  </div>
)}


      {/* Popup modal */}
      {isOpen && (
        <div className="z-50 relative">
                  <PopupCard options={options} tempSelected={tempSelected} handleToggle={handleToggle} handleClose={handleClose} handleApply={handleApply} label={label}/>

        </div>
      )}
    </div>
  );
};

export default PopupFilters;
