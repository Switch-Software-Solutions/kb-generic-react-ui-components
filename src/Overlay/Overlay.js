import React from 'react';
import styles from './Overlay.module.scss';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import Logo from '../Logo/Logo';
import Modal from '../Modal/Modal';

import FlexContainer, { FLEX_DIR, FLEX_ALIGN, FLEX_JUSTIFY } from '../FlexContainer/FlexContainer';

const Overlay = ({ title, text, type, modalText, logo }) => {

	let icon;
	if (title) title = <h1 className={styles.overlay__title}>{title}</h1>;
	if (text) text = <p className={styles.overlay__text}>{text}</p>;
	icon = <FontAwesomeIcon icon={faCircleNotch} spin className={styles.overlay__icon} />;

	if (type === OVERLAY_TYPES.ONMODAL) return <>
		{
			ReactDOM.createPortal(
				<Modal nonCloseable show>
					<div className='textCenter'>
						{icon}
						<h2 className='marginTop_1'>{modalText}</h2>
					</div>
				</Modal>, document.body)
		}
	</>;

	return (
		<div className={type === OVERLAY_TYPES.LOADING ? styles.loading : styles.overlay}>
			<FlexContainer direction={FLEX_DIR.COL} align={FLEX_ALIGN.CENTER} justify={FLEX_JUSTIFY.CENTER}>
				{type !== OVERLAY_TYPES.LOADING && logo ? <Logo importedLogo={logo} height='80px' /> : null}
				{title}
				{text}
				{icon}
			</FlexContainer>
		</div>
	);
};

Overlay.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	text: PropTypes.string,
	modalText: PropTypes.string,
	logo: PropTypes.node
};

export const OVERLAY_TYPES = {
	LOADING: 'loading',
	FULL_SCREEN: 'fullScreen',
	ONMODAL: 'onModal'
};

export default Overlay;
