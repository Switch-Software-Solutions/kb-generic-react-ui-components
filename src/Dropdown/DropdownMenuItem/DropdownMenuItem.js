import React from 'react';
import styles from './DropdownMenuItem.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropdownMenuItem = (props) => {
	
	const handleClick = () => { if (props.click) props.click(); };

	// Set class
	const itemClass = [styles.dropdownMenuItem];
	if(props.color === 'main') itemClass.push(styles.dropdownMenuItem_colorMain);	

	return (
		<li className={itemClass.join(' ')}>
			{
				!props.click ?
					<div className={styles.dropdownMenuItemLink}>
						<FontAwesomeIcon icon={props.icon} className={styles.dropdownMenuItemLink__icon} fixedWidth />
						{props.label}
					</div>
					:
					<button type='button' className={styles.dropdownMenuItemLink} onClick={handleClick}>
						<FontAwesomeIcon icon={props.icon} className={styles.dropdownMenuItemLink__icon} fixedWidth />
						{props.label}
					</button>
			}

		</li>
	);
};

DropdownMenuItem.propTypes = {
	label: PropTypes.string.isRequired,
	click: PropTypes.func,
	icon: PropTypes.any.isRequired,
	color: PropTypes.string
};

export default DropdownMenuItem;
