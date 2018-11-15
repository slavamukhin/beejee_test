import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const Label = styled.label`
  margin-right: 10px;
`;

class Select extends Component {
  render() {
    const options = this.props.options.map((option, index) => <option key={index}>{option}</option>);
    return (
      <Wrapper>
        <Label>{this.props.label}</Label>
        <div className="select">
          <select onChange={(e) => this.props.onClick(e.target.value)}>
            {options}
          </select>
        </div>
      </Wrapper>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default Select;