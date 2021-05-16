import { Descriptions } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const FieldTextArea = ({ field, placeholder, label, layout, rows, ...props }) => {
	return (
		<Descriptions
			layout={layout && (layout == 'horizontal' || layout == 'vertical') ? layout : 'vertical'}
			labelStyle={{ fontWeight: 'bold' }}
			colon={false}
		>
			<Descriptions.Item label={label || ''} span={2} strong>
				<TextArea placeholder={placeholder || ''} rows={rows || 2} {...field} {...props} />
			</Descriptions.Item>
		</Descriptions>
	);
};
export default FieldTextArea;
