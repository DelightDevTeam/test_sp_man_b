import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch';

export default function PromotionDetail({url}) {
    let { data: promotion } = useFetch(url);
    // console.log(close);
  return (
    
    <>
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                {promotion && (
                    <div className="card rounded-3 shadow">
                        <img src={promotion.img_url} className='img-fluid card-img-top' alt="" />
                        <div className="m-3">
                            <h4>{promotion.title}</h4>
                            <p dangerouslySetInnerHTML={{ __html: promotion.description }}></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    </>
  )
}
