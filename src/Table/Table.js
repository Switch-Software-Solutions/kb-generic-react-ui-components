import React from 'react';
import styles from './Table.module.scss';
import PropTypes from 'prop-types';

const Table = (props) => {
	// Set class
	const tableClass = [styles.table];
	if(props.minWidth) tableClass.push(styles.table_minWidth);
	if(props.mobileCards) tableClass.push(styles.table_mobileCards);

	return (
		<table className={tableClass.join(' ')}>{props.children}</table>
	);
};

Table.propTypes = {
	children: PropTypes.node.isRequired,
	minWidth: PropTypes.bool,
	mobileCards: PropTypes.bool
};

export default Table;
