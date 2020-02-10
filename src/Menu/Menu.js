import React from 'react';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';

const Menu = (props) => {
	// Set class
	let menuClass = [styles.menuNav];
	if (props.menuStyle === 'headerCenter') menuClass.push(styles.menuNav_headerCenter);
	else if (props.menuStyle === 'footer') menuClass.push(styles.menuNav_footer);

	return (
		<nav className={menuClass.join(' ')}>
			<ul className={styles.menuNavList}>{props.children}</ul>
		</nav>
	);
};

Menu.propTypes = {
	menuStyle: PropTypes.string.isRequired,
	children: PropTypes.node
};

export default Menu;
