// PopupFilters.jsx
import React, { useState, useEffect } from "react";
import PopupCard from "./PopupCard";
import { Modal } from "antd";

const PopupFilters = ({
  options,
  selected,
  setSelected,
  placeholder,
  setShowFilter
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selected);

  useEffect(() => {
    setTempSelected(selected); // đồng bộ khi selected thay đổi từ parent
  }, [selected]);

  const handleToggle = (value) => {
    if (tempSelected.includes(value))
      setTempSelected(tempSelected.filter((v) => v !== value));
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
          {selected.length > 0
            ? `${placeholder} (${selected.length})`
            : placeholder}
        </button>
      </div>

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="py-2 space-y-1.5">
          <div className="flex flex-wrap gap-1 space-y-1">
            {selected.map((s) => (
              <p
                key={s}
                className="bg-[#F4F4F6] px-2 py-0 rounded-full flex items-center gap-1 text-"
              >
                {s}
                <button
                  className="cursor-pointer"
                  onClick={() => setSelected(selected.filter((v) => v !== s))}
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="#EA1717"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                        fill="#EA1717"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </p>
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

<Modal
  open={isOpen}
  onCancel={handleClose}
  footer={null}
  centered
  destroyOnClose
  width={400}
   style={{ borderRadius: "15px",  overflow: "hidden"}}
>
<PopupCard
  options={options}
  tempSelected={tempSelected}
  handleToggle={handleToggle}
  handleClose={handleClose}
  handleApply={() => {
    handleApply();
    if (setShowFilter) setShowFilter(false); 
  }}
  setShowFilter={setShowFilter} 
/>

</Modal>
    </div>
  );
};

export default PopupFilters;
