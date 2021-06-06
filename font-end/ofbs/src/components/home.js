import { Component } from 'react';
import {
    CardImg, Row, Col, Form, FormGroup,
    Input, Label, Button, Card, CardTitle, CardText,
    CardSubtitle, CardBody, Container
} from 'reactstrap';

import subVn from "sub-vn";

import TopMenu from './topMenu';
import Footer from './footer';
export default class home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            provinces: subVn.getProvinces(),
            districts: []
        };
        this.onProvinceClick = this.onProvinceClick.bind(this);
    }

    onProvinceClick(event) {
        event.preventDefault();
        let provinceCode = event.target.value;
        this.setState({
            districts: subVn.getDistrictsByProvinceCode(provinceCode)
        });
    }

    render() {
        let { provinces, districts } = this.state;

        return (
            <div className="home-container">
                <TopMenu />
                <div className="wallpaper">
                    <CardImg className="image" src={process.env.PUBLIC_URL + '/images/wallpaper.png'} alt="Logo" />
                    <div className="home-title">Feast Booking</div>
                </div>
                <div className="home-search">
                    <Form className="search-form">
                        <FormGroup>
                            <Input
                                type="text"
                                name="text"
                                id="text-search"
                                placeholder="Tìm kiếm"
                            />
                        </FormGroup>
                        <div className="search-location">
                            <FormGroup className="citySelect">
                                <Input type="select" name="citySelect" id="citySelect" onChange={this.onProvinceClick}>
                                    <option>Tỉnh/ Thành phố</option>
                                    {provinces.map((province) => {
                                        return (
                                            <option key={province.code} value={province.code}>
                                                {province.name}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup className="districtSelect">
                                <Input type="select" name="districtSelect" id="districtSelect">
                                    <option>Quận/ Huyện</option>
                                    {districts.map((district) => {
                                        return (
                                            <option key={district.code} value={district.code}>
                                                {district.name}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                        </div>
                        <div className="search-other">
                            <FormGroup>
                                <Input
                                    type="date"
                                    name="date"
                                    id="exampleDate"
                                    placeholder="date placeholder"
                                />
                            </FormGroup>
                            <FormGroup className="search-other-cb1" check>
                                <Label check>
                                    <Input type="checkbox" /> Tiệc lưu động
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" /> Tiệc tại trung tâm
                            </Label>
                            </FormGroup>
                        </div>
                        <Input type="submit" className="btn btn-success btn-search" value="Tìm kiếm" />
                    </Form>

                </div>
                <div className="home-content">
                    <div className="content-title">Trung tâm tổ chức sự kiện nổi bật</div>
                    <div className="content-restaurant">
                        <div className="content-restaurant-heading">
                            <div className="heading-title">Tiệc lưu động</div>
                            <div className="heading-see-all">Xem tất cả</div>
                        </div>
                        <Container className="content-restaurant-list">
                            <Row className="content-restaurant-row">
                                <Col lg="3" md="6" sm="12">
                                    <div className="item">
                                        <Card>
                                            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle tag="h5">Card title</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                                <Button>Button</Button>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Col>
                                <Col lg="3" md="6" sm="12">
                                    <div className="item">
                                        <Card>
                                            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle tag="h5">Card title</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                                <Button>Button</Button>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Col>
                                <Col lg="3" md="6" sm="12">
                                    <div className="item">
                                        <Card>
                                            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle tag="h5">Card title</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                                <Button>Button</Button>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Col>
                                <Col lg="3" md="6" sm="12">
                                    <div className="item">
                                        <Card>
                                            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle tag="h5">Card title</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                                <Button>Button</Button>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}