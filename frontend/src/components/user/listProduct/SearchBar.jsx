import React from 'react'

const SearchBar = ({setSearchTerm, filteredProducts, searchTerm }) => {
  return (
    <div>
        <div className=" w-full">

  <div className="relative w-full   ">
  <img
    src="https://www.goodsmile.com/img/icon/search.svg"
    alt="search"
    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
  />
    <input
    type="text"
    placeholder="Search..."
    className="border border-gray-300  rounded pl-10 py-2 w-full"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

</div>
  <div className='flex justify-between py-4'>
  <p className='text-2xl font-semibold'>
  Results for Category: "{filteredProducts[0]?.category_name || 'None'}"
</p>
  <p className="text-gray-600">
    {filteredProducts.length} result{filteredProducts.length !== 1 && "s"}
  </p>
  </div>
</div>

    </div>
  )
}

export default SearchBar