import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';

const Wrapper = styled.div`
  
`;

const Title = styled.h2`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

const Button = styled.a`
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

class ContentLogin extends Component {

  handleLogin = async () => {
    const {admin} = this.props;
    const login = this.refs.username.value;
    const password = this.refs.password.value;
    if (login === admin.login && password === admin.password) {
      await this.props.loginAdmin();
      this.props.handelModalClose(this.props.nameModal);
    }

  };
  render() {
    return (
      <Wrapper className="modal-content">
        <section className="section has-background-light">
          <Title className='is-size-3'>{this.props.title}</Title>
          <Wrapper className="field">
            <label className="label has-text-grey-darker">Login</label>
            <div className="control">
              <input
                className="input is-primary"
                ref='username'
                defaultValue={this.props.admin.login}
              />
            </div>
          </Wrapper>
          <Wrapper className="field">
            <label className="label has-text-grey-darker">Password</label>
            <div className="control">
              <input
                className="input is-primary"
                ref='password'
                defaultValue={this.props.admin.password}
              />
            </div>
          </Wrapper>
          <ButtonWrapper>
            <Button className="button" onClick={() => this.props.handelModalClose(this.props.nameModal)}>Cancel</Button>
            <Button type='submit' className="button is-primary" onClick={this.handleLogin}>Login</Button>
          </ButtonWrapper>
        </section>
      </Wrapper>
    );
  }
}

ContentLogin.propTypes = {
  handelModalClose: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  loginAdmin: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  nameModal: PropTypes.string.isRequired,
};

export default ContentLogin;