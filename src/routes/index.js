// routes/index.js
import Login from "../pages/auth/Login";
import NoPage from "../pages/auth/NoPage";

import AdminHome from '../pages/Users/Admin/AdminHome'
import AdminSubjects from "../pages/Users/Admin/Subject/AdminSubjects";
import AdminSubjectDetail from "../pages/Users/Admin/Subject/AdminSubjectDetail";
import AdminTeachers from "../pages/Users/Admin/Teacher/AdminTeachers";
import AdminTeacherDetail from "../pages/Users/Admin/Teacher/AdminTeacherDetail";
import AdminStudents from "../pages/Users/Admin/Student/AdminStudents";
import AdminStudentDetail from "../pages/Users/Admin/Student/AdminStudentDetail";

import TeacherHome from "../pages/Users/Teacher/Teacher-Home";
import ClassDetail from "../pages/Users/Teacher/ClassDetail";
import CreateAssignment from "../pages/Users/Teacher/CreateAssignment";
import GradeAssignments from "../pages/Users/Teacher/GradeAssignments";
import CreateQuiz from "../pages/Users/Teacher/CreateQuiz";
import ViewQuizResultsTeacher from "../pages/Users/Teacher/ViewQuizResultsTeacher";

import StudentHome from "../pages/Users/Student/StudentHome";
import ViewSubjects from "../pages/Users/Student/ViewSubjects";
import ViewOnlineClassStudent from "../pages/Users/Student/ViewOnlineClassStudent";
import SubmitAssignment from "../pages/Users/Student/SubmitAssignment";
import ViewQuizResultsStudent from "../pages/Users/Student/ViewQuizResultsStudent";

// Các route công khai (public routes)
export const publicRoutes = [
  { path: "/", component: Login },
  { path: "*", component: NoPage },
];

// Các route riêng tư (private routes)
export const privateRoutes = {
  // Route cho quản trị viên
  admin: [
    { path: "/admin/home", component: AdminHome },
    { path: "/admin/subject", component: AdminSubjects },
    { path: "/admin/subject/:id", component: AdminSubjectDetail },
    { path: "/admin/teacher", component: AdminTeachers },
    { path: "/admin/teacher/:id", component: AdminTeacherDetail },
    { path: "/admin/student", component: AdminStudents },
    { path: "admin/student/:id", component: AdminStudentDetail }
  ],

  // Route cho giảng viên
  teacher: [
    { path: "/teacher", component: TeacherHome },
    // { path: "/teacher/:id", component: TeacherDetail },
    { path: "/teacherhome/:id", component: ClassDetail },
    { path: "/teacherhome/:name/create-assignment", component: CreateAssignment },
    { path: "/grade-assignments", component: GradeAssignments },
    { path: "/create-quiz", component: CreateQuiz },
    { path: "/view-quiz-results", component: ViewQuizResultsTeacher },
  ],

  // Route cho sinh viên
  student: [
    { path: "/student", component: StudentHome },
    { path: "/studenthome", component: StudentHome },
    { path: "/view-subjects", component: ViewSubjects },
    { path: "/view-online-class", component: ViewOnlineClassStudent },
    { path: "/submit-assignment", component: SubmitAssignment },
    { path: "/view-quiz-results", component: ViewQuizResultsStudent },
  ]
};
