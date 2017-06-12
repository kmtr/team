import React from 'react';
import PropTypes from 'prop-types';

export default class InputText extends React.PureComponent {

  static defaultProps = {
    id: '',
    placeholder: '',
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
  }

  render() {
    return (
      <input
        className="input"
        type="text"
        name={this.props.name}
        id={this.props.id || this.props.name}
        placeholder={this.props.placeholder}
      />);
  }
}
