import React from 'react';
import styles from './Logo.module.scss';
import PropTypes from 'prop-types';

import { systemImages, getImage } from '@timeswan/core';

const Logo = (props) => {
	let logoLocation = getImage(systemImages.logoStdImg);
	if (props.importedLogo) logoLocation = props.importedLogo;

	let logoClass = [styles.logo];
	if (props.header) logoClass.push(styles.logo_header);

	return (
		<div className={logoClass.join(' ')} style={{ height: props.height }}>
			<img src={logoLocation} alt='Timeswan' />
		</div>
	);
};

Logo.propTypes = {
	height: PropTypes.string,
	header: PropTypes.bool,
	importedLogo: PropTypes.string
};

export default Logo;
