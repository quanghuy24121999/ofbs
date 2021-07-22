import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import { api } from '../../config/axios';
import RestaurantItem from './RestaurantItem';

export default function RestaurantView() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getData();
    }, [restaurants.length])

    const getData = () => {
        api.get(`/restaurants/adminViewRestaurant?restaurantName=&status=`)
            .then(res => {
                setRestaurants(res.data);
            })
    }
    return (
        <div>
            <hr />
            <Table className="restaurant-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên nhà hàng</th>
                        <th>Loại hình</th>
                        <th>Địa chỉ</th>
                        <th>Quy mô</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants.map((restaurant, index) => {
                            return <RestaurantItem getData={getData} key={index} restaurant={restaurant} count={index + 1} isPending={false}/>
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
