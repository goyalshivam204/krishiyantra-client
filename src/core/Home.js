import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import Corosal from './Corosal';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    /* eslint-disable no-unused-vars */
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data && data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data?data.error:false) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        
        <Layout
            title=""
            description=""
            className="container-fluid"
        >  
        <Corosal />
            <Search />
            <h2 className="mb-4 home-h2-main font-weight-bolder text-center pb-2 h2">New Arrivals</h2>
            <div className="row">
                {productsByArrival?productsByArrival.map((product, i) => (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-xs-8 offset-xs-2 mb-3">
                        {/* <Card product={product} /> */}
                        {/* <Card product={{"product": { ...product}}} /> */}
                        <Card product={{ ...product, "description": [product.description.substring(0,100)+ "..."] }} />


                    </div>
                )):<></>}
            </div>

            <h2 className="mb-4 home-h2 font-weight-bolder text-center pb-2 pt-2 h2">Best Sellers</h2>
            <div className="row">
                {productsBySell?productsBySell.map((product, i) => (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-xs-6  mb-3">
                        {/* <Card product={product} /> */}
                        <Card product={{ ...product, "description": [product.description.substring(0, 100) + "..."] }} />

                    </div>
                )):<></>}
            </div>
        </Layout>
    );
};

export default Home;
