import { EditOutlined, UserOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Comment,
	Descriptions,
	List,
	Progress,
	Rate,
	Form as FromAntd,
	notification,
	Pagination,
	Empty,
} from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { SessionStoreKey } from './../../../constants/app.constants';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import FieldTextArea from '../../../components/forms/text-area';
import {
	evaluateProduct,
	getListEvaluateByProduct,
	getAvgPoint,
	checkEvaluated,
} from './../../../services/evaluate.service';

const EvaluateValidateSchema = Yup.object().shape({
	note: Yup.string().max(1000, 'Không quá 1000 ký tự'),
});

const dataDefaultEvaluateStatistic = [
	{
		point: 1,
		total: 0,
	},
	{
		point: 2,
		total: 0,
	},
	{
		point: 3,
		total: 0,
	},
	{
		point: 4,
		total: 0,
	},
	{
		point: 5,
		total: 0,
	},
];

export const ProductDetailComment = ({ productId }) => {
	const auth = useSelector(state => state.auth);
	const [hasAuth, setHasAuth] = useState(!!sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN));
	const [hiddenAddComment, setHiddenAddComment] = useState(true);
	const [rate, setRate] = useState(5);
	const [page, setPage] = useState(1);
	const [evaluates, setEvaluates] = useState([]);
	const [totalResult, setTotalResult] = useState(0);
	const [avgPoint, setAvgPoint] = useState(0);
	const [evaluateStatistic, setEvaluateStatistic] = useState(dataDefaultEvaluateStatistic);
	const [evaluateTotal, setEvaluateTotal] = useState(0);
	const [commentAction, setCommentAction] = useState(true);
	const [canEvaluate, setcanEvaluate] = useState(false);
	const [reloadEvaluate, setReloadEvaluate] = useState(null);

	useEffect(() => {
		if (productId) {
			getListEvaluateByProduct({ limit: 5, page, productId })
				.then(result => {
					setTotalResult(result.data[1]);
					setEvaluates(result.data[0]);
				})
				.catch(error =>
					notification.error({
						placement: 'bottomRight',
						message: error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi!',
					}),
				);
		}
	}, [productId, page, commentAction]);

	useEffect(() => {
		if (productId) {
			if (hasAuth) {
				checkEvaluated(productId).then(result => setcanEvaluate(!result.data));
			} else {
				setcanEvaluate(false);
			}
		}
	}, [hasAuth, productId, reloadEvaluate]);

	useEffect(() => {
		if (productId) {
			getAvgPoint({ productId })
				.then(result => {
					setEvaluateTotal(result.data.total);
					setAvgPoint(result.data.avg);
					setEvaluateStatistic(result.data.evaluates);
				})
				.catch(error =>
					notification.error({
						placement: 'bottomRight',
						message: error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi!',
					}),
				);
		}
	}, [productId, commentAction]);

	useEffect(() => {
		const token = sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN);
		setHasAuth(token);
		if (!hiddenAddComment && !token) {
			setHiddenAddComment(true);
		}
	}, [auth]);

	const listComment = useMemo(
		() => (
			<List
				className='comment-list'
				itemLayout='horizontal'
				dataSource={evaluates}
				renderItem={item => (
					<li>
						<Comment
							author={item.user.name}
							avatar={<UserOutlined style={{ fontSize: 20 }} />}
							content={
								<>
									<Rate disabled style={{ fontSize: 15 }} defaultValue={item.point} /> <p>{item.comment}</p>
								</>
							}
							datetime={new Date(item.createdAt).toLocaleString()}
						/>
					</li>
				)}
			/>
		),
		[evaluates],
	);

	const PaginationMemo = useMemo(
		() => (
			<Pagination
				total={totalResult}
				showTotal={(total, range) => `${range[0]}-${range[1]} / ${total} đánh giá`}
				defaultPageSize={5}
				defaultCurrent={page !== undefined ? page : 1}
				responsive
				showSizeChanger={false}
				onChange={page => setPage(page)}
			/>
		),
		[totalResult, page],
	);

	const onSubmit = value => {
		const body = { point: rate, productId };
		if (value.comment) {
			body.comment = value.comment;
		}
		evaluateProduct(body)
			.then(() => {
				setCommentAction(!commentAction);
				setHiddenAddComment(true);
				setReloadEvaluate(Date.now());
			})
			.catch(error =>
				notification.error({
					placement: 'bottomRight',
					message: error.response.data?.message || error.message || 'Đã xảy ra lỗi!',
				}),
			);
	};

	return (
		<>
			<div className='row'>
				{avgPoint ? (
					<>
						<div className='col-md-2' style={{ marginBottom: 30 }}>
							<div className='text-center'>
								<Title type='danger'>{avgPoint}</Title>
								<Rate style={{ fontSize: 25 }} disabled defaultValue={avgPoint} />
							</div>
						</div>
						<div className='col-md-8' style={{ marginBottom: 30 }}>
							{evaluateStatistic.map(_ => (
								<div className='row'>
									<div className='col-md-3 col-sm-4 col-xs-7'>
										<Rate style={{ fontSize: 15 }} disabled defaultValue={_.point} />
										&nbsp;<Text>({_.total})</Text>
									</div>
									<div className='col-md-9 col-sm-8 col-xs-5' style={{ paddingTop: 7 }}>
										<Progress
											strokeColor={{
												'0%': '#108ee9',
												'100%': '#87d068',
											}}
											percent={Math.floor((_.total / evaluateTotal) * 100)}
											format={() => ''}
										/>
									</div>
								</div>
							))}
						</div>
					</>
				) : null}
				{hasAuth && !canEvaluate ? <Text>Bạn đã đánh giá sản phẩm này rồi</Text> : null}
				{hasAuth && canEvaluate ? (
					<div className='col-md-2'>
						<Button icon={<EditOutlined />} type='primary' onClick={() => setHiddenAddComment(false)}>
							Thêm đánh giá
						</Button>
					</div>
				) : (
					<></>
				)}
			</div>
			{!hiddenAddComment ? (
				<Card>
					<Descriptions layout='horizontal' labelStyle={{ fontWeight: 'bold' }} colon={false}>
						<Descriptions.Item label='Cho sản phẩm này' span={2}>
							<Rate style={{ fontSize: 25 }} defaultValue={rate} onChange={value => setRate(value)} />
						</Descriptions.Item>
					</Descriptions>
					<Text style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: '12' }}>Nhập tối đa 1000 ký tự</Text>
					<Formik validationSchema={EvaluateValidateSchema} initialValues={{ comment: '' }} onSubmit={onSubmit}>
						{({ errors, touched }) => (
							<Form>
								<FromAntd.Item>
									<Field id='comment' name='comment' rows={4} component={FieldTextArea} />
									{errors.comment && touched.comment ? <Text type='danger'>{errors.comment}</Text> : null}
								</FromAntd.Item>
								<FromAntd.Item>
									<Button htmlType='submit' type='primary'>
										Đánh giá
									</Button>
									&nbsp;&nbsp;&nbsp;&nbsp;
									<Button htmlType='button' onClick={() => setHiddenAddComment(true)} type='default'>
										Đóng
									</Button>
								</FromAntd.Item>
							</Form>
						)}
					</Formik>
				</Card>
			) : (
				<></>
			)}
			{evaluates && evaluates.length ? listComment : <Empty />}
			<div className='text-center' style={{ marginTop: 30 }}>
				{totalResult ? PaginationMemo : null}
			</div>
		</>
	);
};
