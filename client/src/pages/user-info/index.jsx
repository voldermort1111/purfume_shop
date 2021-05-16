import { CloseOutlined } from '@ant-design/icons';
import { Card, Descriptions, notification } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useEffect, useState } from 'react';
import Text from 'antd/lib/typography/Text';
import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import FieldTextInput from '../../components/forms/text-input';
import * as Yup from 'yup';
import { changePassword, getInfo, updateInfo } from '../../services/auth.service';
import { useSelector } from 'react-redux';
import { SessionStoreKey } from '../../constants/app.constants';
import { PhoneNumberRegex } from '../../shared/utils/regular';

const ValidationSchema = Yup.object().shape({
	password: Yup.string()
		.min(8, 'Mật khẩu quá ngắn')
		.max(16, 'Mật khẩu quá dài')
		.matches(/[a-z]/, 'Phải bao gồm chữ thường, chữ in hoa và số')
		.matches(/[A-Z]/, 'Phải bao gồm chữ thường, chữ in hoa và số')
		.matches(/\d/, 'Phải bao gồm chữ thường, chữ in hoa và số')
		.required('Không được bỏ trống'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Không khớp với mật khẩu đã nhập')
		.required('Không được bỏ trống'),
});

const ValidationInfoSchema = Yup.object().shape({
	name: Yup.string().max(50, 'Không quá 50 ký tự').required('Không được bỏ trống'),
	phoneNumber: Yup.string()
		.matches(PhoneNumberRegex, 'Số điện thoại không đúng định dạng')
		.required('Không được bỏ trống'),
});

export default function UserInfo() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisibleInfo, setIsModalVisibleInfo] = useState(false);
	const [user, setUser] = useState({});
	const auth = useSelector(state => state.auth);
	const history = useHistory();
	const [reload, setReload] = useState(true);

	useEffect(() => {
		const token = sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN);
		if (!token) {
			history.push('/');
		}
	}, [auth]);

	useEffect(() => {
		getInfo().then(result => setUser(result.data));
	}, [reload]);

	const submit = ({ password }) => {
		changePassword({ password })
			.then(() =>
				notification.success({
					placement: 'bottomRight',
					message: 'Đổi mật khẩu thành công!',
				}),
			)
			.catch(error =>
				notification.error({
					placement: 'bottomRight',
					message: error.response.data?.message || error.message || 'Đã xảy ra lỗi!',
				}),
			)
			.finally(() => setIsModalVisible(false));
	};

	const submitInfo = ({ name, phoneNumber }) => {
		updateInfo({ name, phoneNumber })
			.then(() =>
				notification.success({
					placement: 'bottomRight',
					message: 'Cập nhập thông tin thành công',
				}),
			)
			.catch(error =>
				notification.error({
					placement: 'bottomRight',
					message: error.response.data?.message || error.message || 'Đã xảy ra lỗi!',
				}),
			)
			.finally(() => {
				setReload(!reload);
				setIsModalVisibleInfo(false);
			});
	};

	return (
		<div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
			<Modal
				style={{ top: 150 }}
				closeIcon={<CloseOutlined style={{ marginTop: 20 }} />}
				title='Đổi mật khẩu'
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<Formik
					validationSchema={ValidationSchema}
					initialValues={{ password: '', confirmPassword: '' }}
					onSubmit={submit}
				>
					{({ errors, touched }) => (
						<Form>
							<div className='row'>
								<div className='col-md-12 col-sm-12 col-xs-12'>
									<Field
										label='Mật khẩu'
										placeholder='Mật khẩu'
										labelHint='(Dài từ 8 - 16 ký tự. Bao gồm cả chữ hoa, chữ thường và số)'
										isPassword
										required
										id='password'
										name='password'
										component={FieldTextInput}
									/>
									{errors.password && touched.password ? <Text type='danger'>{errors.password}</Text> : null}
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12 col-sm-12 col-xs-12'>
									<Field
										label='Nhập lại mật khẩu'
										placeholder='Nhập lại mật khẩu'
										required
										isPassword
										id='confirmPassword'
										name='confirmPassword'
										component={FieldTextInput}
									/>
									{errors.confirmPassword && touched.confirmPassword ? (
										<Text type='danger'>{errors.confirmPassword}</Text>
									) : null}
								</div>
							</div>
							<div className='text-center'>
								<button type='submit' className='btn btn-custom btn-lg'>
									Xác nhận
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</Modal>
			<Modal
				style={{ top: 150 }}
				closeIcon={<CloseOutlined style={{ marginTop: 20 }} />}
				title='Đổi thông tin'
				visible={isModalVisibleInfo}
				onCancel={() => setIsModalVisibleInfo(false)}
				footer={null}
			>
				<Formik
					validationSchema={ValidationInfoSchema}
					initialValues={{ name: user.name || '', phoneNumber: user.phoneNumber || '' }}
					onSubmit={submitInfo}
				>
					{({ errors, touched }) => (
						<Form>
							<div className='row'>
								<div className='col-md-12 col-sm-12 col-xs-12'>
									<Field
										label='Họ và tên'
										placeholder='Họ và tên'
										required
										id='name'
										name='name'
										component={FieldTextInput}
									/>
									{errors.name && touched.name ? <Text type='danger'>{errors.name}</Text> : null}
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12 col-sm-12 col-xs-12'>
									<Field
										label='Số điện thoại'
										placeholder='Số điện thoại'
										required
										id='phoneNumber'
										name='phoneNumber'
										component={FieldTextInput}
									/>
									{errors.phoneNumber && touched.phoneNumber ? <Text type='danger'>{errors.phoneNumber}</Text> : null}
								</div>
							</div>
							<div className='text-center'>
								<button type='submit' className='btn btn-custom btn-lg'>
									Xác nhận
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</Modal>
			<Card
				title='Thông tin cá nhân'
				headStyle={{ display: 'flex', justifyContent: 'center' }}
				style={{ width: 500, boxShadow: '0px 0px 15px gray', borderRadius: '15px' }}
			>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Họ và tên' span={2} strong>
						{user.name}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Email' span={2} strong>
						{user.email}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Số điện thại' span={2} strong>
						{user.phoneNumber}
					</Descriptions.Item>
				</Descriptions>
				<div className='text-center' style={{ marginTop: 30 }}>
					<button onClick={() => setIsModalVisible(true)} className='btn btn-custom btn-lg' style={{ marginRight: 20 }}>
						Đổi mật khẩu
					</button>
					<button onClick={() => setIsModalVisibleInfo(true)} className='btn btn-custom btn-lg'>
						Đổi thông tin
					</button>
				</div>
			</Card>
		</div>
	);
}
