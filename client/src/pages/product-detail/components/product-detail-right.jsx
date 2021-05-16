import { CarOutlined, HeartOutlined, PhoneOutlined, PlusOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Button, Descriptions, InputNumber, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import PropTypes from 'prop-types';
import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartStore } from './../../../redux/actions/cart.action';
import { currencyFormatter } from './../../../shared/utils/format';

export const ProductDetailRight = ({
	id,
	name,
	code,
	status,
	procedure,
	origin,
	style,
	capacity,
	odorGroup,
	odorRetentionTime,
	odorRange,
	price,
	originPrice,
	quantityInStock,
}) => {
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	const prevQuantity = useRef(quantity);
	const inputQuantity = useMemo(
		() => (
			<InputNumber
				min={1}
				max={quantityInStock < 5 ? quantityInStock : 5}
				defaultValue={1}
				size='small'
				style={{ width: 55 }}
				onChange={e => {
					setQuantity(e);
					prevQuantity.current = e;
				}}
			/>
		),
		[setQuantity],
	);
	const buttonList = useMemo(
		() => (
			<div>
				<Link to='/gio-hang' style={{ color: 'white' }}>
					<button
						type='button'
						className='btn btn-custom'
						style={{ marginBottom: 10 }}
						onClick={() => !cart[id] && id && dispatch(addToCartStore({ id, quantity: prevQuantity.current }))}
						disabled={quantityInStock <= 0}
					>
						{' '}
						Mua ngay
					</button>
				</Link>
				&nbsp;&nbsp;&nbsp;
				{cart[id] ? (
					<Text type='warning'>Đã có trong giỏ hàng</Text>
				) : (
					<Button
						type='default'
						icon={<PlusOutlined />}
						style={{ marginBottom: 10 }}
						onClick={() => !cart[id] && id && dispatch(addToCartStore({ id, quantity: prevQuantity.current }))}
						disabled={quantityInStock <= 0}
					>
						Thêm vào giỏ hàng
					</Button>
				)}
				&nbsp;&nbsp;&nbsp;
				{/* <Tooltip title='Yêu thích'>
					<Button shape='circle' icon={<HeartOutlined />} danger style={{ marginBottom: 10 }}></Button>
				</Tooltip> */}
			</div>
		),
		[cart],
	);
	return (
		<>
			<div style={{ marginBottom: 15 }}>
				<Text style={{ fontSize: 25 }} strong>
					{name}
				</Text>
			</div>
			<div>
				<div>
					<Text style={{ fontSize: 40 }} type='danger'>
						{currencyFormatter.format(price)}
					</Text>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<Text style={{ fontSize: 20 }} delete>
						{currencyFormatter.format(originPrice)}
					</Text>
				</div>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Mã sản phẩm' span={2} strong>
						{code}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Tình trạng' span={2} strong>
						{status}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Số lượng còn trong kho' span={2} strong>
						{quantityInStock}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Thương hiệu' span={2} strong>
						{procedure}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Xuất xứ' span={2} strong>
						{origin}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Phong cách' span={2} strong>
						{style}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Nhóm hương' span={2} strong>
						{odorGroup}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Dung tích' span={2} strong>
						{capacity}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Thời gian lưu hương' span={2} strong>
						{odorRetentionTime}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Độ tỏa hương' span={2} strong>
						{odorRange}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }}>
					<Descriptions.Item label='Số lượng' span={2}>
						{inputQuantity}
					</Descriptions.Item>
				</Descriptions>
				{buttonList}
				<div style={{ marginTop: 20 }}>
					<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }} colon={false}>
						<Descriptions.Item label={<CarOutlined />} span={2}>
							<Text strong>MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</Text>&nbsp;&nbsp;(Đơn hàng trên 1,000,000đ)
						</Descriptions.Item>
					</Descriptions>
					<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }} colon={false}>
						<Descriptions.Item label={<SnippetsOutlined />} span={2}>
							<Text strong>ĐỔI SẢN PHẨM DỄ DÀNG</Text>&nbsp;&nbsp;(Đổi sản phẩm nguyên giá trong vòng 02 ngày)
						</Descriptions.Item>
					</Descriptions>
					<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }} colon={false}>
						<Descriptions.Item label={<PhoneOutlined />} span={2}>
							<Text strong>TỔNG ĐÀI BÁN HÀNG 0123456789</Text>&nbsp;&nbsp;(Liên hệ từ 09:00 - 21:30 mỗi ngày)
						</Descriptions.Item>
					</Descriptions>
				</div>
			</div>
		</>
	);
};

ProductDetailRight.propTypes = {
	name: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	procedure: PropTypes.string.isRequired,
	origin: PropTypes.string.isRequired,
	style: PropTypes.string,
	capacity: PropTypes.string.isRequired,
	odorGroup: PropTypes.string,
	odorRetentionTime: PropTypes.string,
	odorRange: PropTypes.string,
};
