import React, { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Container } from 'reactstrap';
import { api } from '../../config/axios';

export default function Cancel() {
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        setOrderId(localStorage.getItem("orderId"));
        if (orderId !== null && orderId !== undefined && orderId !== '') {
            api({
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                url: `/orders/updateStatus?orderId=${orderId}&status=cancelled`
            }).then(res => {
                localStorage.removeItem("orderId");
            })
        }
    }, [orderId]);

    return (
        <div>
            <Container className="cancel">
                <div>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi !</div>
                <FaExclamationCircle className="icon-cancel" />
                <h5>Đã hủy thanh toán</h5>
                <a href="/">Về trang chủ</a>
            </Container>
        </div>
    )
}
