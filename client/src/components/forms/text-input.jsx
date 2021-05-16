import { Descriptions, Input } from 'antd';
import Text from 'antd/lib/typography/Text';

const FieldTextInput = ({ field, placeholder, label, layout, required, isPassword, labelHint, ...props }) => {
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
							{!!labelHint ? (
								<Text style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: '12' }}>&nbsp;{labelHint}</Text>
							) : (
								<></>
							)}
						</>
					) : (
						label || ''
					)
				}
				span={2}
				strong
			>
				{!isPassword ? (
					<Input placeholder={placeholder || ''} {...props} {...field} />
				) : (
					<Input.Password placeholder={placeholder || ''} {...props} {...field} />
				)}
			</Descriptions.Item>
		</Descriptions>
	);
};
export default FieldTextInput;
