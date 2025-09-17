import React from 'react'

const PopupCard = ({handleClose, handleApply, tempSelected, options, handleToggle, label}) => {
  return (
    <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 z-50 bg-black hide-scrollbar opacity-40" onClick={handleClose}></div>

          {/* Popup content */}
          <div className="bg-white rounded-lg z-50 max-h-[80vh] w-80 p-4 overflow-auto ">
            <h4 className="font-semibold mb-2">{label}</h4>

            <div className="space-y-1 max-h-60 overflow-auto">
              {options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempSelected.includes(opt)}
                    onChange={() => handleToggle(opt)}
                    className="accent-[#F06E00]"
                  />
                  <span className="truncate">{opt}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-4">
             
              <div className="space-x-2">
                <button className="text-sm px-2 py-1 border rounded" onClick={handleClose}>
                  Close
                </button>
                <button className="text-sm px-2 py-1 border rounded bg-[#F06E00] text-white" onClick={handleApply}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PopupCard