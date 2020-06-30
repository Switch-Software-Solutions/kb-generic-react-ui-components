import React from 'react';
import styles from './Dropdown.module.scss';
import PropTypes from 'prop-types';

const Dropdown = (props) => {

	// Set class
	const dropdownClass = [styles.dropdown];
	switch (props.border) {
		case DROPDOWN_BORDER.FULL:
			dropdownClass.push(styles.dropdown_borderFull);
			break;
		case DROPDOWN_BORDER.BOTTOM:
			dropdownClass.push(styles.dropdown_borderBottom);
			break;
		case DROPDOWN_BORDER.NONE:
			dropdownClass.push(styles.dropdown_borderNone);
			break;
		default:
			break;
	}
	switch (props.format) {
		case DROPDOWN_FORMAT.DEFAULT:
			dropdownClass.push(styles.dropdown_formatDefault);
			break;
		case DROPDOWN_FORMAT.HEADER:
			dropdownClass.push(styles.dropdown_formatHeader);
			break;
		default:
			break;
	}

	// Set styles
	let customStyles = null;
	
	if(props.top) customStyles = { ...customStyles, top: props.top };
	if(props.left) customStyles = { ...customStyles, left: props.left };
	if(props.bottom) customStyles = { ...customStyles, bottom: props.bottom };
	if(props.right) customStyles = { ...customStyles, right: props.right };

	// Draw component
	return (
		<div id={props.menuID} className={dropdownClass.join(' ')} style={customStyles} role='menu'>
			{props.children}
		</div>
	);
};

Dropdown.propTypes = {
	children: PropTypes.node,
	menuID: PropTypes.string.isRequired,
	format: PropTypes.string,
	border: PropTypes.string,
	top: PropTypes.string,
	left: PropTypes.string,
	bottom: PropTypes.string,
	right: PropTypes.string
};

export default Dropdown;

export const DROPDOWN_FORMAT = Object.freeze({
	DEFAULT: 'DEFAULT',
	HEADER: 'HEADER'
});

export const DROPDOWN_BORDER = Object.freeze({
	FULL: 'FULL',
	BOTTOM: 'BOTTOM',
	NONE: 'NONE'
});
