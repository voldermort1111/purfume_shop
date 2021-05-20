import { Carousel, Divider, Empty, Image, PageHeader } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { ProductItem } from '../../components/product-item';
import apiConstants from '../../constants/api.constants';
import { getImagesProduct, getProductByIdAndCode, getProductSimilar } from '../../services/product.service';
import { currencyFormatter } from '../../shared/utils/format';
import { ProductDetailComment } from './components/product-detail-comment';
import { ProductDetailRight } from './components/product-detail-right';

const contentStyle = {
	height: '400px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};

const box = {
	lineHeight: '300px',
	height: '160px',
};

const routes = [
	{
		path: '',
		breadcrumbName: 'Trang chủ',
	},
	{
		path: 'first',
		breadcrumbName: 'Sản phẩm',
	},
	{
		path: 'second',
		breadcrumbName: '100 ml Eau De Toilette Spray',
	},
];

export function ProductDetail() {
	const history = useHistory();
	const { code } = useParams();
	const [product, setProduct] = useState({});
	const [productsSimilar, setProductsSimilar] = useState([]);
	const [images, setImages] = useState([]);
	const params = (code + '').split('__');
	if (params.length != 3) {
		history.push('/404-not-found');
	}
	useEffect(() => {
		window.scrollTo(0, 0);
		getProductByIdAndCode(params[params.length - 1], params[params.length - 2])
			.then(result => {
				if (result.data) {
					setProduct(result.data);
				}
			})
			.catch(() => history.push('/404-not-found'));

		getImagesProduct(params[params.length - 1]).then(result => setImages(result.data.map(_ => _.value)));
	}, []);

	useEffect(() => {
		if (product.id) {
			getProductSimilar(product.id, product.odorGroupId, product.odorRangeId, product.odorRetentionTimeId).then(
				result => {
					if (result.data) {
						setProductsSimilar(result.data);
					}
				},
			);
		}
	}, [product]);

	const productDetailComment = useMemo(() => <ProductDetailComment productId={product.id} />, [product]);

	const detail = useMemo(
		() => (
			<ProductDetailRight
				id={product?.id}
				name={product?.name}
				code={'#' + product?.code}
				status={
					product?.status === 'ACTIVE' && product?.quantity > 0 ? (
						<Text strong>Còn sản phẩm</Text>
					) : (
						<Text type='danger' strong>
							Đã hết
						</Text>
					)
				}
				procedure={product?.provider?.name}
				origin={product?.provider?.national?.name}
				style={product?.style?.value}
				capacity={product?.capacity?.value + ' ' + product?.capacity?.unit}
				odorGroup={product?.odorGroup?.name + ' - ' + product?.odorGroup?.value}
				odorRetentionTime={product?.odorRetentionTime?.value}
				odorRange={product?.odorRange?.value}
				price={product?.price}
				originPrice={product?.originPrice}
				quantityInStock={(product?.status === 'ACTIVE' && product?.quantity) || 0}
			/>
		),
		[product],
	);
	return (
		<div className='container-fluid'>
			<PageHeader breadcrumb={{ routes }} style={{ marginLeft: 20 }} />
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 col-sm-6 col-xs-12' style={{ height: 400 }}>
						<div style={box}>
							{images.length ? (
								<Carousel autoplay dotPosition='bottom' style={{ height: 400 }}>
									{product && product.avatar ? (
										<div>
											<Image height={400} src={`${apiConstants.URL_API}/image/${product.avatar}`} />
										</div>
									) : null}
									{images?.map(image => (
										<div>
											<Image height={400} src={`${apiConstants.URL_API}/image/${image}`} />
										</div>
									))}
								</Carousel>
							) : (
								<div>
									<Image height={400} src={`${apiConstants.URL_API}/image/${product.avatar}`} />
								</div>
							)}
						</div>
					</div>
					<div className='col-md-6 col-sm-6 col-xs-12'>{!product.id ? <></> : detail}</div>
				</div>
				<div>
					<Divider orientation='left' dashed>
						Mô tả chi tiết
					</Divider>
					<Empty />
				</div>
				<div>
					<Divider orientation='left'>Đánh giá sản phẩm</Divider>
					{productDetailComment}
				</div>
				<br />
				<div className='section-title text-center'>
					<h2>Sản phẩm tương tự</h2>
				</div>
				<div className='portfolio-items' style={{ paddingLeft: 50 }}>
					{productsSimilar.map((_product, index) => (
						<div className='col-sm-6 col-md-4 col-lg-4 product-item'>
							<ProductItem
								id={_product.id}
								name={_product.name}
								code={_product.code}
								quantity={(_product.status === 'ACTIVE' && _product.quantity) || 0}
								image={`${apiConstants.URL_API}/image/${_product.avatar}`}
								price={currencyFormatter.format(_product.price)}
								originalPrice={currencyFormatter.format(_product.originPrice)}
								key={index}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
