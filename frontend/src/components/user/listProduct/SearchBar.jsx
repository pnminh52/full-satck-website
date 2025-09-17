import React from 'react'

const SearchBar = ({setSearchTerm, categoryId,  filteredProducts, searchTerm }) => {
    const categoryName = categoryId
    ? filteredProducts[0]?.category_name || "None"
    : "Our Collection";
    return (
    <div>
        <div className=" w-full">
  <p className=' gap-1 '>
 <span className="text-2xl font-semibold"> {categoryName}</span>  <span className="text-gray-600  text-lg">({filteredProducts.length})</span>  
</p>

</div>

    </div>
  )
}

export default SearchBar