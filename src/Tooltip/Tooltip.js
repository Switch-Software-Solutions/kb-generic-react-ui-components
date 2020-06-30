import React from 'react';
import styles from './Tooltip.module.scss';
import PropTypes from 'prop-types';

import FlexContainer from '../FlexContainer/FlexContainer';
import Logo from '../Logo/Logo';
import Card from '../Card/Card';

const Tooltip = (props) => {
	// Set class
	let tooltipClass = [styles.tooltip];
	if (props.small) tooltipClass.push(styles.tooltip_small);

	if (props.direction) {
		switch (props.direction) {
			case TOOLTIP_DIR.CENTER:
				tooltipClass.push(styles.tooltip_center);
				break;
			case TOOLTIP_DIR.TOP:
				tooltipClass.push(styles.tooltip_top);
				break;
			case TOOLTIP_DIR.LEFT:
				tooltipClass.push(styles.tooltip_left);
				break;
			case TOOLTIP_DIR.BOTTOM:
				tooltipClass.push(styles.tooltip_bottom);
				break;
			case TOOLTIP_DIR.RIGHT:
				tooltipClass.push(styles.tooltip_right);
				break;
			default:
				tooltipClass.push(styles.tooltip_center);
				break;
		}
	}
	if (props.position) {
		switch (props.position) {
			case TOOLTIP_POS.RELATIVE:
				tooltipClass.push(styles.tooltip_relative);
				break;
			case TOOLTIP_POS.ABSOLUTE:
				tooltipClass.push(styles.tooltip_absolute);
				break;
			default:
				tooltipClass.push(styles.tooltip_relative);
				break;
		}
	}
	if (props.className) tooltipClass.push(props.className);

	return (
		<div className={tooltipClass.join(' ')}>
			{props.direction && <div className={styles.tooltip__directionArrow} />}
			<Card>
				<div className='marginTop_1 marginLeft_2 marginBottom_1 marginRight_2'>
					<FlexContainer>
						{(props.hasLogo && !props.small) && <Logo importedLogo={props.logo} height='50px' />}
						<div className={props.hasLogo && styles.tooltip__content}>
							{props.children}
						</div>
					</FlexContainer>
				</div>
			</Card>
		</div>
	);
};

Tooltip.propTypes = {
	small: PropTypes.bool,
	hasLogo: PropTypes.bool,
	direction: PropTypes.any,
	position: PropTypes.any,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	logo: PropTypes.node
};

export default Tooltip;

export const TOOLTIP_DIR = Object.freeze({
	CENTER: 'CENTER',
	TOP: 'TOP',
	LEFT: 'LEFT',
	BOTTOM: 'BOTTOM',
	RIGHT: 'RIGHT'
});
export const TOOLTIP_POS = Object.freeze({
	RELATIVE: 'RELATIVE',
	ABSOLUTE: 'ABSOLUTE'
});
