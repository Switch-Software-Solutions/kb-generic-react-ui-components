import React from 'react';
import styles from './StatusMessage.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExclamationCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const StatusMessage = (props) => {
	const { t } = useTranslation();

	let icon,
		statusClass = [styles.statusMsg];
	switch (props.type) {
		case STATUS_MESSAGE_TYPES.LOADING:
			statusClass.push(styles.statusMsg_Main);
			icon = <FontAwesomeIcon icon={faCircleNotch} spin />;
			break;
		case STATUS_MESSAGE_TYPES.INFO:
			statusClass.push(styles.statusMsg_Info);
			icon = <FontAwesomeIcon icon={faInfoCircle} />;
			break;
		case STATUS_MESSAGE_TYPES.ERROR:
			statusClass.push(styles.statusMsg_Danger);
			icon = <FontAwesomeIcon icon={faExclamationCircle} />;
			break;
		default:
			break;
	}

	return (
		<div className={statusClass.join(' ')}>
			{icon}
			<p>{t(props.text)}</p>
		</div>
	);
};

StatusMessage.propTypes = {
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default StatusMessage;

export const STATUS_MESSAGE_TYPES = Object.freeze({
	LOADING: 'LOADING',
	INFO: 'INFO',
	ERROR: 'ERROR'
});
