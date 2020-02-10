import React from 'react';
import PropTypes from 'prop-types';
import styles from './BgProfile.module.scss';

const BgProfile = (props) => {
	const bgStyle = {
		backgroundImage: 'url(' + props.bgImage + ')'
	};

	return (
		<section>
			<div style={bgStyle} className={[styles.profileBackground, props.className].join(' ')}>
				{props.children}
			</div>
		</section>
	);
};
BgProfile.propTypes = {
	bgImage: PropTypes.string.isRequired
};

export default BgProfile;