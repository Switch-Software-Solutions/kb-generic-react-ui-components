import React from 'react';
import styles from './Logo.module.scss';
import PropTypes from 'prop-types';


const Logo = ({header, height, importedLogo }) => {

	let logoClass = [styles.logo];
	if (header) logoClass.push(styles.logo_header);

	return (
		<div className={logoClass.join(' ')} style={{ height: height }}>
			<img src={importedLogo} alt='' />
		</div>
	);
};

Logo.propTypes = {
	height: PropTypes.string,
	header: PropTypes.bool,
	importedLogo: PropTypes.string
};

export default Logo;
