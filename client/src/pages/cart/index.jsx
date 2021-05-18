import { DeleteOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, Empty, InputNumber, notification, PageHeader } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getProductByIds } from '../../services/product.service';
import { currencyFormatter } from '../../shared/utils/format';
import { getPathProduct } from './../../shared/utils/tool';
import { clearCartStore, removeToCartStore, updateQuantityCart } from './../../redux/actions/cart.action';
import { useMemo } from 'react';
import FieldTextInput from '../../components/forms/text-input';
import FieldTextArea from '../../components/forms/text-area';
import { Field, Form, Formik } from 'formik';
import FieldSelect from '../../components/forms/select';
import { getCity, getDistrict, getWard } from '../../services/address.service';
import * as Yup from 'yup';
import { PhoneNumberRegex } from '../../shared/utils/regular';
import { createOrder } from '../../services/order.service';
import { getInfo } from '../../services/auth.service';
import { SessionStoreKey } from '../../constants/app.constants';
import apiConstants from '../../constants/api.constants';

const routes = [
	{
		path: '',
		breadcrumbName: 'Trang chủ',
	},
	{
		path: 'first',
		breadcrumbName: 'Giỏ hàng',
	},
];

const OrderFormValidateSchema = Yup.object().shape({
	name: Yup.string().required('Không được bỏ trống'),
	phoneNumber: Yup.string()
		.matches(PhoneNumberRegex, 'Số điện thoại không đúng định dạng')
		.required('Không được bỏ trống'),
	address: Yup.string().max(50, 'Tối đa 50 ký tự').notRequired(),
	note: Yup.string().max(1000, 'Tối đa 1000 ký tự').notRequired(),
});

