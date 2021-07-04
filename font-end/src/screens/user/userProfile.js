import React, { Component } from 'react';
import axios from 'axios'; import {
    Nav, NavItem, Container,
    Row, Col, CardImg, Button, Modal,
    ModalHeader, ModalBody, ModalFooter,
    Input, Label, Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ImageUploading from "react-images-uploading";

import TopMenu from '../../components/common/topMenu';
import Footer from '../../components/common/footer';

import imageUser from '../../images/default-avatar-user.png';
import { formatDate } from '../../common/formatDate';

let userId = '';
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
            oldPassword: '',
            newPassword: '',
            reNewPassword: '',
            phone: '',
            email: '',
            address: '',
            gender: '',
            dob: '',
            images: []
        }

        this.toggle = this.toggle.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleNestedChange = this.toggleNestedChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.toggleAllChange = this.toggleAllChange.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeReNewPassword = this.onChangeReNewPassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitChangePassword = this.onSubmitChangePassword.bind(this);
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateImage = this.updateImage.bind(this);
    }

    componentDidMount() {
        userId = localStorage.getItem('userId');
        axios.get(`/users/profile/?userId=${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
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
                if (res.data.image_id === null) {
                    this.setState({ userImage: '' });
                } else {
                    this.setState({ userImage: res.data.image_id })
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
        this.setState({ nestedModalChange: !this.state.nestedModalChange, closeAllChange: true })
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onChangeOldPassword(e) {
        this.setState({ oldPassword: e.target.value })
    }

    onChangeNewPassword(e) {
        this.setState({ newPassword: e.target.value })
    }

    onChangeReNewPassword(e) {
        this.setState({ reNewPassword: e.target.value })
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
        let { address, email, phone, username,
            gender, dob
        } = this.state;

        axios.patch(`/users/profile/update?userId=${userId}`, {
            "address": address,
            "email": email,
            "phoneNumber": phone,
            "name": username,
            "gender": gender,
            "dateOfBirth": dob
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            axios.get(`/users/profile/?userId=${userId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
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
                    if (res.data.image_id === null) {
                        this.setState({ userImage: '' });
                    }
                })
        })
    }

    validateConfirmPassword() {
        const { oldPassword, newPassword, reNewPassword } = this.state;
        let phoneNumber = localStorage.getItem("currentUser");

        document.getElementById('error-form1').style.display = "none";
        document.getElementById('error-form2').style.display = "none";
        document.getElementById('error-form3').style.display = "none";

        if (newPassword === reNewPassword) {
            if (oldPassword !== '' && newPassword !== ''
                && reNewPassword !== '') {
                axios.post(`/users/login`, {
                    phoneLogin: phoneNumber,
                    password: oldPassword
                }).then(res => {
                    this.toggleNestedChange();
                }).catch(err => {
                    document.getElementById('error-form1').style.display = "block";
                })
            } else {
                document.getElementById('error-form3').style.display = "block";
            }
        } else {
            document.getElementById('error-form2').style.display = "block";
        }
    }

    onSubmitChangePassword() {
        axios.patch('/users/update/' + userId, {
            "password": this.state.newPassword
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        this.toggleAllChange();
    }

    onChange = (imageList, addUpdateIndex) => {
        this.setState({ images: imageList });
    };

    displayImage() {
        document.getElementById("user-image").style.display = "block";
    }

    updateImage() {
        let formData = new FormData();
        let imageId = this.state.userImage;
        formData.append('file', this.state.images[0].file);
        document.getElementById('error-form4').style.display = "none";

        if (imageId === null || imageId === '') {
            axios.post(`/images/upload?userId=${userId}&dishId=0&serviceId=0&comboId=0&restaurantId=0&promotionId=0&typeId=1`,
                formData, {
            }).then(res => {
                window.location.reload();
            }).catch(err => {
                document.getElementById('error-form4').style.display = "block";
            })
        } else {
            axios.post(`/images/update?imageId=${imageId}`,
                formData, {
            }).then(res => {
                window.location.reload();
            }).catch(err => {
                document.getElementById('error-form4').style.display = "block";
            })
        }
    }

    render() {
        const { user, userImage, modal, nestedModal, closeAll,
            username, oldPassword, newPassword, reNewPassword,
            email, phone, address, gender, dob, modalChange,
            nestedModalChange, closeAllChange, images
        } = this.state;


        let image;
        if (userImage === '') {
            image = <CardImg id="user-image" className="user-profile-image" top src={imageUser} />
        } else {
            image = <CardImg id="user-image" className="user-profile-image" top src={'/images/' + user.image_id} />
        }

        return (
            <div>
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem className="active">
                        <Link to={`/users/profile`}>Hồ sơ</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/users/profile/order`}>Đơn của tôi</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/users/profile/my-restaurant`}>Nhà hàng của tôi</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={``}>Ví FBS</Link>
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
                                value={gender}
                            >
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                                <option value="">Khác</option>
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
                            <ImageUploading
                                value={images}
                                onChange={this.onChange}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpdate,
                                    onImageRemove,
                                }) => (
                                    <div className="upload__image-wrapper">
                                        {image}
                                        {imageList.map((image, index) => (
                                            (document.getElementById("user-image").style.display = "none"),
                                            (
                                                <div key={index} className="image-item">
                                                    <CardImg className="user-profile-image" top src={image.data_url} />
                                                    <Alert color="danger" id="error-form4" className="error-form">
                                                        Không thể tải ảnh lên, vui lòng chọn một ảnh khác !
                                                    </Alert>
                                                    <div className="image-item__btn-wrapper">
                                                        <Button color="success" onClick={() => this.updateImage()}>Lưu</Button>
                                                        <Button onClick={() => {
                                                            onImageRemove(index); this.displayImage();
                                                        }}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        )
                                        )}

                                        <div className="btn-change-image" onClick={onImageUpdate}>Thay đổi ảnh</div>
                                    </div>
                                )}
                            </ImageUploading>
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
                                    <div>{formatDate(user.date_of_birth)}</div>
                                </div>
                                <Button className="btn-edit" color="success" onClick={this.toggle}>Chỉnh sửa</Button>
                                <Button className="btn-user-change-password" color="success" onClick={this.toggleChange}>Thay đổi mật khẩu</Button>
                                <Modal isOpen={modalChange} toggle={this.toggleChange} className="">
                                    <ModalHeader toggle={this.toggleChange}>Thay đổi mật khẩu</ModalHeader>
                                    <ModalBody>
                                        <Label for="oldPassword"><b>Mật khẩu cũ:</b></Label>
                                        <Input
                                            type="password"
                                            name="oldPassword"
                                            id="oldPassword"
                                            placeholder="Nhập mật khẩu cũ"
                                            onChange={this.onChangeOldPassword}
                                            value={oldPassword}
                                        />
                                        <Label for="newPassword"><b>Mật khẩu mới:</b></Label>
                                        <Input
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            placeholder="Nhập mật khẩu mới"
                                            onChange={this.onChangeNewPassword}
                                            value={newPassword}
                                        />
                                        <Label for="reNewPassword"><b>Mật khẩu mới:</b></Label>
                                        <Input
                                            type="password"
                                            name="reNewPassword"
                                            id="reNewPassword"
                                            placeholder="Nhập lại mật khẩu mới"
                                            onChange={this.onChangeReNewPassword}
                                            value={reNewPassword}
                                        />
                                        <Alert color="danger" id="error-form1" className="error-form">
                                            Mật khẩu cũ không đúng !
                                        </Alert>
                                        <Alert color="danger" id="error-form2" className="error-form">
                                            Mật khẩu không khớp !
                                        </Alert>
                                        <Alert color="danger" id="error-form3" className="error-form">
                                            Vui lòng nhập đủ 3 thông tin
                                        </Alert>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="success" onClick={this.validateConfirmPassword}>Lưu lại</Button>
                                        <Modal isOpen={nestedModalChange} toggle={this.toggleNestedChange} onClosed={closeAllChange ? this.toggleChange : undefined}>
                                            <ModalHeader>Thông báo</ModalHeader>
                                            <ModalBody>Lưu thay đổi ?</ModalBody>
                                            <ModalFooter>
                                                <Button color="secondary" onClick={this.toggleNestedChange}>Hủy</Button>{' '}
                                                <Button color="success" onClick={this.onSubmitChangePassword}>Lưu</Button>
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
