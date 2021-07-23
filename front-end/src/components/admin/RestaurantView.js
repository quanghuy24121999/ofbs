import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Container, Table } from 'reactstrap'
import { api } from '../../config/axios';
import RestaurantItem from './RestaurantItem';

export default function RestaurantView(props) {
    const [restaurants, setRestaurants] = useState([]);

    const [offset, setOffset] = useState(0);
    const [perPage, setPerpage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        receivedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, restaurants.length])

    const search = () => {
        receivedData();
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
        // receivedData(0, '');
    };

    const receivedData = () => {
        window.scrollTo(0, 0);

        api.get(`/restaurants/adminViewRestaurant?restaurantName=&status=`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const data = res.data;
                const slice = data.slice(offset, offset + perPage)
                const restaurantPaging = slice.map((restaurant, index) => {
                    return <RestaurantItem receivedData={receivedData} key={index} restaurant={restaurant} count={index + 1} isPending={false} />
                })

                setRestaurants(restaurantPaging);
                setPageCount(Math.ceil(data.length / perPage));
            })
    }
    return (
        <Container>
            <hr />
            <Table className="restaurant-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên nhà hàng</th>
                        <th>Loại hình</th>
                        <th>Địa chỉ</th>
                        <th>Quy mô</th>
                        {
                            !props.isPending && <th>Trạng thái</th>
                        }
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants.length > 0 && restaurants
                    }
                </tbody>
            </Table>
            <ReactPaginate
                previousLabel={"Trang trước"}
                nextLabel={"Trang sau"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        </Container>
    )
}
