import React from 'react';
import PropTypes from 'prop-types';
import styles from './FlexColumn.module.scss';

const FlexColumn  = (props)  => {

	const MAX_COL_SIZE = 12;
	const MIN_COL_SIZE = 1;
	const COL_PREFIX = 'col-';
		
	const divProps = { className: props.classname ? props.classname : '' };
	let customStyles = null;

	const addFlexStyles = (attr) => {
		return {
			flexBasis: attr,
			maxWidth: attr
		};
	};

	if(Number.isInteger(props.size) && (props.size >= MIN_COL_SIZE && props.size <= MAX_COL_SIZE )) {
		// if responsive implemented, add new classes for breakpoints
		divProps.className += ` ${styles[COL_PREFIX+props.size]}`;
	} else if(props.size) {
		customStyles = addFlexStyles(props.size);
	} else {
		customStyles = addFlexStyles('100%');
	}
	
	return (
		<div style={customStyles} {...divProps}>
			{props.children}
		</div>
	);
};

FlexColumn.propTypes = {
	size: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	children: PropTypes.node.isRequired,
	classname: PropTypes.string
};

export default FlexColumn;