import React from 'react';
import { Button } from 'reactstrap';
import { FaTrashAlt } from 'react-icons/fa';

export default function DishComboItem(props) {
    const dish = props.dish;
    let count = props.count;

    return (
        <tr>
            <td>{count}</td>
            <td>{dish.dish_name}</td>
            <td>{dish.category_name}</td>
            <td>
                <Button color="danger"><FaTrashAlt className="icon-delete"/>Xóa</Button>
            </td>
        </tr>
    )
}
