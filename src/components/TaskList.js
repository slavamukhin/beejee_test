import React, {Component} from 'react';
import styled             from 'styled-components';
import PropTypes          from 'prop-types';

import Task               from './Task';

const Wrapper = styled.div`
  
`;

const TaskWrapper = styled.div`
  flex-basis: 33%;
  flex-grow: 0;
`;

class TaskList extends Component {
  render() {
    const tasks = this.props.tasks.map(task =>
      <TaskWrapper key={task.id} className="column">
        <Task
          task={task}
          login={this.props.login}
          onClick={this.props.handelModalOpen}
          checkTask={this.props.handleCheck}
        />
      </TaskWrapper>);
    return (
      <Wrapper className="columns">
        {tasks}
      </Wrapper>
    )
  }
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image_path: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  })).isRequired,
  login: PropTypes.bool.isRequired,
  handelModalOpen: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

export default TaskList;