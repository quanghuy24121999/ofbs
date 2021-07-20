import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Container } from 'reactstrap';

export default function Success() {
    return (
        <Container>
            <FaCheckCircle className="icon-success"/>
            <h3>Thanh toán thành công</h3>
            <a href="/">Về trang chủ</a>
        </Container>
    )
}
