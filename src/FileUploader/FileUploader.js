import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import styles from './FileUploader.module.scss';

const FileUploader = (props) => {
	const fileInputReference = React.createRef();
	const { t } = useTranslation();

	const multiple = props.multiple || false;
	const uploadHandler = props.uploadHandler;
	const uploadError = props.onInvalidFile;
	const maxSize = props.maxsize;

	const execTypeChecking = (file) => {
		//if wasn't specified which type of file has to be accepted, defaults to */*
		if (!props.accept) return true;

		const acceptedType = props.accept.split('/');
		// if passed */anything, everything is accepted
		if (acceptedType[0] === '*') return true;
		const fileType = file.type.split('/');
		if (fileType[0] !== acceptedType[0]) return false;
		if (acceptedType[1] === '*') return true;
		if (fileType[1] === acceptedType[1]) return true;
	};

	const checkTypes = (file) => {

		// FileList is not an array, can't check with Array.isArray(), yet it's iteratable
		if (!(file instanceof FileList)) return execTypeChecking(file);

		// if array has only one element, reduce won't execute the function, therefore returning somenthing unexepected
		if (file.length === 1) {
			return execTypeChecking(file[0]) ? { valid: Array.from(file), invalid: [] } : { invalid: Array.from(file), valid: [] };
		}

		const reducerFunction = (flist, f) => {
			if (execTypeChecking(f)) flist.valid.push(f);
			else flist.invalid.push(f);
			return flist;
		};

		const { valid, invalid } = Array.from(file).reduce(
			reducerFunction,
			{ valid: [], invalid: [] }
		);

		return { valid, invalid };
	};

	const checkSize = (file) => {
		if (!maxSize) return true;
		if (!(file instanceof FileList) && !Array.isArray(file)) return file.size <= maxSize;

		// if array has only one element, reduce won't execute the function, therefore returning somenthing unexepected
		if (file.length === 1) {
			return file[0].size <= maxSize ? { valid: Array.from(file), invalid: [] } : { invalid: Array.from(file), valid: [] };
		}

		const reducerFunction = (flist, f) => {
			if (f.size <= maxSize) flist.valid.push(f);
			else flist.invalid.push(f);
			return flist;
		};

		const { valid, invalid } = Array.from(file).reduce(
			reducerFunction,
			{ valid: [], invalid: [] }
		);

		return { valid, invalid };
	};

	const handleChange = () => {
		const file = multiple ?
			fileInputReference.current.files
			: fileInputReference.current.files[0];		
		return handleUpload(file);
	};

	const handleUpload = (file) => {

		if (!multiple) {
			const typeCheck = checkTypes(file);
			const sizeCheck = checkSize(file);
			if (!typeCheck) return uploadError('EINVALIDFORMAT');
			if (!sizeCheck) return uploadError('EINVALIDSIZE');
			return uploadHandler({ valid: file });
		}

		const typeChecking = checkTypes(file);
		const sizeChecking = checkSize(typeChecking.valid);

		const checkedFilesList = {
			valid: sizeChecking.valid,
			invalid: [...typeChecking.invalid, ...sizeChecking.invalid]
		};

		if (checkedFilesList.valid.length === 0) return uploadError('EINVALIDFORMAT');

		return uploadHandler(checkedFilesList);
	};

	const handleDragAndDrop = (e) => {
		const file = multiple ?
			e.dataTransfer.files
			: e.dataTransfer.files[0];

		return handleUpload(file);
	};

	const renderUploader = () => {

		const mode = props.mode || FILE_UPLOADER_MODES.BUTTON;

		// Set label class
		let labelClass = [styles.uploaderLabel_button];
		if(props.labelStyle === FILE_UPLOADER_STYLES.FILL) labelClass.push(styles.uploaderLabel_button_styleFill);
		if(props.className) labelClass.push(props.className);
		if(!props.text) labelClass.push(styles.uploaderLabel_button_iconOnly);



		return (mode === FILE_UPLOADER_MODES.BUTTON) ?
			(
				<label htmlFor={'uploadFileInput' + idRandomer} className={labelClass.join(' ')}>
					<span className={styles.uploaderLabel__icon}>
						<FontAwesomeIcon icon={props.icon || faUpload} />
					</span>

					{props.text ?
						<span className={styles.buttonText}>{t(props.text)}</span>
						: null
					}
				</label>
			)
			:
			(
				<label htmlFor={'uploadFileInput' + idRandomer} onDrop={handleDragAndDrop} className={styles.uploaderLabel_dragndrop}>
					<span className={styles.uploaderLabel__icon}>
						<FontAwesomeIcon icon={props.icon || faUpload} />
					</span>
					<p className={styles.uploaderLabel_dragndrop__text}>
						{t(props.text)}
					</p> 
				</label>
			);

	};

	const idRandomer = Math.floor(Math.random() * 10);

	if (props.mode && props.mode === FILE_UPLOADER_MODES.DRAG_N_DROP) {
		// default has to be prevented to handle uploads with drag n drop
		// else the browser will open the file
		const preventFileOpen = (e) => {
			e.preventDefault();
		};
		window.addEventListener('dragover', preventFileOpen, false);
		window.addEventListener('drop', preventFileOpen, false);
	}

	return (
		<>
			<input
				key={'file-uploader-' + Math.random()*100}
				type="file"
				className={styles.uploader_input}
				id={'uploadFileInput' + idRandomer}
				multiple={multiple}
				ref={fileInputReference}
				onChange={handleChange}
				accept={props.accept || '*/*'}
			/>
			{
				renderUploader()
			}
		</>
	);
};

FileUploader.propTypes = {
	text: PropTypes.string,
	onInvalidFile: PropTypes.func.isRequired,
	uploadHandler: PropTypes.func.isRequired,
	multiple: PropTypes.bool,
	accept: PropTypes.string,
	mode: PropTypes.number,
	icon: PropTypes.any,
	maxsize: PropTypes.number,
	labelStyle: PropTypes.string,
	className: PropTypes.string
};

export const FILE_UPLOADER_MODES = {
	BUTTON: 1,
	DRAG_N_DROP: 2
};

export const FILE_UPLOADER_STYLES = {
	FILL: 'fill',
	OUTLINE: 'outline'
};

export default FileUploader;
