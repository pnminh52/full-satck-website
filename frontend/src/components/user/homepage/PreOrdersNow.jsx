import React, { useEffect, useState } from 'react';
import ProductCard from './../listProduct/ProductCard';
import { getProducts } from '../../../api/products';
import Loader from '../../Loader';

const PreOrdersNow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPreOrders = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        // lọc các sản phẩm có status là 'preorder'
        const preOrders = res.data.filter(p => p.status === 'preorder');
        setProducts(preOrders);
      } catch (err) {
        console.error("❌ Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreOrders();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-1 mb-4">
        <img className="w-15 h-15" src="https://www.goodsmile.com/img/icon/pre-order.svg" alt="Preorder" />
        <p className="text-lg font-semibold">Preorders Open Now</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader size={14} />
        </div>
      ) : (
        <ProductCard products={products} columns={5} />

      )}
    </div>
  );
};

export default PreOrdersNow;
