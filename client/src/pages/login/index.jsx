import { Card, notification } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Field, Form, Formik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';
import FieldTextInput from '../../components/forms/text-input';
import * as Yup from 'yup';
import { login } from '../../services/auth.service';
import { hasChangeAuth } from './../../redux/actions/auth.action';
import { useDispatch } from 'react-redux';
import { SessionStoreKey } from '../../constants/app.constants';
import { clearCartStore } from '../../redux/actions/cart.action';

const LoginValidateSchema = Yup.object().shape({
	email: Yup.string().email('Không đúng định dạng email').required('Không được bỏ trống'),
	password: Yup.string().min(8, 'Mật khẩu quá ngắn').max(16, 'Mật khẩu quá dài').required('Không được bỏ trống'),
});

export function Login() {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN);
	if (token) {
		history.push('/');
		return <></>;
	}
	const submit = ({ email, password }) => {
		login({ email, password })
			.then(result => {
				sessionStorage.setItem(SessionStoreKey.ACCESS_TOKEN, result.data.accessToken);
				dispatch(hasChangeAuth(result.data.accessToken));
				dispatch(clearCartStore());
				history.push('/');
			})
			.catch(error =>
				notification.error({
					placement: 'bottomRight',
					message: error.response.data?.message || error.message || 'Đã xảy ra lỗi!',
				}),
			);
	};
	return (
		<div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
			<Card
				title='Đăng nhập'
				headStyle={{ display: 'flex', justifyContent: 'center' }}
				style={{ width: 500, boxShadow: '0px 0px 15px gray', borderRadius: '15px' }}
			>
				<Formik validationSchema={LoginValidateSchema} initialValues={{ email: '', password: '' }} onSubmit={submit}>
					{({ errors, touched }) => (
						<Form>
							<div className='row'>
								<div className='col-md-12 col-sm-12 col-xs-12'>
									<Field
										label='Tên đăng nhập'
										placeholder='Tên đăng nhập'
										labelHint='(Là địa chỉ email đã đăng ký)'
										required
										id='email'
										name='email'
										component={FieldTextInput}
									/>
									{errors.email && touched.email ? <Text type='danger'>{errors.email}</Text> : null}
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12 col-sm-12 col-xs-12'>
									<Field
										label='Mật khẩu'
										placeholder='Mật khẩu'
										isPassword
										required
										id='password'
										name='password'
										component={FieldTextInput}
									/>
									{errors.password && touched.password ? <Text type='danger'>{errors.password}</Text> : null}
								</div>
							</div>
							<div className='text-center'>
								<button type='submit' className='btn btn-custom btn-lg'>
									Đăng nhập
								</button>
							</div>
							<div className='text-center' style={{ marginTop: 20 }}>
								Bạn chưa có tài khoản?&nbsp;&nbsp;
								<NavLink to='/dang-ky'>Đăng ký</NavLink>
							</div>
						</Form>
					)}
				</Formik>
			</Card>
		</div>
	);
}
