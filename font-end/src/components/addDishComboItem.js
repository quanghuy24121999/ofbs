import axios from 'axios';
import React from 'react';
import {
    Button
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import { formatCurrency } from '../common/formatCurrency';

export default function AddDishComboItem(props) {
    const dish = props.dish;
    const combo = props.combo;
    const count = props.count;
    const dishModal = props.dishModal;

    let check = 0;

    const checkExist = () => {
        dishModal && dishModal.forEach(item => {
            if (item.id === dish.id) {
                check = check + 1;
                return;
            }
        });
    }

    const addToCombo = () => {
        let comboApi = [];
        let dishApi = [];
        checkExist();

        if (check === 0) {
            axios.get(`/combos/getComboById?comboId=${combo.combo_id}`)
                .then(res => {
                    comboApi = res.data;
                    axios.get(`/dishes/getDishesById?dishId=${dish.id}`)
                        .then(res => {
                            dishApi = res.data;
                            axios.post(`/dishes/addDishToCombo`,
                                {
                                    "combo": comboApi,
                                    "dish": dishApi
                                }, {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            }
                            )
                                .then(res => {
                                    toast.success("Thêm thành công !", {
                                        position: "top-left",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                })
                        })
                })
        } else {
            toast.warn('Món ăn đã có trong combo', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{dish.dish_name}</td>
            <td>{formatCurrency(dish.price) + ' VNĐ'}</td>
            <td>{dish.category_name}</td>
            <td><Button color="primary" onClick={addToCombo} >Thêm</Button><ToastContainer /></td>
        </tr >
    )
}
