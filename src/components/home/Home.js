import React, { useEffect, useContext } from 'react';
import ProductList from '../productList/ProductList';
import './home.css';
import { ProductContext } from '../../context/product/product-context';

function Home() {

    const productContext = useContext(ProductContext);

    useEffect(() => {
        productContext.fetchCategoryWiseProducts();
    }, []);


    return (
        <div className="home">
            <div className="home__container">
                {
                    productContext.productState.categoryWiseProducts.map((categoryWiseProducts) => {
                        return <React.Fragment key={categoryWiseProducts.category._id}>
                            <div className="product__category">
                                <div className="category-name">{categoryWiseProducts.category.categroryName}</div>
                                <div className="category-view-all">View All</div>
                            </div>
                            <ProductList productList={categoryWiseProducts.productList} />
                        </React.Fragment>
                    })
                }
            </div>

        </div>
    )
}

export default Home
