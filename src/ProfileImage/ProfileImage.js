import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileImage.module.scss';

import { systemImages, getImage } from '@timeswan/core';


const ProfileImage = (props) => {
	// If props.profile its provided. Load the image from the profile, if not, load it from the current user

	const profile = props.profile;
	
	let currentProfilePic = profile ? profile.profilePic : undefined;

	return (
		<img
			alt=''
			className={
				props.styles
					? props.styles
					: styles.defaultProfileImageStyle
			}
			src={
				currentProfilePic
					? currentProfilePic.path
					: getImage(systemImages.profilePicPlaceholderImg)
			}
		/>
	);
};

ProfileImage.propTypes = {
	styles: PropTypes.any,
	profile: PropTypes.any
};

export default ProfileImage;