import { ShoppingCartOutlined, DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu } from 'antd';
import Search from 'antd/lib/input/Search';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { RoutersMain } from '../router';
import { SessionStoreKey } from './../constants/app.constants';
import { hasChangeAuth } from '../redux/actions/auth.action';

const MenuAccount = ({ logout }) => (
	<Menu>
		<Menu.Item>
			<Link to='/thong-tin-ca-nhan'>Thông tin tài khoản</Link>
		</Menu.Item>
		<Menu.Item danger onClick={logout}>
			Đăng xuất
		</Menu.Item>
	</Menu>
);

export const Navigation = () => {
	const cartStore = useSelector(state => state.cart);
	const auth = useSelector(state => state.auth);
	const [hasAuth, setHasAuth] = useState(!!sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN));
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		setHasAuth(!!sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN));
	}, [auth]);

	const logout = () => {
		sessionStorage.removeItem(SessionStoreKey.ACCESS_TOKEN);
		dispatch(hasChangeAuth(null));
	};

	const onSearch = value => {
		history.push(`/tim-kiem?search=${value}`);
	};

	return (
		<nav id='menu' className='navbar navbar-default navbar-fixed-top'>
			<div className='container'>
				<div className='navbar-header'>
					<button
						type='button'
						className='navbar-toggle collapsed'
						data-toggle='collapse'
						data-target='#bs-example-navbar-collapse-1'
					>
						{' '}
						<span className='sr-only'>Toggle navigation</span> <span className='icon-bar'></span>{' '}
						<span className='icon-bar'></span> <span className='icon-bar'></span>{' '}
					</button>
					<NavLink to='/' className='navbar-brand page-scroll'>
						Perfume shop
					</NavLink>
				</div>

				<div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
					<ul className='nav navbar-nav navbar-right'>
						{RoutersMain.map(router => {
							if (router.disabled) return <></>;
							return !(router.disabledIsAuth && hasAuth) ? (
								<li key={router.name}>
									<NavLink to={router.path} className='page-scroll' style={{ color: 'black' }}>
										{router.path === '/gio-hang' ? (
											<>
												<ShoppingCartOutlined />
												&nbsp; {router.name}
												<Badge count={(cartStore && Object.keys(cartStore).length) || 0} offset={[-5, -20]}></Badge>
											</>
										) : (
											router.name
										)}
									</NavLink>
								</li>
							) : (
								<></>
							);
						})}
						{hasAuth ? (
							<li className='page-scroll'>
								<Dropdown overlay={<MenuAccount logout={logout} />}>
									<a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
										Tài khoản <DownOutlined />
									</a>
								</Dropdown>
							</li>
						) : null}
						<li className='page-scroll' style={{ paddingTop: 8 }}>
							<Search placeholder='Tìm kiếm' style={{ width: 200 }} loading={false} onSearch={onSearch} />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
