import React from 'react';
import styles from './DropdownMenu.module.scss';
import PropTypes from 'prop-types';

const DropdownMenu = (props) => {
	return (
		<ul className={styles.dropdownMenu}>
			{props.children}
		</ul>
	);
}

DropdownMenu.propTypes = {
	children: PropTypes.node
};

export default DropdownMenu;
