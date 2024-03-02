import React, { useContext, useLayoutEffect, useState } from 'react'
import { SingleProduct } from '../../../Products/SignleMainProducts/SingleProduct/SingleProduct'
import { useParams } from 'react-router-dom';
import { HomeMainDataContext } from '../../../../../ContextHook/HomeMainData';

export default function CatalogByIdProduct() {
    const [data] = useContext(HomeMainDataContext);
    const [getproductName, setGetproductName] = useState(null);
    const paramId = useParams();
    useLayoutEffect(() => {
        if (data?.getMainProductCard?.products) {
            data?.getMainProductCard?.products?.data?.map(item => {
                if (paramId?.product == item?.id) {
                    setGetproductName(item?.name_ru)
                }
            })
        }
    }, []);
    const breadcrumbItems = [
        { label_uz: 'Home', label_ru: 'Главная', url: '/' },
        { label_uz: 'category', label_ru: 'категории', url: '/categories' },
        { label_uz: paramId?.id, label_ru: paramId?.id, url: `/categories/${paramId?.id}` },
        { label_uz: getproductName, label_ru: getproductName, url: `/categories/${paramId?.id}/${paramId?.product}` },
    ];

    return (
        <div className='px-4 md:px-0'>
            <SingleProduct breadShops={breadcrumbItems} />
        </div>
    )
}
