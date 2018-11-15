import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';

const Wrapper = styled.nav`
  display: flex;
`;

class Pagination extends Component {

  createButtons = () => {
    const countButton = Math.ceil((+this.props.taskCount) / 3);
    const buttons = [];
    for (let i = 1; i <= countButton; i++) {
      buttons.push(
        <li key={i}>
          <a
            className={`${this.props.page === i ? 'pagination-link is-current' : 'pagination-link'}`}
            onClick={() => this.handleClick(i)}
          >{i}</a>
        </li>
      )
    }
    return buttons;
  };

  handleClick = (button) => {
    if (this.props.page !== button) {
      this.props.nextPage(button)
    }
  };

  render() {
    return (
      <Wrapper className="pagination" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
          {this.createButtons()}
        </ul>
      </Wrapper>
    );
  }
}

Pagination.propTypes = {
  taskCount: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default Pagination;