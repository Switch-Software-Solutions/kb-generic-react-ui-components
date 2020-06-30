import React from 'react';
import styles from './Card.module.scss';
import PropTypes from 'prop-types';

const Card = (props) => {
	// Set class
	let cardClass = [styles.card];

	switch (props.padding) {
		case CARD_PADDING.BIG:
			cardClass.push(styles.card_padding);
			break;
		case CARD_PADDING.MEDIUM:
			cardClass.push(styles.card_paddingMedium);
			break;
		case CARD_PADDING.SMALL:
			cardClass.push(styles.card_paddingSmall);
			break;
		default:
			break;
	}
	switch (props.width) {
		case CARD_WIDTH.AUTO:
			cardClass.push(styles.card_widthAuto);
			break;
		default:
			break;
	}

	if (props.overflowVisible) cardClass.push(styles.overflowVisible);

	if (props.outline) cardClass.push(styles.card_outline);

	if (props.noShadow) cardClass.push(styles.card_noShadow);

	if (props.className) cardClass.push(props.className);

	return <div className={cardClass.join(' ')}>{props.children}</div>;
};

Card.propTypes = {
	padding: PropTypes.string,
	outline: PropTypes.bool,
	noShadow: PropTypes.bool,
	overflowVisible: PropTypes.bool,
	children: PropTypes.node.isRequired,
	width: PropTypes.string
};

export default Card;

export const CARD_PADDING = Object.freeze({
	BIG: 'BIG',
	MEDIUM: 'MEDIUM',
	SMALL: 'SMALL',
	NONE: 'NONE'
});

export const CARD_WIDTH = Object.freeze({
	AUTO: 'AUTO'
});
