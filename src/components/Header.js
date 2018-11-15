import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';

import Select from './Select';

const Wrapper = styled.div`
  
`;

const Title = styled.h1`
  text-align: center;
`;

const SelectWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const WrapperButton = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled.a`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const Label = styled.span`
  margin-right: 30px;
`;

class Header extends Component {
  render() {
    return (
      <Wrapper className="App-header">
        <div className="columns">
          <div className="column">
            <SelectWrapper>
              <Select
                options={['id', 'username', 'email', 'status']}
                label={'sort field  '}
                onClick={this.props.sortField}
              />
              <Select
                options={['asc', 'desc']}
                label={'sort direction '}
                onClick={this.props.sortDirection}
              />
            </SelectWrapper>
          </div>
          <div className="column">
            <Title className='is-size-1 '>React Todo</Title>
          </div>
          <div className="column">
            <WrapperButton>
              {this.props.login ?
                <Label>Admin</Label> :
                <Button
                  className="button is-dark"
                  onClick={() => this.props.handelModalOpen('loginModal')}
                >Login</Button>
              }
              <Button
                className="button is-dark"
                onClick={() => this.props.handelModalOpen('createModal')}
              >Make task</Button>
            </WrapperButton>
          </div>
        </div>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  handelModalOpen: PropTypes.func.isRequired,
  sortField: PropTypes.func.isRequired,
  sortDirection: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired,
};

export default Header;