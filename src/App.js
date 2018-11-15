import React, { Component } from 'react';
import axios from 'axios';

import Modal       from './components/Modal';
import ContentMake from './components/ContentMake';
import TaskList    from './components/TaskList';
import Pagination from './components/Pagination';
import Header from './components/Header';
import ContentLogin from './components/ContentLogin';

class App extends Component {

  constructor() {
    super();

    this.state = {
      modals: {
        createModal: false,
        loginModal: false,
        editModal: false,
      },
      tasks: {
        page1: null,
        taskCount: 0,
      },
      relevantPage: 1,
      sortField: 'id',
      sortDirection: 'acs',
      login: false,
      admin: {
        login: 'admin',
        password: '123'
      },
      editTask: null,
    }
  }

  componentDidMount() {
    this.askServer(this.state.relevantPage);
  }

  askServer = (page=this.state.relevantPage, field=this.state.sortField, direction=this.state.sortDirection) => {
    axios.get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Mukhin&page=${page}&sort_field=${field}&sort_direction=${direction}`)
      .then(response => {
        let state = Object.assign({}, this.state);
        state.tasks[`page${page}`]= response.data.message.tasks;
        state.tasks.taskCount = response.data.message.total_task_count;
        state.relevantPage = page;
        this.setState(state);
      })
      .catch(error => {
        console.log(error.message);
      })
  };

  handleAdmin = () => {
    let state = Object.assign({}, this.state);
    state.login = true;
    this.setState(state);
  };

  handelModalOpen = (nameModal, task) => {
    let state = Object.assign({}, this.state);
    state.modals[nameModal] = true;
    if (task) state.editTask = task;
    this.setState(state);
  };

  handelModalClose = (nameModal) => {
    let state = Object.assign({}, this.state);
    state.modals[nameModal] = false;
    this.setState(state);
  };

  handleEditTask = (id, task, nameModal) => {
    let data = new FormData();
    data.append('text', task.text);
    data.append('token', task.token);
    data.append('signature', task.signature);

    axios.post(`https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=Mukhin`,
      data,
    )
      .then(response => {
        this.handelModalClose(nameModal);
        let state = Object.assign({}, this.state);
        state.tasks[`page${state.relevantPage}`].map(item => {

          if (id === item.id) {
            item.text = task.text;
          }
          return task;
        });
        this.setState(state);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  handleAddTask = (task) => {
    const lastPage = Math.ceil(this.state.tasks.taskCount / 3);
    if (this.state.tasks[`page${lastPage}`] &&
      this.state.tasks[`page${lastPage}`].length < 3) {
      let state = Object.assign({}, this.state);
      state.tasks.push(task);
      this.setState(state);
    } else {
      this.state.tasks.taskCount % 3 ? this.askServer(lastPage) :
        this.askServer(lastPage + 1);
    }

  };

  handleNextPage = (page) => {
    let state = Object.assign({}, this.state);
    state.relevantPage = page;
    this.setState(state, () => {

      if(!(Object.keys(this.state.tasks)).includes(`page${page}`)) {
        this.askServer(this.state.relevantPage);
      }
    });
  };

  handelSortField = (val) => {
    let state = Object.assign({}, this.state);
    state.sortField = val;
    state.tasks = {
      taskCount: state.relevantPage,
    };
    this.setState(state, this.askServer);

  };

  handleCheck = (id, task) => {
    let data = new FormData();
    data.append('status', task.status);
    data.append('token', task.token);
    data.append('signature', task.signature);

    axios.post(`https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=Mukhin`,
      data,
    )
      .then(response => {
        let state = Object.assign({}, this.state);
        state.tasks[`page${state.relevantPage}`].map(item => {

          if (id === item.id) {
            item.status = task.status;
          }
          return task;
        });
        this.setState(state);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  handelSortDirection = (val) => {
    let state = Object.assign({}, this.state);
    state.sortDirection = val;
    state.tasks = {
      taskCount: state.relevantPage,
    };
    this.setState(state, this.askServer);
  };

  /*goSort = () => {
    const state = Object.assign({}, this.state);
    state.tasks[`page${this.state.relevantPage}`]
      .sort(this.compareFunction);
    this.setState(state);
  };*/

  /*compareFunction = (a, b) => {
    let field = this.state.sortField;
    let direction = this.state.sortDirection;

    if (direction === 'asc') {
      if (a[field].toLowerCase() < b[field].toLowerCase()) return -1;
      if (a[field].toLowerCase() > b[field].toLowerCase()) return 1;
      return 0;
    } else {
      if (a[field].toLowerCase() > b[field].toLowerCase()) return -1;
      if (a[field].toLowerCase() < b[field].toLowerCase()) return 1;
      return 0;
    }
  };*/

  render() {
    return (
      <main className="App container">
        <Header
          handelModalOpen={this.handelModalOpen}
          sortField={this.handelSortField}
          sortDirection={this.handelSortDirection}
          login={this.state.login}
        />
        {this.state.tasks[`page${this.state.relevantPage}`] ?
          <React.Fragment>
            <TaskList
              login={this.state.login}
              tasks={this.state.tasks[`page${this.state.relevantPage}`]}
              handelModalOpen={this.handelModalOpen}
              handleCheck={this.handleCheck}
            />
            <Pagination
              page={this.state.relevantPage}
              taskCount={this.state.tasks.taskCount}
              nextPage={this.handleNextPage}
            />
          </React.Fragment> : null
        }
        <Modal
          status={this.state.modals.createModal}
          nameModal={Object.keys(this.state.modals)[0]}
          handelModalClose={this.handelModalClose}
          contentModal={
            <ContentMake
              status={this.state.modals.createModal}
              title={'Make Task'}
              handelModalClose={this.handelModalClose}
              nameModal={Object.keys(this.state.modals)[0]}
              actionTask={this.handleAddTask}
            />}
        />
        <Modal
          status={this.state.modals.loginModal}
          nameModal={Object.keys(this.state.modals)[1]}
          handelModalClose={this.handelModalClose}
          contentModal={
            <ContentLogin
              status={this.state.modals.loginModal}
              title={'Login'}
              handelModalClose={this.handelModalClose}
              nameModal={Object.keys(this.state.modals)[1]}
              loginAdmin={this.handleAdmin}
              admin={this.state.admin}
            />}
        />
        <Modal
          status={this.state.modals.editModal}
          nameModal={Object.keys(this.state.modals)[2]}
          handelModalClose={this.handelModalClose}
          contentModal={
            <ContentMake
              status={this.state.modals.editModal}
              title={'Edit'}
              handelModalClose={this.handelModalClose}
              nameModal={Object.keys(this.state.modals)[2]}
              edit={this.state.modals.editModal}
              actionTask={this.handleEditTask}
              editTask={this.state.editTask}
            />}
        />
      </main>
    );
  }
}

export default App;
