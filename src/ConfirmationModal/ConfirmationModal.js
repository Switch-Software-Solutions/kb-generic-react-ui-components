import React from 'react';
import PropTypes from 'prop-types';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './ConfirmationModal.module.scss';
import { useTranslation } from 'react-i18next';

import Button, { BUTTON_COLOR, BUTTON_ICON_POS, BUTTON_STYLE } from "../Button/Button";
import Modal from '../Modal/Modal';
import FlexContainer, { FLEX_ALIGN, FLEX_DIR, FLEX_JUSTIFY } from '../FlexContainer/FlexContainer';

const ConfirmationModal = (props) => {
	const { t } = useTranslation();
	return (
		<Modal show padding closeModal={props.close}>
			<h2 className='marginBottom_1'>
				{t(props.title)}
			</h2>
			<p className='marginBottom_2'>
				{props.contentVariables ? t(props.content, props.contentVariables) : props.contentTrans ? props.content : t(props.content)}
			</p>
			<div className={styles.confirmationModalButtons}>
				<FlexContainer align={FLEX_ALIGN.CENTER} direction={FLEX_DIR.ROW} directionS={FLEX_DIR.COL_REVERSE} justify={FLEX_JUSTIFY.BETWEEN}>
					<Button
						text={props.cancelText ? t(props.cancelText) : t('UI.CANCEL')}
						icon={props.removeCancelIcon ? null : faTimes}
						iconPos={BUTTON_ICON_POS.LEFT}
						color={props.highlightAccept ? BUTTON_COLOR.GREY : BUTTON_COLOR.MAIN}
						buttonStyle={BUTTON_STYLE.FILL}
						click={props.cancelCallback || props.close}
					/>
					<Button
						text={props.confirmText ? t(props.confirmText) : t('UI.CONFIRM')}
						icon={props.removeCancelIcon ? faTimes : faCheck}
						iconPos={BUTTON_ICON_POS.LEFT}
						disabled={props.lockButtons}
						color={BUTTON_COLOR.DANGER}
						buttonStyle={BUTTON_STYLE.FILL}
						click={props.confirmCallback}
					/>
				</FlexContainer>
			</div>
		</Modal>
	);
};

ConfirmationModal.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	contentTrans: PropTypes.bool,
	contentVariables: PropTypes.object,
	confirmText: PropTypes.string,
	confirmCallback: PropTypes.func.isRequired,
	cancelText: PropTypes.string,
	cancelCallback: PropTypes.func,
	close: PropTypes.func.isRequired,
	lockButtons: PropTypes.bool,
	highlightAccept: PropTypes.bool,
	removeCancelIcon: PropTypes.bool
};
export default ConfirmationModal;
