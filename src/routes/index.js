import Login from "../pages/auth/Login";
import NoPage from "../pages/auth/NoPage";

import AdminHome from '../pages/Users/Admin/AdminHome'
import AdminSubjects from "../pages/Users/Admin/Subject/AdminSubjects";
import AdminTeachers from "../pages/Users/Admin/Teacher/AdminTeachers";
import AdminTeacherDetail from "../pages/Users/Admin/Teacher/AdminTeacherDetail";
import AdminStudents from "../pages/Users/Admin/Student/AdminStudents";
import AdminStudentDetail from "../pages/Users/Admin/Student/AdminStudentDetail";
import AdminCourses from "../pages/Users/Admin/Course/AdminCourses";
import AdminAddNewCourse from "../pages/Users/Admin/Course/AdminAddNewCourse";
import AdminClasses from "../pages/Users/Admin/Class/AdminClasses";
import AdminAddNewStudent from "../pages/Users/Admin/Student/AdminAddNewStudent";
import AdminAddNewTeacher from "../pages/Users/Admin/Teacher/AdminAddNewTeacher";
import AdminSemester from "../pages/Users/Admin/Semester/AdminSemester";

import TeacherHome from '../pages/Users/Teacher/TeacherHome'
import TeacherCourseDetails from "../pages/Users/Teacher/TeacherCourseDetails";
import TeacherRoomDetail from "../pages/Users/Teacher/TeacherRoomDetail";
import TeacherAssignmentResult from "../pages/Users/Teacher/TeacherAssignmentResult";
import TeacherAddNewAssignment from "../pages/Users/Teacher/TeacherAddNewAssignment";

import StudentHome from '../pages/Users/Student/StudentHome'
import StudentCourseDetails from "../pages/Users/Student/StudentCourseDetails";
import StudentAssignmentDetails from "../pages/Users/Student/StudentAssignmentDetails";
import StudentDoQuestion from "../pages/Users/Student/StudentDoQuestion";

export const publicRoutes = [
  { path: "/", component: Login },
  { path: "*", component: NoPage },
];

export const privateRoutes = {
  admin: [
    { path: "/home", component: AdminHome },
    { path: "/class", component: AdminClasses },
    { path: "/semester", component: AdminSemester },
    { path: "/subject", component: AdminSubjects },
    { path: "/teacher", component: AdminTeachers },
    { path: "/teacher/add", component: AdminAddNewTeacher },
    { path: "/teacher/:id", component: AdminTeacherDetail },
    { path: "/student", component: AdminStudents },
    { path: "/student/add", component: AdminAddNewStudent },
    { path: "/student/:id", component: AdminStudentDetail },
    { path: "/course/", component: AdminCourses },
    { path: "/course/add", component: AdminAddNewCourse }
  ],

  teacher: [
    { path: "/home", component: TeacherHome },
    { path: "/course/:id", component: TeacherCourseDetails },
    { path: "/assignment/add", component: TeacherAddNewAssignment },
    { path: "/room/:id", component: TeacherRoomDetail },
    { path: "/assignment/:id", component: TeacherAssignmentResult }
  ],

  student: [
    { path: "/home", component: StudentHome },
    { path: "/course/:id", component: StudentCourseDetails },
    { path: "/assignment/:id", component: StudentAssignmentDetails },
    { path: "/question/assignment/:id", component: StudentDoQuestion }
  ]
};
