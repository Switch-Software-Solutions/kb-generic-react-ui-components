import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import FileUploader from '../FileUploader/FileUploader';
import ImageCropModal from './ImageCropModal/ImageCropModal';
import Toast, { TOAST_COLOR } from '../Toast/Toast';
import TutorialContext from 'contexts/Tutorial/TutorialContext';

const ImageCropper = (props) => {
	const { t } = useTranslation();
	const tutorialContext = useContext(TutorialContext);

	const [state, setState] = useState({
		uploadedImage: null
	});

	const [toastState, setToastState] = useState({
		message: null,
		show: false
	});

	const closeCropModal = () => {
		if (props.closeCropper) { props.closeCropper(); }
		setState({ ...state, uploadedImage: null });
	};

	const handleUpload = ({ valid }) => {
		if (tutorialContext.isShowingTutorial) tutorialContext.getImageCropperState(!!state.uploadedImage)
		setState({ ...state, uploadedImage: valid });
	};
 
	const cropComplete = (img) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (reader.error) {
				setToastState({ show: true, message: 'IMAGE_CROP.ERRORS.READ_ERROR' });
				return;
			}
			setState({ ...state, uploadedImage: null });
			props.complete({ file: img, base64: reader.result });
		};
		reader.readAsDataURL(img);
	};


	const invalidFile = (err) => {
		setToastState({ show: true, message: 'IMAGE_CROP.ERRORS.' + err });
	};

	return (
		<>
			<FileUploader
				multiple={false}
				uploadHandler={handleUpload}
				accept="image/*"
				text={props.uploaderText ? props.uploaderText : null}
				icon={props.uploaderIcon}
				onInvalidFile={invalidFile}
				labelStyle={props.uploaderStyle}
				className={props.className ? props.className : ''}
			/>
			{
				state.uploadedImage ?
					<ImageCropModal
						src={state.uploadedImage}
						keepSelection
						closeModal={closeCropModal}
						onCropComplete={cropComplete}
						aspectRatio={props.aspectRatio || 1}
					/>
					: null
			}
			{
				toastState.show ?
					<Toast click={() => setToastState({ message: null, show: false })}
						icon={faExclamation} color={TOAST_COLOR.DANGER}
					>
						{t(toastState.message)}
					</Toast>
					: null
			}
		</>
	);
};

ImageCropper.propTypes = {
	aspectRatio: PropTypes.number,
	uploaderIcon: PropTypes.any,
	uploaderText: PropTypes.string,
	uploaderStyle: PropTypes.string,
	complete: PropTypes.func.isRequired,
	closeCropper: PropTypes.func,
	className: PropTypes.string
};

export default ImageCropper;
