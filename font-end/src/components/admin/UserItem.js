import React from 'react';
import { Button } from 'reactstrap';
import { api } from '../../config/axios';

export default function UserItem(props) {
    const user = props.user;
    const count = props.count;
    let role = user.role.name;
    let status = user.status.name;

    if (role === 'ROLE_PROVIDER') {
        role = 'Cung cấp';
    } else if (role === 'ROLE_CUSTOMER') {
        role = 'Khách hàng';
    }

    if (status === 'active') {
        status = 'Hoạt động';
    } else if (status === 'inactive') {
        status = 'Ngừng hoạt động';
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{user.name}</td>
            <td>{user.phoneNumber}</td>
            <td>{role}</td>
            <td>{status}</td>
            <td>
                <Button color="primary">Chi tiết</Button>
            </td>
            <td>
                <Button color="danger">Chặn</Button>
            </td>
        </tr>
    )
}
