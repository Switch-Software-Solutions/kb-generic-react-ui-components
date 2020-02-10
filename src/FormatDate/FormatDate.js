import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const FormatDate = (props) => {
	const { t } = useTranslation();

	const lang = localStorage.getItem('lang');

	if (props.fromNow && moment(props.date).diff(moment(), 'hours') < 24) {
		return moment(props.date).utc().locale(lang).fromNow();
	}

	if (props.longFormat && props.todayTime) return moment(props.date).format(t('UI.TIME_LONG_DATE'));
	return moment(props.date).utc().locale(lang).format(props.longFormat ? t('UI.LONG_DATE_FORMAT') : t('UI.DATE_FORMAT'));

};

FormatDate.propTypes = {
	todayTime: PropTypes.bool,
	date: PropTypes.any.isRequired,
	fromNow: PropTypes.bool,
	longFormat: PropTypes.bool
};

export default FormatDate;
