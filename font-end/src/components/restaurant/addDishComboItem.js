import axios from 'axios';
import React from 'react';
import {
    Button
} from 'reactstrap';

import { formatCurrency } from '../../common/formatCurrency';
import { Notify } from '../../common/notify';

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
                                    Notify("Thêm thành công !", "success", "top-left");
                                })
                        })
                })
        } else {
            Notify("Món ăn đã có trong combo !", "warning", "top-left");
        }
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{dish.dish_name}</td>
            <td>{formatCurrency(dish.price) + ' VNĐ'}</td>
            <td>{dish.category_name}</td>
            <td><Button color="primary" onClick={addToCombo} >Thêm</Button></td>
        </tr >
    )
}
