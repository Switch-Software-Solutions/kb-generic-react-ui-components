Object.defineProperty(exports, '__esModule', {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _trimText3 = require('../utils/trimText');

var _trimText4 = _interopRequireDefault(_trimText3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReadMoreReact = function (_React$Component) {
	_inherits(ReadMoreReact, _React$Component);

	function ReadMoreReact(props) {
		_classCallCheck(this, ReadMoreReact);

		var _this = _possibleConstructorReturn(this, (ReadMoreReact.__proto__ || Object.getPrototypeOf(ReadMoreReact)).call(this, props));

		var args = [_this.props.text, _this.props.min, _this.props.ideal, _this.props.max];

		var _trimText = _trimText4.default.apply(undefined, args),
		    _trimText2 = _slicedToArray(_trimText, 2),
		    primaryText = _trimText2[0],
		    secondaryText = _trimText2[1];

		_this.state = { displaySecondary: false, primaryText: primaryText, secondaryText: secondaryText, readMoreText: _this.props.readMoreText, link: _this.props.link };
		return _this;
	}

	_createClass(ReadMoreReact, [{
		key: 'setStatus',
		value: function setStatus() {
			var display = !this.state.displaySecondary;
			this.setState({ displaySecondary: display });
		}
	}, {
		key: 'render',
		value: function render() {
			var displayText = void 0;
			if (!this.state.secondaryText) {
				displayText = _react2.default.createElement(
					'div',
					{ className: 'display-text-group' },
					_react2.default.createElement(
						'span',
						{ className: 'displayed-text' },
						this.state.primaryText + ' ' + this.state.secondaryText
					)
				);
			} else if (this.state.displaySecondary) {
				displayText = _react2.default.createElement(
					'div',
					{ className: 'display-text-group' },
					_react2.default.createElement(
						'span',
						{ className: 'displayed-text',
							onClick: this.setStatus.bind(this) },
						this.state.primaryText + ' ' + this.state.secondaryText
					)
				);
			} 
			else if (this.state.link) {
				displayText = _react2.default.createElement(
					'div',
					{ className: 'display-text-group' },
					_react2.default.createElement(
						'span',
						{ className: 'displayed-text' },
						this.state.primaryText + (this.state.primaryText.length >= this.props.max ? '... ' : ''),


						
						_react2.default.createElement(
							'button',
							{ className: 'unstyledButton inlineLink',
								onClick: this.state.link },
							this.state.readMoreText
						)

					)
				);
			}
			else {
				displayText = _react2.default.createElement(
					'div',
					{ className: 'display-text-group' },
					_react2.default.createElement(
						'span',
						{ className: 'displayed-text' },
						this.state.primaryText,
						_react2.default.createElement(
							'span',
							{ style: { display: 'none' } },
							this.state.secondaryText
						),
						_react2.default.createElement(
							'div',
							{ className: 'read-more-button',
								onClick: this.setStatus.bind(this) },
							_react2.default.createElement(
								'button',
								{ className: 'unstyledButton',
									onClick: this.setStatus.bind(this) },
								this.state.readMoreText
							)
						)

					)
				);
			}

			return displayText;
		}
	}]);

	return ReadMoreReact;
}(_react2.default.Component);

exports.default = ReadMoreReact;


ReadMoreReact.propTypes = {
	text: _propTypes2.default.string.isRequired,
	min: _propTypes2.default.number,
	ideal: _propTypes2.default.number,
	max: _propTypes2.default.number,
	readMoreText: _propTypes2.default.string,
	link: _propTypes2.default.func
};

ReadMoreReact.defaultProps = {
	readMoreText: 'read more'
};