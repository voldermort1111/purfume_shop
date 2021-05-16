import { Cart } from './pages/cart';
import { Home } from './pages/home';
import { ProductDetail } from './pages/product-detail';
import { Product } from './pages/product';
import { Login } from './pages/login';
import { SignUp } from './pages/sign-up';
import UserInfo from './pages/user-info';

export const RoutersMain = [
	{
		path: '/',
		name: 'Trang chủ',
		exact: true,
		component: Home,
	},
	{
		path: '/san-pham',
		name: 'Sản phẩm',
		exact: true,
		component: Product,
	},
	{
		path: '/gio-hang',
		name: 'Giỏ hàng',
		exact: true,
		component: Cart,
	},
	{
		path: '/dang-nhap',
		name: 'Đăng nhập',
		exact: true,
		disabledIsAuth: true,
		component: Login,
	},
	{
		path: '/dang-ky',
		name: 'Đăng ký',
		exact: true,
		disabled: true,
		disabledIsAuth: true,
		component: SignUp,
	},
	{
		path: '/tim-kiem',
		name: 'Tìm kiếm',
		exact: true,
		disabled: true,
		component: Product,
	},
	{
		path: '/thong-tin-ca-nhan',
		name: 'Thông tin cá nhân',
		exact: true,
		disabled: true,
		disabledIsAuth: true,
		component: UserInfo,
	},
	{
		path: '/:code',
		name: 'Thông tin Sản phẩm',
		component: ProductDetail,
		disabled: true,
	},
];
