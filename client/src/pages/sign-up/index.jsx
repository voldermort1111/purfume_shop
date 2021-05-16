import { Card, notification } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Field, Form, Formik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';
import FieldTextInput from '../../components/forms/text-input';
import { PhoneNumberRegex } from '../../shared/utils/regular';
import * as Yup from 'yup';
import { signup } from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import { hasChangeAuth } from './../../redux/actions/auth.action';
import { SessionStoreKey } from '../../constants/app.constants';

const SignupValidateSchema = Yup.object().shape({
	name: Yup.string().max(50, 'Không quá 50 ký tự').required('Không được bỏ trống'),
	phoneNumber: Yup.string()
		.matches(PhoneNumberRegex, 'Số điện thoại không đúng định dạng')
		.required('Không được bỏ trống'),
	email: Yup.string().email('Không đúng định dạng email').required('Không được bỏ trống'),
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

export function SignUp() {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN);
	if (token) {
		history.push('/');
		return <></>;
	}
	const submit = ({ name, phoneNumber, email, password }) => {
		signup({ name, phoneNumber, email, password })
			.then(result => {
				sessionStorage.setItem(SessionStoreKey.ACCESS_TOKEN, result.data.accessToken);
				dispatch(hasChangeAuth(result.data.accessToken));
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
				<Formik
					validationSchema={SignupValidateSchema}
					initialValues={{ email: '', password: '', confirmPassword: '', name: '', phoneNumber: '' }}
					onSubmit={submit}
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
							<div className='row'>
								<div className='col-md-12 col-sm-12 col-xs-12'>
									<Field
										label='Email'
										placeholder='Email'
										labelHint='(Dùng làm tên đăng nhập)'
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
									Đăng ký
								</button>
							</div>
							<div className='text-center' style={{ marginTop: 20 }}>
								Bạn đã có tài khoản?&nbsp;&nbsp;
								<NavLink to='/dang-nhap'>Đăng nhập</NavLink>
							</div>
						</Form>
					)}
				</Formik>
			</Card>
		</div>
	);
}
