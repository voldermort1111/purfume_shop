import Text from 'antd/lib/typography/Text';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import { getPathProduct } from './../shared/utils/tool';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartStore } from '../redux/actions/cart.action';

export const ProductItem = ({ image, name, price, originalPrice, code, id, quantity }) => {
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();
	return (
		<>
			<div className='portfolio-item'>
				<div className='hover-bg'>
					{' '}
					<NavLink to={getPathProduct(id, name, code)}>
						<a href={image} title='Project Title' data-lightbox-gallery='gallery1'>
							<div className='hover-text'>
								<h4>
									<EyeOutlined />
									&nbsp;Xem chi tiết
								</h4>
							</div>
							<img src={image} className='img-responsive' style={{ width: 300, height: 250 }} />{' '}
						</a>{' '}
					</NavLink>
				</div>
			</div>
			<div>
				<div className='text-left'>
					<Text strong>{name}</Text>
				</div>
				<div className='text-left'>
					<Text>#{code}</Text>
				</div>
			</div>
			{!!quantity ? (
				<>
					{/* <hr></hr> */}
					<div className='row'>
						<div className='col-md-2 text-left'>
							<Tooltip title='Mua ngay'>
								<NavLink to='/gio-hang'>
									<Button
										shape='circle'
										icon={<ShoppingCartOutlined style={{ fontSize: '25px', color: '#db3535' }} />}
										onClick={() => !cart[id] && id && dispatch(addToCartStore({ id, quantity: 1 }))}
										danger
									/>
								</NavLink>
							</Tooltip>
						</div>
						<div className='col-md-10'>
							<div className='row'>
								<div className='col-md-7 text-right'>
									<Text strong>Giá gốc</Text>
								</div>
								<div className='col-md-5 text-right'>
									<Text delete>{originalPrice}</Text>
								</div>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-2 text-left'></div>
						<div className='col-md-10'>
							<div className='row'>
								<div className='col-md-7 text-right'>
									<Text strong>Giá</Text>
								</div>
								<div className='col-md-5 text-right'>
									<Text type='danger'>{price}</Text>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className='text-center'>
					<Text strong type='danger' style={{ fontSize: 20 }}>
						Hết hàng
					</Text>
				</div>
			)}
		</>
	);
};

// ProductItem.propTypes = {
// 	image: PropTypes.string.isRequired,
// 	name: PropTypes.string.isRequired,
// 	price: PropTypes.string.isRequired,
// 	originalPrice: PropTypes.string.isRequired,
// 	code: PropTypes.string.isRequired,
// };
