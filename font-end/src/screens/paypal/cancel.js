import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Container } from 'reactstrap';

export default function Cancel() {
    return (
        <Container>
            <FaExclamationCircle className="icon-cancel"/>
            <h3>Đã hủy thanh toán</h3>
            <a href="/">Về trang chủ</a>
        </Container>
    )
}
