import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ReactPaginate from 'react-paginate';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';
import axios from 'axios';
import PromotionItem from '../components/promotionItem';

export default class promotion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            perPage: 5,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.receivedData();

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData();
        });

    };

    receivedData() {
        axios.get(`/promotions`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const promotions = slice.map((promotion, index) => {
                    return <div key={index}>
                        <PromotionItem promotion={promotion} />
                    </div>
                })

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    promotions
                })
            })
    }

    render() {
        return (
            <div>
                <TopMenu />
                <Container className="promotion">
                    <div className="promtion-title">Thông tin ưu đãi</div>
                    <div className="promotion-list">
                        {this.state.promotions}
                    </div>
                    <ReactPaginate
                        previousLabel={"Trang trước"}
                        nextLabel={"Trang sau"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={5}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </Container>
                <Footer />
            </div>
        )
    }
}
