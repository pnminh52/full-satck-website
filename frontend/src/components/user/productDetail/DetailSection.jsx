import React from 'react'

const DetailSection = ({ product }) => {
    return (
        <div>
            <div className='space-y-4 sm:py-4 py-0'>
                <div className=' space-y-2'>
                    <p className='py-4 font-semibold text-lg border-b border-gray-400'>Product Description </p>
                    <p>{product.description}</p>
                </div>
                <div className=' space-y-2'>
                <p className='py-4 font-semibold text-lg border-b border-gray-400'>Where to Purchase</p>
                    <p>Good Smile Company Online Store</p>
                    <ul>
                        <li>*All orders placed on the Good Smile Company Online Store during the specified preorder period are guaranteed to be fulfilled.</li>
                        <li>*Please note that this does not apply to orders with incorrect payment and/or shipping information provided.</li>
                        <li>*Dates and times listed are in Japan Standard Time (JST) unless otherwise stated.</li>
                    </ul>
                    <p>International Partner Shops</p>
                    <ul>
                        <li>This product is available from our partner shops.</li>
                        <li>Please see the following listing to find a partner shop in your area: Partner Shop Listing</li>
                    </ul>
                </div>
                <div>
                <p className='py-4 font-semibold text-lg border-b border-gray-400'>Product Specifications</p>
                    {product.series && (
                        <div className='flex items-center gap-10 py-6 border-b border-gray-400'>
                            <p className=" font-semibold text-black ">Series</p>
                            <p className="text-black">{product.series}</p>
                        </div>
                    )}

                    {product.specifications && (
                        <div className='flex items-center gap-10 py-6  border-b border-gray-400'>
                            <p className=" font-semibold text-black ">Specifications</p>
                            <p className="text-black">{product.specifications}</p>
                        </div>
                    )}

                    {product.sculptor && (
                        <div className='flex items-center gap-10 py-6  border-b border-gray-400'>
                            <p className=" font-semibold text-black ">Sculptor</p>
                            <p className="text-black">{product.sculptor}</p>
                        </div>
                    )}

                    {product.paintwork && (
                        <div className='flex items-center gap-10 py-6  border-b border-gray-400'>
                            <p className=" font-semibold text-black ">Paintwork</p>
                            <p className="text-black">{product.paintwork}</p>
                        </div>
                    )}

                    {product.relatedInfo && (
                        <div className='flex items-center gap-10 py-6  border-b border-gray-400'>
                            <p className=" font-semibold text-black ">Related Information</p>
                            <p className="text-black">{product.relatedInfo}</p>
                        </div>
                    )}

                    {product.manufacturer && (
                        <div className='flex items-center gap-10 py-6  border-b border-gray-400'>
                            <p className=" font-semibold text-black ">Manufacturer</p>
                            <p className="text-black">{product.manufacturer}</p>
                        </div>
                    )}

                    {product.distributedBy && (
                        <div className='flex items-center gap-10 py-6  border-b border-gray-400'>
                            <p className=" font-semibold text-black ">Distributed by</p>
                            <p className="text-black">{product.distributedBy}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailSection