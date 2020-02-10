import React from 'react';
import styles from './Dropdown.module.scss';
import PropTypes from 'prop-types';

const Dropdown = (props) => {
	return (
		<div className={styles.dropdown}>
			{props.children}
		</div>
	);
};

Dropdown.propTypes = {
	children: PropTypes.node
};

export default Dropdown;