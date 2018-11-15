import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';
import axios              from 'axios';
import FormData           from 'form-data';
import md5                from 'md5';

import File    from './File';
import Field   from './Field';
import Preview from './Preview';

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

class ContentMake extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: this.props.edit ? this.props.editTask.username : '',
      email: this.props.edit ? this.props.editTask.email : '',
      file: '',
      text: this.props.edit ? this.props.editTask.text : '',
      previewUrl: '',
      preview: false,
    }
  }

  handlePreview = () => {
    let state = Object.assign({}, this.state);
    state.preview = true;
    this.setState(state);
  };

  handleBack = () => {
    let state = Object.assign({}, this.state);
    state.preview = false;
    this.setState(state);
  };

  handleChange = (field, val, url) => {
    let state = Object.assign({}, this.state);
    state[field] = val;
    if (url) {
      state.previewUrl = url;
    }
    this.setState(state);
  };

  handleText = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSendServer = () => {
    const {userName, email, file, text} = this.state;
    let data = new FormData();
    data.append('username', userName);
    data.append('email', email);
    data.append('text', text);
    data.append('image', file, 'blob');

    if (userName && email && file && text) {
      axios.post('https://uxcandy.com/~shapoval/test-task-backend/create?developer=Mukhin',
        data,
      )
        .then(response => {
          this.props.actionTask(response.data.message);
          this.props.handelModalClose(this.props.nameModal);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };

  editTask = () => {
    const id = this.props.editTask.id;
    const editTask = {
      text: this.state.text,
      token: 'beejee',
    };
    const signature = `text=${encodeURIComponent(editTask.text)}&token=${encodeURIComponent(editTask.token)}`;
    editTask.signature = md5(signature);
    this.props.actionTask(id, editTask, this.props.nameModal);
  };

  render() {
    return (this.props.status ?
        <Wrapper className="modal-content">
          {this.state.preview ?
            <section className="section has-background-light">
              <Preview task={this.state} onClick={this.handleBack}/>
            </section> :
            <section className="section has-background-light">
              <Title className='is-size-3'>{this.props.title}</Title>
              <Field
                label={'User name'}
                placeholder={'Enter user name'}
                type={'text'}
                value={this.state.userName}
                field={'userName'}
                handleChange={this.handleChange}
                disabled={this.props.edit}
              />
              <Field
                label={'Email'}
                placeholder={'Enter user email'}
                type={'email'}
                value={this.state.email}
                field={'email'}
                handleChange={this.handleChange}
                disabled={this.props.edit}
              />
              <label className="label has-text-grey-darker">Text</label>
              <textarea
                className="textarea"
                placeholder="Text task"
                onChange={this.handleText}
                value={this.state.text}
              />
              <File
                handleChange={this.handleChange}
                edit={this.props.edit}
                url={this.props.editTask ? this.props.editTask.image_path : null}
                disabled={this.props.edit}
              />
              <ButtonWrapper>
                {!this.props.edit ?
                  <Button
                    type='submit'
                    className="button is-primary"
                    onClick={this.handlePreview}
                  >Preview</Button> : null}
                <Button
                  className="button"
                  onClick={() => this.props.handelModalClose(this.props.nameModal)}
                >Cancel</Button>
                <Button
                  type='submit'
                  className="button is-primary"
                  onClick={this.props.edit ? this.editTask : this.handleSendServer}
                >{this.props.edit ? 'Edit' : 'Make'}</Button>
              </ButtonWrapper>
            </section>
          }

        </Wrapper> : null
    );
  }
}

ContentMake.propTypes = {
  handelModalClose: PropTypes.func.isRequired,
  nameModal: PropTypes.string.isRequired,
  title: PropTypes.string,
  actionTask: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  editTask: PropTypes.object,
};

export default ContentMake;