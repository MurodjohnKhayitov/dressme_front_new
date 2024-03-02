import React, { useContext, useLayoutEffect, useState } from 'react'
import { SingleProduct } from '../../../Home/Products/SignleMainProducts/SingleProduct/SingleProduct'
import { useParams } from 'react-router-dom';
import { HomeMainDataContext } from '../../../../ContextHook/HomeMainData';

export default function CategoryByIdProduct() {
    const [data] = useContext(HomeMainDataContext);
    const [getproductName, setGetproductName] = useState(null);
    const paramsId = useParams();
    useLayoutEffect(() => {
        if (data?.getMainProductCard?.products) {
            data?.getMainProductCard?.products?.data?.map(item => {
                if (paramsId?.product == item?.id) {
                    setGetproductName(item?.name_ru)
                }
            })
        }
    }, []);
    const breadcrumbItems = [
        { label_uz: 'Home', label_ru: 'Главная', url: '/' },
        { label_uz: 'section', label_ru: 'раздел', url: '/section' },
        { label_uz: paramsId?.id, label_ru: paramsId?.id, url: `/section/${paramsId?.id}` },
        { label_uz: getproductName, label_ru: getproductName, url: `/section/:${paramsId?.id}/${paramsId?.product}` },
    ];
    return (
        <div className='px-4 md:px-0'>
            <SingleProduct breadShops={breadcrumbItems} />
        </div>
    )
}
