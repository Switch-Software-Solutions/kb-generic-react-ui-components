import React from 'react';
import PropTypes from 'prop-types';
import styles from './BgProfile.module.scss';

const BgProfile = (props) => {
	// Image
	const bgStyle = {
		backgroundImage: 'url(' + props.imageUrl + ')'
	};

	// Set class //
	const backgroundCont = [styles.profileBackground];
	if(props.showImgElement) backgroundCont.push(styles.profileBackground_freeHeight);
	if(props.className) backgroundCont.push(props.className);

	return (
		<div style={props.showImgElement ? null : bgStyle} className={backgroundCont.join(' ')}>
			<img src={props.imageUrl} alt={props.imageAlt} className={props.showImgElement ? '' : 'srOnly'}></img>
		</div>
	);
};

BgProfile.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	imageAlt: PropTypes.string,
	showImgElement: PropTypes.bool,
	className: PropTypes.string
};

export default BgProfile;