import React from 'react';
import styles from './ButtonGroup.module.scss';
import PropTypes from 'prop-types';

import Button, { BUTTON_ICON_POS, BUTTON_COLOR, BUTTON_STYLE, BUTTON_SIZE } from '../Button/Button';

const ButtonGroup = (props) => {

	// Set class
	let btnGroupClass = [styles.buttonGroup];
	if (props.scrollableMobile) btnGroupClass.push(styles.buttonGroup_mobileScroll);

	return (
		<div className={props.scrollableMobile && styles.scrollableBtnGroupCont}>
			<div className={btnGroupClass.join(' ')}>
				{ props.scrollableMobile && <span className={styles.mobileScrollPadding} /> }
				{
					props.options && Array.isArray(props.options) && props.options.map((option, index) => {
						return (
							<Button
								key={index}
								iconPos={BUTTON_ICON_POS.LEFT}
								icon={option.icon}
								color={BUTTON_COLOR.MAIN}
								buttonStyle={props.activeButton === index ? BUTTON_STYLE.FILL : BUTTON_STYLE.OUTLINE}
								text={option.title}
								size={BUTTON_SIZE.SMALL}
								click={() => props.callBack(index)}
							/>
						);
					}) 
				}
				{ props.scrollableMobile && <span className={styles.mobileScrollPadding}></span> }
			</div>
		</div>
	);
};

ButtonGroup.propTypes = {
	options: PropTypes.array.isRequired,
	activeButton: PropTypes.number.isRequired,
	callBack: PropTypes.func.isRequired,
	scrollableMobile: PropTypes.bool
};

export default ButtonGroup;
