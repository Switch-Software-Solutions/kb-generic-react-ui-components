import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import { useTranslation } from 'react-i18next';
import styles from './ImageCropModal.module.scss';
import './ImageCropModal.scss';
import 'react-image-crop/lib/ReactCrop.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

import Overlay, { OVERLAY_TYPES } from '../../Overlay/Overlay';
import Button, { BUTTON_COLOR, BUTTON_STYLE } from '../../Button/Button';
import Modal from '../../Modal/Modal';
import FlexContainer, { FLEX_ALIGN, FLEX_DIR, FLEX_JUSTIFY } from '../../FlexContainer/FlexContainer';

const ImageCropModal = (props) => {

	const { t } = useTranslation();
	let crop = {
		aspect: props.aspectRatio || 1 / 1,
		unit: '%', // default, can be 'px' or '%'
		width: null,
		height: null,
		x: null,
		y: null
	};
	const [state, setState] = useState(
		{
			image: null,
			imageRef: null,
			error: null,
			crop
		}
	);

	const readImage = (image) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setState({ ...state, image: reader.result });
		};
		reader.readAsDataURL(image);
	};

	const cropChange = (newCrop) => setState({ ...state, crop: { ...state.crop, ...newCrop } });

	const cropComplete = async () => {
		// crops image, calls callback
		try {
			const image = await getCroppedImg(state.imageRef, state.crop);
			props.onCropComplete(image);
		} catch (error) {
			// show error message
			setState({ ...state, error: 'IMAGE_CROP_MODAL.ERRORS.' + error.message });
		}
	};

	const rotateImg = (base64Image, isClockwise) => {
		// create an off-screen canvas
		let offScreenCanvas = document.createElement('canvas');
		let offScreenCanvasCtx = offScreenCanvas.getContext('2d');

		// create Image
		var img = new Image();
		img.src = base64Image;

		// set its dimension to rotated size
		offScreenCanvas.height = img.width;
		offScreenCanvas.width = img.height;

		// rotate and draw source image into the off-screen canvas:
		if (isClockwise) {
			offScreenCanvasCtx.rotate(90 * Math.PI / 180);
			offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
		} else {
			offScreenCanvasCtx.rotate(-90 * Math.PI / 180);
			offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
		}
		offScreenCanvasCtx.drawImage(img, 0, 0);

		// encode image to data-uri with base64
		setState({ ...state, image: offScreenCanvas.toDataURL('image/jpeg', 1) });
	};

	const getCroppedImg = (image, crop) => {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width * scaleX;
		canvas.height = crop.height * scaleY;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width * scaleX,
			crop.height * scaleY
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob(blob => {
				if (!blob) {
					reject(new Error('EINVALIDCROP'));
					return;
				}
				blob.name = 'upload';
				resolve(blob);
			}, 'image/jpeg');
		});
	};

	const imageLoaded = (img) => {
		if (props.aspectRatio === 1) {
			let percentageCropWidth = img.width > img.height ? (img.height / img.width) * 100 : 100;
			let percentageCropHeight = img.height > img.width ? (img.width / img.height) * 100 : 100;
			crop.width = parseInt((img.width / 100) * percentageCropWidth);
			crop.height = parseInt((img.height / 100) * percentageCropHeight);
			crop.x = parseInt(crop.width === img.width ? 0 : (img.width - crop.width) / 2);
			crop.y = parseInt(crop.height === img.height ? 0 : (img.height - crop.height) / 2);
			crop.unit = 'px';
			setState({ ...state, imageRef: img, crop });
		} else {
			crop.width = 100;
			const expectedMaxCropHeight = parseInt(img.width / props.aspectRatio);
			const imgMaxHeightPercentage = parseInt(crop.width * expectedMaxCropHeight / img.height);
			crop.y = (crop.width - imgMaxHeightPercentage) / 2;
			setState({ ...state, imageRef: img, crop });
		}
		return false;
	};

	if (!state.image) readImage(props.src);

	return (
		<>
			<Modal padding mobileFull show closeModal={props.closeModal}>
				<div>
					<h2 className={styles.modalTitle + ' modalTitle'}>{t('IMAGE_CROP_MODAL.TITLE')}</h2>
					<p className={styles.modalSubtitle}>{t('IMAGE_CROP_MODAL.DESC')}</p>
					{state.image ?
						<div>
							<div className={styles.cropperWrapper}>
								<ReactCrop
									src={state.image}
									crop={state.crop}
									onChange={cropChange}
									keepSelection={props.keepSelection}
									onImageLoaded={imageLoaded}
								/>
							</div>
							<div className={styles.rotateCont}>
								<div>
									<button
										title={`${t('IMAGE_CROP_MODAL.ROTATE')} 90° ${t('IMAGE_CROP_MODAL.COUNTERCLOCKWISE')} `}
										aria-label={`${t('IMAGE_CROP_MODAL.ROTATE')} 90° ${t('IMAGE_CROP_MODAL.COUNTERCLOCKWISE')}`}
										className={`${styles.rotateCont__btn} unstyledButton`}
										onClick={() => rotateImg(state.image, false)}>
										<FontAwesomeIcon icon={faUndoAlt} />
									</button>
								</div>
								<h4>{t('IMAGE_CROP_MODAL.ROTATE')}</h4>
								<div>
									<button 
										title={`${t('IMAGE_CROP_MODAL.ROTATE')} 90° ${t('IMAGE_CROP_MODAL.CLOCKWISE')}`} 
										aria-label={`${t('IMAGE_CROP_MODAL.ROTATE')} 90° ${t('IMAGE_CROP_MODAL.CLOCKWISE')} `} 
										className={`${styles.rotateCont__btn} unstyledButton `} 
										onClick={() => rotateImg(state.image, true)}>
										 <FontAwesomeIcon icon={faRedoAlt} />
										  </button>
								</div>
							</div>

							<div className="marginTop_2">
								<FlexContainer direction={FLEX_DIR.ROW} justify={FLEX_JUSTIFY.BETWEEN} align={FLEX_ALIGN.CENTER}>
									<span className={styles.cropperError}>
										{
											state.error ?
												t(state.error)
												: null
										}
									</span>
									<Button
										click={cropComplete}
										text='IMAGE_CROP_MODAL.COMPLETE'
										buttonStyle={BUTTON_STYLE.FILL}
										color={BUTTON_COLOR.MAIN}
									/>
								</FlexContainer>
							</div>
						</div>
						: <Overlay type={OVERLAY_TYPES.LOADING} />}


				</div>
			</Modal>
		</>
	);
};

ImageCropModal.propTypes = {
	src: PropTypes.instanceOf(File).isRequired,
	onCropComplete: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	keepSelection: PropTypes.bool,
	aspectRatio: PropTypes.number
};

export default ImageCropModal;