import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';

const Wrapper = styled.div`
  
`;

class Fild extends Component {

  handleChangeValue = (e) => {
    this.props.handleChange(this.props.field, e.target.value);
  };

  render() {
    return (
      <Wrapper className="field">
        <label className="label has-text-grey-darker">{this.props.label}</label>
        <div className="control">
          <input
            value={this.props.value}
            className="input is-primary"
            type={this.props.type}
            placeholder={this.props.placeholder}
            onChange={this.handleChangeValue}
            disabled={this.props.disabled}
          />
        </div>
      </Wrapper>
    );
  }
}

Fild.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Fild;