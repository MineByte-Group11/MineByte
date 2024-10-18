// CourseSelection.js
import React from 'react';

const courses = ['C++', 'Java', 'Python', 'JavaScript'];

const CourseSelection = () => (
  <div className="courses-grid" style={{ marginTop: '50px' }}>
    {courses.map((course) => (
      <div className="course-tile" key={course}>
        {course}
      </div>
    ))}
  </div>
);

export default CourseSelection;
