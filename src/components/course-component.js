import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CoursesService from "../services/courses.service";
const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const buttonHandler = () => {
    navigate("/login");
  };
  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CoursesService.get(_id)
          .then((data) => {
            console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CoursesService.getEnrolledCourses(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div className="container">
          <p>您必須先登入才能看到此頁面</p>
          <button onClick={buttonHandler} className="btn btn-primary btn-lg">
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser.user.role === "instructor" && (
        <div>
          <h1>歡迎來到講師頁面</h1>
        </div>
      )}
      {currentUser.user.role === "student" && (
        <div>
          <h1>歡迎來到學生頁面</h1>
        </div>
      )}
      {courseData && currentUser && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱：{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }}>{course.description}</p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數：{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格：{course.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
