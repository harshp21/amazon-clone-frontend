import React from 'react'
import Product from '../product/Product';
import './product-list.css';

function ProductList({ productList }) {
    return (
        <div className="product-list">
            {
                productList.map((product) => {
                    return <Product key={product._id} product={product} />
                })
            }
        </div>
    )
}

export default ProductList;
