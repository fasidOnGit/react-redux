import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CourseList from './CourseList';
import * as courseActions from "../../actions/courseActions";
import {browserHistory} from 'react-router';
class CoursePage extends Component {
  constructor(props , context) {
    super(props , context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course , index){
    return <div key={index}>{course.title}</div>;
  }
  redirectToAddCoursePage(){
    browserHistory.push('/course');
  }
  render() {
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
              value="Add Course"
              className="btn btn-primary"
              onClick={this.redirectToAddCoursePage}/>
          <CourseList courses={this.props.courses} />
      </div>
    );
  }
}

function mapStateToProps(state , ownProps){
  return {
    courses: state.courses
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(courseActions , dispatch)
  };
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps , mapDispatchToProps)(CoursePage);
