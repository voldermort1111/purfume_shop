import { Descriptions, Select } from 'antd';
import Text from 'antd/lib/typography/Text';

const FieldSelect = ({ field, placeholder, label, layout, width, options, onChange, valueAbt, required, ...props }) => {
	return (
		<Descriptions
			layout={layout && (layout == 'horizontal' || layout == 'vertical') ? layout : 'vertical'}
			labelStyle={{ fontWeight: 'bold' }}
			colon={false}
		>
			<Descriptions.Item
				label={
					required ? (
						<>
							{label}
							<Text type='danger'>*</Text>
						</>
					) : (
						label || ''
					)
				}
				span={2}
				strong
			>
				<Select
					defaultValue={valueAbt || 0}
					style={{ width: width || 120 }}
					placeholder={placeholder || ''}
					name={field.name}
					onChange={onChange}
					{...props}
					value={valueAbt || 0}
				>
					<Select.Option value={0}>------</Select.Option>
					{options && options?.map(option => <Select.Option value={option.id}>{option.name}</Select.Option>)}
				</Select>
			</Descriptions.Item>
		</Descriptions>
	);
};
export default FieldSelect;
