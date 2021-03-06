/* eslint-disable no-sequences */
import React, { Component } from 'react';
import {
    Row, Col, NavItem, Nav, Container,
    Input, Label, Button, Modal, ModalHeader, ModalBody,
    ModalFooter, CardImg, Alert
} from 'reactstrap';
import subVn from "sub-vn";
import { Link } from 'react-router-dom';
import ImageUploading from "react-images-uploading";
import { api, url } from '../../config/axios';

import TopMenu from '../../components/common/topMenu';
import Footer from '../../components/common/footer';
import RestaurantAvater from '../../images/default-restaurant.png';
import { validateCapacity, validateDescription, validateECapacity, validateEmpty, validatePhoneNumber, validateUsername } from '../../common/validate';
import { Notify } from '../../common/notify';
import Messenger from '../../components/common/messenger';

let restaurantId = '';
export default class myRestaurantDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            provinces: subVn.getProvinces(),
            districts: [],
            types: [],
            status: [],
            images: [],
            user: {},
            modal: false,
            modal1: false,

            restaurantName: '',
            restaurantAvatar: '',
            restaurantCertificate: '',
            restaurantType: {
                id: '',
                name: ''
            },
            restaurantStatus: {
                id: '',
                name: ''
            },
            provinceName: '',
            provinceCode: '',
            districtName: '',
            districtCode: '',
            restaurantAddress: '',
            restaurantPhone: '',
            restaurantSize: '',
            restaurantDescription: '',
            restaurantBusinessCode: '',
        }

        this.onProvinceClick = this.onProvinceClick.bind(this);
        this.onDistrictClick = this.onDistrictClick.bind(this);
        this.onChangeRestaurantName = this.onChangeRestaurantName.bind(this);
        this.onChangeRestaurantType = this.onChangeRestaurantType.bind(this);
        this.onChangeRestaurantStatus = this.onChangeRestaurantStatus.bind(this);
        this.onChangeRestaurantAddress = this.onChangeRestaurantAddress.bind(this);
        this.onChangeRestaurantPhone = this.onChangeRestaurantPhone.bind(this);
        this.onChangeRestaurantSize = this.onChangeRestaurantSize.bind(this);
        this.onChangeRestaurantDescription = this.onChangeRestaurantDescription.bind(this);
        this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    findProvinceAndDistrictCode(provinceName, districtName) {
        let districts = [];
        this.state.provinces.forEach(province => {
            if (provinceName === province.name) {
                this.setState({ provinceCode: province.code })
                districts = subVn.getDistrictsByProvinceCode(province.code);
                districts.forEach(district => {
                    if (districtName === district.name) {
                        this.setState({
                            districts: districts,
                            districtCode: district.code,
                            districtName: district.name
                        })
                    }
                })
            }
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        restaurantId = localStorage.getItem('resId');

        api.get(`/restaurants/providerTypes`)
            .then(res => {
                this.setState({ types: res.data })
            })

        api.get(`/users/findByPhoneNumber/${localStorage.getItem("currentUser")}`)
            .then(res => {
                this.setState({ user: res.data })
            })

        api.get(url + `/images/getImagesRestaurant?restaurantId=${restaurantId}`)
            .then(res => {
                let tempArr = res.data;
                tempArr.forEach(item => {
                    if (item.image_type === 'Avatar') {
                        this.setState({ restaurantAvatar: item.image_id });
                    } else if (item.image_type === 'Certificate') {
                        this.setState({ restaurantCertificate: item.image_id });
                    }
                })

            })

        api.get(`/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
            .then(res => {
                let restaurant = res.data;
                this.findProvinceAndDistrictCode(restaurant.province, restaurant.district);

                this.setState({
                    restaurantName: restaurant.restaurantName,
                    restaurantType: {
                        id: restaurant.providerType.id,
                        name: restaurant.providerType.name
                    },
                    restaurantStatus: {
                        id: restaurant.status.id,
                        name: restaurant.status.name
                    },
                    provinceName: restaurant.province,
                    districtName: restaurant.district,
                    restaurantAddress: restaurant.address,
                    restaurantPhone: restaurant.phoneNumber,
                    restaurantSize: restaurant.size,
                    restaurantDescription: restaurant.description,
                    restaurantBusinessCode: restaurant.bussinessLicenseId
                }, () => {
                    let statusName = this.state.restaurantStatus.name;
                    let tempObj = { id: '', name: '' }
                    let tempArr = [];
                    let count = 0;

                    if (statusName === 'pending') {
                        tempObj.id = 3;
                        tempObj.name = 'Ch??? duy???t';
                        this.setState({
                            restaurantStatus: tempObj,
                            status: tempArr
                        })
                        tempArr.push(tempObj);
                        count = count + 1;
                    } else if (statusName === 'cancelled') {
                        let tempObj1 = { id: 4, name: 'Kh??ng ???????c duy???t' };
                        let tempObj2 = { id: 3, name: 'Ch??? duy???t' };
                        tempArr.push(tempObj1);
                        tempArr.push(tempObj2);

                        if (statusName === 'cancelled') {
                            this.setState({ restaurantStatus: tempObj1 });
                        }
                        if (statusName === 'pending') {
                            this.setState({ restaurantStatus: tempObj2 });
                        }

                        this.setState({ status: tempArr });
                        count = count + 1;
                    } else if (statusName === 'banned') {
                        tempObj.id = 5;
                        tempObj.name = '???? b??? ch???n';

                        this.setState({
                            restaurantStatus: tempObj,
                            status: tempArr
                        })
                        tempArr.push(tempObj);
                        count = count + 1;
                    }

                    if (count === 0) {
                        let tempObj1 = { id: 1, name: '??ang ho???t ?????ng' };
                        let tempObj2 = { id: 2, name: 'Ng???ng ho???t ?????ng' };
                        tempArr.push(tempObj1);
                        tempArr.push(tempObj2);

                        if (statusName === 'active') {
                            this.setState({ restaurantStatus: tempObj1 });
                        }
                        if (statusName === 'inactive') {
                            this.setState({ restaurantStatus: tempObj2 });
                        }

                        this.setState({ status: tempArr });
                    }
                })
            })
    }

    onChangeRestaurantName(e) {
        this.setState({ restaurantName: e.target.value });
    }

    onChangeRestaurantType(e) {
        let index = e.nativeEvent.target.selectedIndex;
        let name = e.nativeEvent.target[index].text;
        this.setState({
            restaurantType: {
                id: e.target.value,
                name: name
            }
        });
    }

    onChangeRestaurantStatus(e) {
        let index = e.nativeEvent.target.selectedIndex;
        let id = e.target.value;
        let name = e.nativeEvent.target[index].text;
        let nameStatus = '';

        if (name === '??ang ho???t ?????ng') {
            nameStatus = 'active';
        } else if (name === 'Ng???ng ho???t ?????ng') {
            nameStatus = 'inactive';
        } else if (name === 'Ch??? duy???t') {
            nameStatus = 'pending';
        } else if (name === 'Kh??ng ???????c duy???t') {
            nameStatus = 'cancelled';
        } else if (name === '???? b??? ch???n') {
            nameStatus = 'banned';
        }

        this.setState({
            restaurantStatus: {
                id: id,
                name: nameStatus
            }
        });
    }

    onProvinceClick(event) {
        event.preventDefault();
        let provinceCode = event.target.value;
        this.setState({
            districts: subVn.getDistrictsByProvinceCode(provinceCode)
        });
        let index = event.nativeEvent.target.selectedIndex;
        let provinceName = event.nativeEvent.target[index].text;
        this.setState({
            provinceCode: provinceCode,
            provinceName: provinceName
        });
    }

    onDistrictClick(event) {
        event.preventDefault();
        let index = event.nativeEvent.target.selectedIndex;
        let districtName = event.nativeEvent.target[index].text;
        this.setState({
            districtName: districtName,
            districtCode: event.target.value
        });
    }

    onChangeRestaurantAddress(e) {
        this.setState({ restaurantAddress: e.target.value });
    }


    onChangeRestaurantPhone(e) {
        this.setState({ restaurantPhone: e.target.value });
    }

    onChangeRestaurantSize(e) {
        this.setState({ restaurantSize: e.target.value });
    }

    onChangeRestaurantDescription(e) {
        this.setState({ restaurantDescription: e.target.value });
    }

    checkRequire() {
        const { restaurantAddress, restaurantBusinessCode,
            restaurantDescription, restaurantName, restaurantPhone, restaurantSize,
        } = this.state;
        let checkbox = '';
        checkbox = document.getElementById('cb-accept');
        if (checkbox !== '' && checkbox !== undefined) {
            if (!validateEmpty(restaurantName)) {
                Notify('Vui l??ng nh???p t??n nh?? h??ng', 'error', 'top-right');
                return false;
            } else if (!validateEmpty(restaurantAddress)) {
                Notify('Vui l??ng nh???p ?????a ch??? ', 'error', 'top-right');
                return false;
            } else if (!validateEmpty(restaurantPhone)) {
                Notify('S??? ??i???n tho???i kh??ng ???????c ????? tr???ng', 'error', 'top-right');
                return false;
            } else if (!validateEmpty(restaurantSize) || restaurantSize === '0') {
                Notify('S???c ch???a kh??ng ???????c ????? tr???ng ho???c sai ?????nh d???ng', 'error', 'top-right');
                return false;
            } else if (!validateEmpty(restaurantBusinessCode)) {
                Notify('M?? gi???y ph??p kinh doanh kh??ng ???????c ????? tr???ng', 'error', 'top-right');
                return false;
            } else if (!validateEmpty(restaurantDescription)) {
                Notify('Vui l??ng nh???p m?? t???', 'error', 'top-right');
                return false;
            } else if (validateEmpty(restaurantDescription) && !validateDescription(restaurantDescription)) {
                Notify('M?? t??? qu?? d??i (nh??? h??n 2000 k?? t???)', 'error', 'top-right');
                return false;
            } else {
                return true;
            }
        }
    }

    validate() {
        const { restaurantAddress, restaurantName,
            restaurantPhone, restaurantSize
        } = this.state;

        if (this.checkRequire()) {
            if (!validateUsername(restaurantName)) {
                Notify('T??n nh?? h??ng qu?? d??i (nh??? h??n 100 k?? t???)', 'error', 'top-right');
                return false;
            } else if (!validateUsername(restaurantAddress)) {
                Notify('T??n ?????a ch??? qu?? d??i (nh??? h??n 100 k?? t???)', 'error', 'top-right');
                return false;
            } else if (!validatePhoneNumber(restaurantPhone)) {
                Notify('S??? ??i???n tho???i sai ?????nh d???ng', 'error', 'top-right');
                return false;
            } else if (!validateECapacity(restaurantSize)) {
                Notify('S???c ch???a sai ?????nh d???ng', 'error', 'top-right');
                return false;
            } else if (!validateCapacity(restaurantSize)) {
                Notify('S???c ch???a qu?? l???n', 'error', 'top-right');
                return false;
            } else {
                return true;
            }
        }
    }

    onSubmitUpdate() {
        const {
            districtName, provinceName, restaurantAddress, restaurantDescription, user,
            restaurantName, restaurantPhone, restaurantSize, restaurantStatus, restaurantType,
        } = this.state;
        api.post(`/restaurants/updateInforRestaurant`,
            {
                "id": restaurantId,
                "provider": user,
                "province": provinceName,
                "district": districtName,
                "address": restaurantAddress,
                "phoneNumber": restaurantPhone,
                "bussinessLicenseId": null,
                "restaurantName": restaurantName,
                "status": restaurantStatus,
                "description": restaurantDescription,
                "size": restaurantSize,
                "providerType": restaurantType
            }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        )
            .then(res => {
                if (restaurantStatus.name === 'pending') {
                    api.post(`/notifications/insertNotification`,
                        {
                            "content": `C?? nh?? h??ng ${restaurantName} ????ng k?? l???i`,
                            "customer": null,
                            "provider": null,
                            "forAdmin": true,
                            "type": "restaurant",
                            "read": false
                        }
                    ).then(() => {
                        this.toggle();
                        Notify('C???p nh???t th??nh c??ng', 'success', 'top-right');
                    })
                } else {
                    this.toggle();
                    Notify('C???p nh???t th??nh c??ng', 'success', 'top-right');
                }
            })
    }

    toggle() {
        this.setState({ modal: !this.state.modal })
    }

    onChange = (imageList, addUpdateIndex) => {
        this.setState({ images: imageList });
    };

    updateImage() {
        let formData = new FormData();
        let imageId = this.state.restaurantAvatar;
        formData.append('file', this.state.images[0].file);
        document.getElementById('error-form4').style.display = "none";

        if (imageId === null || imageId === '') {
            api.post(url + `/images/upload?userId=0&dishId=0&serviceId=0&comboId=0&restaurantId=${restaurantId}&promotionId=0&typeId=1`,
                formData, {
            }).then(res => {
                window.location.reload();
            }).catch(err => {
                Notify('T???i ???nh l??n kh??ng th??nh c??ng', 'error', 'top-right');
            })
        } else {
            api.post(url + `/images/update?imageId=${imageId}`,
                formData, {
            }).then(res => {
                window.location.reload();
            }).catch(err => {
                Notify('T???i ???nh l??n kh??ng th??nh c??ng', 'error', 'top-right');
            })
        }
    }

    displayImage() {
        document.getElementById("user-image").style.display = "block";
    }

    render() {
        const { provinces, districts, types, status, provinceCode, districtCode,
            restaurantAddress, restaurantBusinessCode, restaurantDescription,
            restaurantName, restaurantPhone, restaurantSize, restaurantType, modal,
            restaurantStatus, restaurantAvatar, restaurantCertificate, images
        } = this.state;

        let image;
        if (restaurantAvatar === '') {
            image = <CardImg id="user-image" className="restaurant-profile-image" top src={RestaurantAvater} />
        } else {
            image = <CardImg id="user-image" className="restaurant-profile-image" top src={url + '/images/' + restaurantAvatar} />
        }

        return (
            <div className="myRes-detail">
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem className="active">
                        <Link to={`/users/profile/my-restaurant/detail`}>Th??ng tin</Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/image`
                            }}
                        >
                            ???nh
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/menu`,
                                state: { restaurantId: localStorage.getItem('resId') }
                            }}
                        >
                            Th???c ????n
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/combo`
                            }}
                        >
                            Combo m??n ??n
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/service`
                            }}
                        >
                            D???ch v???
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/promotion`
                            }}
                        >
                            Khuy???n m??i
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/order`
                            }}
                        >
                            ????n h??ng
                        </Link>
                    </NavItem>
                </Nav>
                <Container className="myRes-detail-content">
                    <Row className="myRes-detail-content-row">
                        <Col lg="6" md="12" sm="12" className="myRes-detail-content-img">
                            <Row>
                                <Col lg="12" md="12" sm="12">
                                    <ImageUploading
                                        value={images}
                                        onChange={this.onChange}
                                        dataURLKey="data_url"
                                        acceptType={['jpg', 'jpeg', 'gif', 'png']}
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
                                                            <CardImg className="restaurant-profile-image" top src={image.data_url} />
                                                            <Alert color="danger" id="error-form4" className="error-form">
                                                                Kh??ng th??? t???i ???nh l??n, vui l??ng ch???n m???t ???nh kh??c !
                                                            </Alert>
                                                            <div className="image-item__btn-wrapper">
                                                                <Button color="success" onClick={() => this.updateImage()}>L??u</Button>
                                                                <Button onClick={() => {
                                                                    onImageRemove(index); this.displayImage();
                                                                }}
                                                                >
                                                                    H???y
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                                )}

                                                <div className="btn-change-image" onClick={onImageUpdate}>Thay ?????i ???nh</div>
                                            </div>
                                        )}
                                    </ImageUploading>
                                </Col>
                                <Col lg="12" md="12" sm="12">
                                    <CardImg id="user-image" className="restaurant-profile-image" top src={url + '/images/' + restaurantCertificate} />
                                    <h5 className="img-title">Gi???y ch???ng nh???n v??? sinh an to??n th???c ph???m</h5>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="6" md="12" sm="12" className="myRes-detail-content-info">
                            <Row>
                                <Col lg="3">
                                    <Label for="restaurant-name"><b>T??n nh?? h??ng <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="9">
                                    <Input
                                        type="text"
                                        name="restaurant-name"
                                        id="restaurant-name"
                                        placeholder="Nh???p t??n nh?? h??ng"
                                        onChange={this.onChangeRestaurantName}
                                        value={restaurantName}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="3">
                                    <Label for="restaurant-name"><b>Lo???i h??nh <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="9">
                                    <Input
                                        type="select"
                                        name="type"
                                        id="type"
                                        onChange={this.onChangeRestaurantType}
                                        value={restaurantType.id}
                                    >
                                        {types.map((type) => {
                                            return (
                                                <option key={type.id} value={type.id}>
                                                    {type.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="3">
                                    <Label for="restaurant-name"><b>Tr???ng th??i <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="9">
                                    <Input
                                        type="select"
                                        name="status"
                                        id="status"
                                        onChange={this.onChangeRestaurantStatus}
                                        value={restaurantStatus.id}
                                    >
                                        {status.map((status) => {
                                            return (
                                                <option key={status.id} value={status.id}>
                                                    {status.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="4">
                                    <Label for="citySelect"><b>Ch???n t???nh/ th??nh ph??? <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="8">
                                    <Input
                                        type="select"
                                        name="citySelect"
                                        id="citySelect"
                                        value={provinceCode}
                                        onChange={this.onProvinceClick}
                                    >
                                        {provinces.map((province) => {
                                            return (
                                                <option key={province.code} value={province.code}>
                                                    {province.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="4">
                                    <Label for="districtSelect"><b>Ch???n qu???n/ huy???n <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="8">
                                    <Input
                                        type="select"
                                        name="districtSelect"
                                        id="districtSelect"
                                        value={districtCode}
                                        onChange={this.onDistrictClick}
                                    >
                                        {districts.map((district) => {
                                            return (
                                                <option key={district.code} value={district.code}>
                                                    {district.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="3">
                                    <Label for="restaurant-address"><b>?????a ch??? <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="9">
                                    <Input
                                        type="text"
                                        name="restaurant-address"
                                        id="restaurant-address"
                                        placeholder="Nh???p ?????a ch??? c???a nh?? h??ng"
                                        onChange={this.onChangeRestaurantAddress}
                                        value={restaurantAddress}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="3">
                                    <Label for="restaurant-phoneNumber"><b>S??? ??i???n tho???i <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="9">
                                    <Input
                                        type="tel"
                                        name="restaurant-phoneNumber"
                                        id="restaurant-phoneNumber"
                                        placeholder="Nh???p s??? ??i???n tho???i c???a nh?? h??ng"
                                        onChange={this.onChangeRestaurantPhone}
                                        value={restaurantPhone}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="3">
                                    <Label for="restaurant-size"><b>S???c ch???a (Kh??ch) <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="9">
                                    <Input
                                        type="number"
                                        name="restaurant-size"
                                        id="restaurant-size"
                                        min={1}
                                        placeholder="Nh???p s???c ch???a c???a nh?? h??ng"
                                        onChange={this.onChangeRestaurantSize}
                                        value={restaurantSize}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="5">
                                    <Label for="restaurant-code-legal"><b>M?? gi???y ph??p kinh doanh <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="7">
                                    <Input
                                        type="text"
                                        name="restaurant-code-legal"
                                        id="restaurant-code-legal"
                                        placeholder=""
                                        value={restaurantBusinessCode}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg="2">
                                    <Label for="restaurant-description"><b>M?? t??? <span className="require-icon">*</span></b></Label>
                                </Col>
                                <Col lg="10">
                                    <Input
                                        type="textarea"
                                        name="restaurant-description"
                                        id="restaurant-description"
                                        placeholder="M?? t??? v??? nh?? h??ng"
                                        onChange={this.onChangeRestaurantDescription}
                                        value={restaurantDescription}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="update-restaurant">
                                    <Button className="btn-update-restaurant" onClick={() => {
                                        let userId = '';

                                        if (this.validate()) {
                                            api.get(`/restaurants/getProviderIdByPhoneNumber/${restaurantPhone}`)
                                                .then(res => {
                                                    userId = res.data;

                                                    if (userId !== this.state.user.id) {
                                                        Notify('S??? ??i???n tho???i ???? t???n t???i', 'error', 'top-right');
                                                    } else {
                                                        this.toggle();
                                                    }

                                                }).catch(() => {
                                                    this.toggle();
                                                })
                                        }
                                    }} color="success">C???p nh???t</Button>
                                </Col>
                            </Row>

                            <Modal isOpen={modal} toggle={this.toggle} className={``}>
                                <ModalHeader toggle={this.toggle}>Th??ng b??o</ModalHeader>
                                <ModalBody>
                                    B???n c?? ch???c ch???n c???p nh???t th??ng tin ?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={this.onSubmitUpdate}>?????ng ??</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Quay l???i</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
                <Footer />
                <Messenger />
            </div>
        )
    }
}
