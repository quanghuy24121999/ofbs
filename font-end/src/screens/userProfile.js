import React, { Component } from 'react';
import axios from 'axios'; import {
    Nav, NavItem, NavLink, Container,
    Row, Col, CardImg, Button, Modal,
    ModalHeader, ModalBody, ModalFooter, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';

import imageUser from '../images/default-avatar-user.png';

export default class userProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: Object,
            userImage: '',
            modal: false,
            modalChange: false,
            nestedModal: false,
            nestedModalChange: false,
            closeAll: false,
            closeAllChange: false,
            username: '',
            password: '',
            phone: '',
            email: '',
            address: '',
            gender: '',
            dob: ''
        }

        this.toggle = this.toggle.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleNestedChange = this.toggleNestedChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.toggleAllChange = this.toggleAllChange.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        axios.get(`/users/profile/?userId=${userId}`)
            .then(res => {
                this.setState({
                    user: res.data,
                    username: res.data.user_name,
                    phone: res.data.phone_number,
                    email: res.data.email,
                    address: res.data.address,
                    gender: res.data.gender,
                    dob: res.data.date_of_birth
                });
                if (res.data.iimage_id === null) {
                    this.setState({ userImage: '' });
                }
            })
    }

    toggle() {
        this.setState({ modal: !this.state.modal })
    }

    toggleNested() {
        this.setState({ nestedModal: !this.state.nestedModal, closeAll: false })
    }

    toggleAll() {
        this.onSubmit();
        this.setState({ nestedModal: !this.state.nestedModal, closeAll: true })
    }

    toggleChange() {
        this.setState({ modalChange: !this.state.modalChange })
    }

    toggleNestedChange() {
        this.setState({ nestedModalChange: !this.state.nestedModalChange, closeAllChange: false })
    }

    toggleAllChange() {
        this.onSubmit();
        this.setState({ nestedModalChange: !this.state.nestedModalChange, closeAllChange: true })
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePhonenumber(e) {
        this.setState({ phone: e.target.value })
    }

    onChangeAddress(e) {
        this.setState({ address: e.target.value })
    }

    onChangeGender(e) {
        e.preventDefault();
        this.setState({ gender: e.target.value });
    }

    onChangeDob(e) {
        e.preventDefault();
        this.setState({ dob: e.target.value });
    }

    onSubmit() {
        const userId = this.props.match.params.userId;
        let { address, password, email, phone_number, username,
            gender, dob
        } = this.state;
        axios.patch(`/users/profile/update?userId=${userId}`, {
            "address": address,
            "email": email,
            "phoneNumber": phone_number,
            "name": username,
            "gender": gender,
            "dateOfBirth": dob
        }).then(res => {
            axios.get(`/users/profile/?userId=${userId}`)
                .then(res => {
                    this.setState({
                        user: res.data,
                        username: res.data.user_name,
                        phone: res.data.phone_number,
                        email: res.data.email,
                        address: res.data.address,
                        gender: res.data.gender,
                        dob: res.data.date_of_birth
                    });
                    if (res.data.iimage_id === null) {
                        this.setState({ userImage: '' });
                    }
                })
        })
    }

    render() {
        const { user, userImage, modal, nestedModal, closeAll,
            username, password, email, phone, address, gender, dob,
            modalChange, nestedModalChange, closeAllChange,
        } = this.state;

        let image, genderValue;
        if (userImage === '') {
            image = <CardImg className="user-profile-image" top src={imageUser} />
        } else {
            image = <CardImg className="user-profile-image" top src={'/images/' + user.image_id} />
        }

        if (gender === true || gender === "1") {
            genderValue = "1"
        } else if (gender === false || gender === "0") {
            genderValue = "0"
        } else {
            genderValue = "2"
        }

        return (
            <div>
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem>
                        <NavLink active><Link>Hồ sơ</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to={``}>Đơn của tôi</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to={``}>Ví FBS</Link></NavLink>
                    </NavItem>
                </Nav>
                <div>
                    <Modal isOpen={modal} toggle={this.toggle} className="">
                        <ModalHeader toggle={this.toggle}>Chỉnh sửa</ModalHeader>
                        <ModalBody>
                            <Label for="username"><b>Tên người dùng:</b></Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                onChange={this.onChangeUsername}
                                value={username}
                            />

                            <Label for="phonenumber"><b>Số điện thoại:</b></Label>
                            <Input
                                type="tel"
                                name="phonenumber"
                                id="phonenumber"
                                onChange={this.onChangePhonenumber}
                                value={phone}
                            />

                            <Label for="email"><b>Email:</b></Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                onChange={this.onChangeEmail}
                                value={email}
                            />

                            <Label for="address"><b>Địa chỉ:</b></Label>
                            <Input
                                type="text"
                                name="address"
                                id="address"
                                onChange={this.onChangeAddress}
                                value={address}
                            />

                            <Label for="gender"><b>Giới tính:</b></Label>
                            <Input
                                type="select"
                                name="gender"
                                id="gender"
                                onChange={this.onChangeGender}
                                value={genderValue}
                            >
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                                <option value="2">Khác</option>
                            </Input>

                            <Label for="dateOfBirth"><b>Ngày sinh: </b></Label>
                            <Input
                                type="date"
                                name="date"
                                id="dateOfBirth"
                                value={dob}
                                onChange={this.onChangeDob}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.toggleNested}>Lưu lại</Button>
                            <Modal isOpen={nestedModal} toggle={this.toggleNested} onClosed={closeAll ? this.toggle : undefined}>
                                <ModalHeader>Thông báo</ModalHeader>
                                <ModalBody>Lưu thay đổi ?</ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleNested}>Hủy</Button>{' '}
                                    <Button color="success" onClick={this.toggleAll}>Lưu</Button>
                                </ModalFooter>
                            </Modal>
                        </ModalFooter>
                    </Modal>
                </div>
                <Container>
                    <Row className="user-profile">
                        <Col lg="4" md="4" sm="12" className="user-section-1">
                            {image}
                            <div className="username">{user.user_name}</div>
                            <div className="user-phone-number">{user.phone_number}</div>
                        </Col>
                        <Col lg="8" md="8" sm="12" className="user-section-2">
                            <Row>
                                <div className="user-username">
                                    <div>Tên người dùng:</div>
                                    <div>{user.user_name}</div>
                                </div>
                                <div className="user-phone-number">
                                    <div>Số điện thoại:</div>
                                    <div>{user.phone_number}</div>
                                </div>
                                <div className="user-email">
                                    <div>Email:</div>
                                    <div>{user.email}</div>
                                </div>
                                <div className="user-address">
                                    <div>Địa chỉ:</div>
                                    <div>{user.address}</div>
                                </div>
                                <div className="user-gender">
                                    <div>Giới tính: </div>
                                    {user.gender ? (<div>Nam</div>) : (<div>Nữ</div>)}
                                </div>
                                <div className="user-dob">
                                    <div>Ngày sinh:</div>
                                    <div>{user.date_of_birth}</div>
                                </div>
                                <Button className="btn-edit" color="success" onClick={this.toggle}>Chỉnh sửa</Button>
                                <Button className="btn-user-change-password" color="success" onClick={this.toggleChange}>Thay đổi mật khẩu</Button>
                                <Modal isOpen={modalChange} toggle={this.toggleChange} className="">
                                    <ModalHeader toggle={this.toggleChange}>Thay đổi mật khẩu</ModalHeader>
                                    <ModalBody>
                                        <Label for="pasword"><b>Mật khẩu cũ:</b></Label>
                                        <Input
                                            type="password"
                                            name="pasword"
                                            id="pasword"
                                            placeholder="Nhập mật khẩu cũ"
                                            onChange={this.onChangePassword}
                                            value={password}
                                        />
                                        <Label for="pasword"><b>Mật khẩu mới:</b></Label>
                                        <Input
                                            type="password"
                                            name="pasword"
                                            id="pasword"
                                            placeholder="Nhập mật khẩu mới"
                                            onChange={this.onChangePassword}
                                            value={password}
                                        />
                                        <Label for="pasword"><b>Mật khẩu mới:</b></Label>
                                        <Input
                                            type="password"
                                            name="pasword"
                                            id="pasword"
                                            placeholder="Nhập lại mật khẩu mới"
                                            onChange={this.onChangePassword}
                                            value={password}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="success" onClick={this.toggleNestedChange}>Lưu lại</Button>
                                        <Modal isOpen={nestedModalChange} toggle={this.toggleNestedChange} onClosed={closeAllChange ? this.toggleChange : undefined}>
                                            <ModalHeader>Thông báo</ModalHeader>
                                            <ModalBody>Lưu thay đổi ?</ModalBody>
                                            <ModalFooter>
                                                <Button color="secondary" onClick={this.toggleNestedChange}>Hủy</Button>{' '}
                                                <Button color="success" onClick={this.toggleAllChange}>Lưu</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </ModalFooter>
                                </Modal>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
}