export function Cart() {
	const history = useHistory();
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const [products, setProducts] = useState([]);
	const [cities, setCities] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);
	const [city, setCity] = useState(0);
	const [district, setDistrict] = useState(0);
	const [ward, setWard] = useState(0);
	const [errorAddress, setErrorAddress] = useState([]);
	const auth = useSelector(state => state.auth);
	const [user, setUser] = useState({});

	useEffect(() => {
		const token = sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN);
		if (!!token) {
			getInfo().then(result => {
				setUser(result.data);
			});
		} else {
			setUser({});
		}
	}, [auth]);

	useEffect(() => {
		console.log(user);
	}, [user]);

	const cartKeys = useMemo(() => (cart && Object.keys(cart)) || [], [cart]);
	const total = useMemo(
		() => (products.length && products.reduce((pre, cur) => pre + cur.price * cart[cur.id], 0)) || 0,
		[cart, products],
	);

	useEffect(() => {
		window.scrollTo(0, 0);
		getCity()
			.then(result => {
				setCities(result.data);
			})
			.catch(error =>
				notification.error({
					placement: 'bottomRight',
					message: error.response.data?.message || error.message || 'Đã xảy ra lỗi!',
				}),
			);
	}, []);

	useEffect(() => {
		if (!cartKeys.length) {
			setProducts([]);
		} else {
			getProductByIds(cartKeys)
				.then(result => setProducts(result.data))
				.catch(error =>
					notification.error({
						placement: 'bottomRight',
						message: error.response.data?.message || error.message || 'Đã xảy ra lỗi!',
					}),
				);
		}
	}, [cartKeys]);

	useEffect(() => {
		setDistrict(0);
		if (!city) {
			setDistricts([]);
		} else {
			getDistrict(city)
				.then(result => setDistricts(result.data))
				.catch(error =>
					notification.error({
						placement: 'bottomRight',
						message: error.response.data?.message || error.message || 'Đã xảy ra lỗi!',
					}),
				);
		}
	}, [city]);

	useEffect(() => {
		setWard(0);
		if (!district) {
			setWards([]);
		} else {
			getWard(district)
				.then(result => setWards(result.data))
				.catch(error =>
					notification.error({
						placement: 'bottomRight',
						message: error.response.data?.message || error.message || 'Đã xảy ra lỗi!',
					}),
				);
		}
	}, [district]);

	const selectCity = useMemo(
		() => (
			<Field
				label='Tỉnh / Thành phố'
				placeholder='Tỉnh / Thành phố'
				required
				id='city'
				name='city'
				width={250}
				valueAbt={city}
				options={cities}
				component={FieldSelect}
				onChange={value => {
					setCity(value);
					if (!value && !errorAddress.includes(1)) {
						setErrorAddress([...errorAddress, 1]);
						return;
					}
					const index = errorAddress.findIndex(error => error === 1);
					if (index != -1) {
						const clone = [...errorAddress];
						clone.splice(index, 1);
						setErrorAddress(clone);
					}
				}}
			/>
		),
		[cities, setCity, city, errorAddress, setErrorAddress],
	);

	const selectDistrict = useMemo(
		() => (
			<Field
				label='Quận / Huyện'
				placeholder='Quận / Huyện'
				required
				id='district'
				name='district'
				width={250}
				options={districts}
				component={FieldSelect}
				valueAbt={district}
				onChange={value => {
					setDistrict(value);
					if (!value && !errorAddress.includes(2)) {
						setErrorAddress([...errorAddress, 2]);
						return;
					}
					const index = errorAddress.findIndex(error => error === 2);
					if (index != -1) {
						const clone = [...errorAddress];
						clone.splice(index, 1);
						setErrorAddress(clone);
					}
				}}
			/>
		),
		[districts, setDistrict, district, errorAddress, setErrorAddress],
	);

	const selectWard = useMemo(
		() => (
			<Field
				label='Xã / Phường'
				placeholder='Xã / Phường'
				required
				id='ward'
				name='ward'
				width={250}
				options={wards}
				valueAbt={ward}
				component={FieldSelect}
				onChange={value => {
					setWard(value);
					if (!value && !errorAddress.includes(3)) {
						setErrorAddress([...errorAddress, 3]);
						return;
					}
					const index = errorAddress.findIndex(error => error === 3);
					if (index != -1) {
						const clone = [...errorAddress];
						clone.splice(index, 1);
						setErrorAddress(clone);
					}
				}}
			/>
		),
		[wards, setWard, ward, errorAddress, setErrorAddress],
	);

	const submit = value => {
		const errorAddress = [];
		if (!city) {
			errorAddress.push(1);
		}
		if (!district) {
			errorAddress.push(2);
		}
		if (!ward) {
			errorAddress.push(3);
		}
		setErrorAddress(errorAddress);
		if (errorAddress.length) {
			return;
		}
		const _city = cities.find(_ => _.id === city);
		const _district = districts.find(_ => _.id === district);
		const _ward = wards.find(_ => _.id === ward);
		const address = `${value.address ? value.address + ', ' : ''}${_city?.name}, ${_district?.name}, ${_ward?.name}`;
		createOrder({
			...value,
			address,
			products: cartKeys.map(key => ({ id: +key, quantity: cart[key] })),
		})
			.then(() => {
				dispatch(clearCartStore());
				notification.success({ placement: 'bottomRight', message: 'Đặt hàng thành công!' });
				history.push('/');
			})
			.catch(error => {
				notification.error({ placement: 'bottomRight', message: error.response.data?.message || error.message });
			});
	};

	const orderForm = useMemo(
		() => (
			<Formik
				enableReinitialize
				validationSchema={OrderFormValidateSchema}
				initialValues={{
					name: user.name || '',
					phoneNumber: user.phoneNumber || '',
					address: '',
					note: '',
					city: '',
					district: '',
					ward: '',
				}}
				onSubmit={submit}
			>
				{({ errors, touched }) => (
					<Form>
						<div className='row'>
							<div className='col-md-6 col-sm-6 col-xs-6'>
								<Field
									label='Họ tên người nhận'
									placeholder='Họ tên người nhận'
									required
									id='name'
									name='name'
									component={FieldTextInput}
								/>
								{errors.name && touched.name ? <Text type='danger'>{errors.name}</Text> : null}
							</div>
							<div className='col-md-6 col-sm-6 col-xs-6'>
								<Field
									label='Số điện thoại người nhận'
									placeholder='Số điện thoại người nhận'
									required
									id='phoneNumber'
									name='phoneNumber'
									component={FieldTextInput}
								/>
								{errors.phoneNumber && touched.phoneNumber ? <Text type='danger'>{errors.name}</Text> : null}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-4'>
								{selectCity}
								{errorAddress.includes(1) ? <Text type='danger'>Không được bỏ trống</Text> : <></>}
							</div>
							<div className='col-md-4'>
								{selectDistrict}
								{errorAddress.includes(2) ? <Text type='danger'>Không được bỏ trống</Text> : <></>}
							</div>

							<div className='col-md-4'>
								{selectWard}
								{errorAddress.includes(3) ? <Text type='danger'>Không được bỏ trống</Text> : <></>}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 col-sm-6 col-xs-6'>
								<Field
									label='Địa chỉ'
									placeholder='Nhập chính xác địa chỉ của bạn'
									id='address'
									name='address'
									component={FieldTextInput}
								/>
							</div>
							{errors.address && touched.address ? <Text type='danger'>{errors.name}</Text> : null}
							<div className='col-md-6'>
								<Field label='Ghi chú' placeholder='Ghi chú' required id='note' name='note' component={FieldTextArea} />
							</div>
							{errors.note && touched.note ? <Text type='danger'>{errors.name}</Text> : null}
						</div>
						<div className='text-center'>
							<button type='submit' className='btn btn-custom btn-lg'>
								Đặt hàng
							</button>
						</div>
					</Form>
				)}
			</Formik>
		),
		[user, submit],
	);

	return (
		<>
			<PageHeader breadcrumb={{ routes }} style={{ marginLeft: 20 }} />
			{cartKeys.length ? (
				<div className='container'>
					<div>
						{products?.length &&
							products.map(product => (
								<div className='row' style={{ marginBottom: 20 }}>
									<div className='col-md-2'>
										<Link to={getPathProduct(product.id, product.name, product.code)}>
											<img
												src={`${apiConstants.URL_API}/image/${product.avatar}`}
												className='img-responsive'
												alt=''
												style={{ width: 150, height: 150 }}
											/>
										</Link>
									</div>
									<div className='col-md-5'>
										<div>
											<Link to={getPathProduct(product.id, product.name, product.code)} style={{ color: 'black' }}>
												<Text strong style={{ fontSize: 20 }}>
													{product.name}
												</Text>
											</Link>
										</div>
										<div>
											<Text strong>Mã sản phẩm &nbsp;</Text>
											<Text>#{product.code}</Text>
										</div>
										<div>
											<Text strong>Giá gốc &nbsp;</Text>
											<Text delete>{currencyFormatter.format(product.originPrice)}</Text>
										</div>
										<div>
											<Text strong>Giá &nbsp;</Text>
											<Text type='danger'>{currencyFormatter.format(product.price)}</Text>
										</div>
										<div>&nbsp;</div>
										<div>
											<Button onClick={() => dispatch(removeToCartStore(product.id))} icon={<DeleteOutlined />} danger>
												Xóa
											</Button>
										</div>
									</div>
									<div className='col-md-2' style={{ paddingTop: 50 }}>
										<InputNumber
											min={1}
											max={(product?.quantity || 0) < 5 ? product?.quantity || 0 : 5}
											defaultValue={cart[product.id]}
											size='small'
											style={{ width: 55 }}
											onChange={e => dispatch(updateQuantityCart({ id: product.id, quantity: e }))}
										/>
									</div>
									<div className='col-md-3' style={{ paddingTop: 50 }}>
										<Text>{currencyFormatter.format(product.price * cart[product.id])}</Text>
									</div>
								</div>
							))}
					</div>
					<Divider orientation='center'>Tổng</Divider>
					<div className='row'>
						<div className='col' style={{ marginLeft: 50 }}>
							<Descriptions layout='horizontal' labelStyle={{ fontSize: 20 }} colon={false}>
								<Descriptions.Item label='Tổng tiền' span={2} strong>
									<Text strong style={{ fontSize: 20 }}>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										{currencyFormatter.format(total)}
									</Text>
								</Descriptions.Item>
							</Descriptions>
							<Descriptions layout='horizontal' labelStyle={{ fontSize: 20 }} colon={false}>
								<Descriptions.Item label='Chiết khấu (0%)' span={2} strong>
									<Text strong style={{ fontSize: 20 }}>
										&nbsp;&nbsp;&nbsp;{'- 0₫'}
									</Text>
								</Descriptions.Item>
							</Descriptions>
							<Descriptions layout='horizontal' labelStyle={{ fontSize: 20 }} colon={false}>
								<Descriptions.Item label='Tổng phải trả' span={2} strong>
									<Text strong style={{ fontSize: 20 }} type='danger'>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currencyFormatter.format(total)}
									</Text>
								</Descriptions.Item>
							</Descriptions>
						</div>
					</div>
					<Divider orientation='center' dashed>
						Thông tin đặt hàng
					</Divider>
					<div>{orderForm}</div>
				</div>
			) : (
				<>
					<Empty />
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
							minHeight: '100vh',
							marginTop: 20,
						}}
					>
						<Link to='/'>
							<Text strong style={{ fontSize: 25 }}>
								{'<< Quay trở lại mua hàng'}
							</Text>
						</Link>
					</div>
				</>
			)}
		</>
	);
}
