export const productBreadcrumbs = [
	{
		path: '/',
		breadcrumbName: 'Trang chủ',
	},
	{
		path: '/san-pham',
		breadcrumbName: 'Sản phẩm',
	},
];

export const productPannels = {
	gender: {
		label: 'Giới tính',
		options: [
			{
				label: 'Nam',
				value: 'Male',
			},
			{
				label: 'Nữ',
				value: 'Female',
			},
			{
				label: 'Nam và nữ',
				value: 'All',
			},
		],
	},
	// national: {
	// 	label: 'Xuất xứ',
	// 	options: [],
	// },
	provider: {
		label: 'Thương hiệu',
		options: [],
	},
	odorGroup: {
		label: 'Nhóm hương',
		options: [],
	},
	capacity: {
		label: 'Dung tích',
		options: [],
	},
	price: {
		label: 'Giá',
		options: [
			{
				label: '< 500.000₫',
				value: 1,
				min: 0,
				max: 500000,
			},
			{
				label: '500.000₫ - 2.000.000₫ ',
				value: 2,
				min: 500000,
				max: 2000000,
			},
			{
				label: '2.000.000₫ - 5.000.000₫ ',
				value: 3,
				min: 2000000,
				max: 5000000,
			},
			{
				label: '5.000.000₫ - 10.000.000₫ ',
				value: 4,
				min: 5000000,
				max: 10000000,
			},
			{
				label: '>10.000.000₫ ',
				min: 10000000,
				max: 0,
			},
		],
	},
};
