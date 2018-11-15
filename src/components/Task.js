import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';
import md5                from 'md5';


const Wrapper = styled.div`
  opacity: ${props => props.status ? .5 : 1};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.input`
  width: 40px;
  height: 40px;
  cursor: ${props => props.login ? 'pointer' : 'default'};
`;

class Task extends Component {

  handleCheck = () => {
    if(this.props.login) {
      const id = this.props.task.id;
      const editTask = {
        status: this.props.task.status ? 0 : 10,
        token: 'beejee',
      };
      const signature = `status=${encodeURIComponent(editTask.status)}&token=${encodeURIComponent(editTask.token)}`;
      editTask.signature = md5(signature);
      this.props.checkTask(id, editTask);
    }
  };

  handleClick = () => {
    this.props.onClick('editModal', this.props.task);
  };

  render() {
    const {email, id, image_path, status, text, username} = this.props.task;
    return (
      <Wrapper status={status} className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={image_path} alt="Placeholder image" />
          </figure>
        </div>
        <div  className="card-content">
          <div className="media">
            <div className="media-left">
              {/*<IconWrapper  status className="image is-48x48">
                <Icon status onClick={this.handleCheck} login={this.props.login} className="icon">
                  {status === 0 ? <i className='far fa-check-square'/> :
                    <i className='far fa-square'/>}
                </Icon>
              </IconWrapper>*/}
              <IconWrapper>
                <Icon onClick={this.handleCheck} login={this.props.login} onChange={()=>{}} type="checkbox" checked={!!status}/>
              </IconWrapper>
            </div>
            <div className="media-content">
              <p className="title is-4">{username}</p>
              <p className="subtitle is-6">{email}</p>
            </div>
          </div>
          <div className="content">
            {text}
          </div>
          {this.props.login ? <div className="content">
            <a className="button is-warning" onClick={this.handleClick}>Edit</a>
          </div> : null}
        </div>
      </Wrapper>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  checkTask: PropTypes.func.isRequired,
};

export default Task;