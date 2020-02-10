import React from 'react';
import styles from './Overlay.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import  { systemImages, getImage } from '@timeswan/core';

import Logo from '../Logo/Logo';
import FlexContainer, { FLEX_DIR, FLEX_ALIGN, FLEX_JUSTIFY } from '../FlexContainer/FlexContainer';

const Overlay = (props) => {

	let icon, title, text;
	if (props.title) title = <h1 className={styles.overlay__title}>{props.title}</h1>;
	if (props.text) text = <p className={styles.overlay__text}>{props.text}</p>;
	icon = <FontAwesomeIcon icon={faCircleNotch} spin className={styles.overlay__icon} />;

	return (
		<div className={props.type === OVERLAY_TYPES.LOADING ? styles.loading : styles.overlay}>
			<FlexContainer direction={FLEX_DIR.COL} align={FLEX_ALIGN.CENTER} justify={FLEX_JUSTIFY.CENTER}>
				{props.type !== OVERLAY_TYPES.LOADING ? <Logo importedLogo={getImage(systemImages.logoIconImg)} height='80px' /> : null}
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
	text: PropTypes.string
};

export const OVERLAY_TYPES = {
	LOADING: 'loading',
	FULL_SCREEN: 'fullScrenn'
};

export default Overlay;
