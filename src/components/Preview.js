import React, {Component} from 'react';
import styled             from 'styled-components';

import PropTypes from 'prop-types';

const Wrapper = styled.div`
  
`;

const Card = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 320px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.span`
  font-size: 40px;
  color: #d4d4d4;
`;

class Preview extends Component {
  render() {
    const {userName,email,file,text, previewUrl} = this.props.task;
    return (
      <Wrapper>
        <Card className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={file ? previewUrl : "https://bulma.io/images/placeholders/1280x960.png" } alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <IconWrapper className="image is-48x48">
                  <Icon className="icon">
                    <i className="far fa-square" />
                  </Icon>
                </IconWrapper>
              </div>
              <div className="media-content">
                <p className="title is-4">{userName}</p>
                <p className="subtitle is-6">{email}</p>
              </div>
            </div>
            <div className="content">
              {text}
            </div>
          </div>
        </Card>
        <a type='submit' className="button is-primary" onClick={this.props.onClick}>Back</a>
      </Wrapper>
    );
  }
}

Preview.propTypes = {
  task: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Preview;