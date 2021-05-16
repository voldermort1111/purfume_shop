import { Descriptions, Empty, PageHeader, Pagination, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductItem } from '../../components/product-item';
import { getCapacities } from '../../services/capacity.service';
import { getOdorGroups } from '../../services/odor-group.service';
import { getProviders } from '../../services/provider.service';
import { getProductsPage } from '../../services/product.service';
import { ProductFilter } from './components/product-filter';
import { productBreadcrumbs, productPannels } from './constants/product.constants';
import { useDispatch, useSelector } from 'react-redux';
import { changePageOptions, clearProductStore } from '../../redux/actions/product.action';
import apiConstants from '../../constants/api.constants';
import { currencyFormatter } from '../../shared/utils/format';
import { useLocation } from 'react-router';

const limit = 12;

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function builderProductQuery({ page, gender, provider, odorGroup, capacity, price, sortBy, direction, name }) {
	const query = {};
	if (name) {
		query.name = name;
	}
	if (page !== undefined) {
		query.page = page;
	}
	if (gender) {
		query.gender = gender;
	}
	if (provider) {
		query.providerId = provider;
	}
	if (capacity) {
		query.capacityId = capacity;
	}
	if (odorGroup) {
		query.odorGroupId = odorGroup;
	}
	if (price) {
		if (productPannels.price.options[price - 1].min) {
			query.minPrice = productPannels.price.options[price - 1].min;
		}
		if (productPannels.price.options[price - 1].max) {
			query.maxPrice = productPannels.price.options[price - 1].max;
		}
	}
	if (sortBy) {
		query.sortBy = sortBy;
	}
	if (direction) {
		query.direction = direction;
	}
	query.loadEagerRelations = false;
	return query;
}

export function Product() {
	const { page, gender, national, provider, odorGroup, capacity, price, sortBy, direction } = useSelector(
		state => state.product,
	);
	const query = useQuery();
	const [search, setSearch] = useState(query.get('search'));
	const dispatch = useDispatch();
	const [panels, setPanels] = useState(productPannels);
	const [totalResult, setTotalResult] = useState(0);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		window.scrollTo(0, 0);
		Promise.all([getProviders(), getCapacities(), getOdorGroups()]).then(([providers, capacities, odorGroups]) => {
			const _provider = Object.assign({}, panels.provider, {
				options: providers.data?.map(data => ({ label: data.name, value: data.id })),
			});
			const _capacity = Object.assign({}, panels.capacity, {
				options: capacities.data?.map(data => ({
					label: `${data.value} ${data.unit}`,
					value: data.id,
				})),
			});
			const _odorGroup = Object.assign({}, panels.odorGroup, {
				options: odorGroups.data?.map(data => ({ label: data.name, value: data.id })),
			});
			setPanels({
				...productPannels,
				provider: _provider,
				capacity: _capacity,
				odorGroup: _odorGroup,
			});
		});
		return () => dispatch(clearProductStore());
	}, []);

	useEffect(() => {
		const query = builderProductQuery({
			page,
			gender,
			national,
			provider,
			odorGroup,
			capacity,
			price,
			sortBy,
			direction,
			name: search,
		});
		getProductsPage({ ...query, limit }).then(result => {
			setTotalResult(result.data[1]);
			setProducts(result.data[0] || []);
		});
	}, [page, gender, national, provider, odorGroup, capacity, price, sortBy, direction, search]);

	const onFilterChange = useCallback(
		(value, panel, attribute) => {
			dispatch(changePageOptions({ [panel]: value ? attribute : null }));
		},
		[gender, national, provider, odorGroup, capacity, price],
	);

	const PaginationMemo = useMemo(
		() => (
			<Pagination
				total={totalResult}
				showTotal={(total, range) => `${range[0]}-${range[1]} / ${total} sản phẩm`}
				defaultPageSize={limit}
				defaultCurrent={page !== undefined ? page : 1}
				responsive
				showSizeChanger={false}
				onChange={page => dispatch(changePageOptions({ page }))}
			/>
		),
		[totalResult, page],
	);

	const TabFilter = useMemo(
		() => (
			<ProductFilter
				panels={panels}
				onChange={onFilterChange}
				filters={{ gender, national, provider, odorGroup, capacity, price }}
			/>
		),
		[gender, national, provider, odorGroup, capacity, price, onFilterChange, panels],
	);

	const onSelectSortChange = e => {
		if (e == 'default') {
			dispatch(changePageOptions({ sortBy: null, direction: null }));
		} else {
			dispatch(changePageOptions({ sortBy: 'price', direction: e }));
		}
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-3 col-sm-3 col-xs-9'>
					<PageHeader breadcrumb={{ routes: productBreadcrumbs }} style={{ marginLeft: 20 }} />
				</div>
				<div className='col-md-9 col-sm-9 col-xs-9' style={{ paddingTop: 10 }}>
					<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }} colon={false}>
						<Descriptions.Item label='Sắp xếp theo' span={2}>
							<Select defaultValue='default' style={{ width: 200 }} onChange={onSelectSortChange}>
								<Option value='default'>Mặc định</Option>
								<Option value='ASC'>Giá từ thấp đến cao</Option>
								<Option value='DESC'>Giá từ cao đến thấp</Option>
							</Select>
						</Descriptions.Item>
					</Descriptions>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-2'>{TabFilter}</div>
				<div className='col-md-10' style={{ paddingLeft: 20 }}>
					<div className='row'>
						{products?.map((product, index) => (
							<div className='col-sm-6 col-md-4 col-lg-4 product-item'>
								<ProductItem
									id={product.id}
									name={product.name}
									code={product.code}
									quantity={(product.status === 'ACTIVE' && product.quantity) || 0}
									image={`${apiConstants.URL_API}/image/${product.avatar}`}
									price={currencyFormatter.format(product.price)}
									originalPrice={currencyFormatter.format(product.originPrice)}
									key={index}
								/>
							</div>
						))}
					</div>
					<div className='text-center' style={{ marginTop: 30 }}>
						{totalResult ? PaginationMemo : <Empty />}
					</div>
				</div>
			</div>
		</div>
	);
}
