// routes/index.js
import Login from "../pages/Users/auth/Login";
import NoPage from "../pages/Users/auth/NoPage";

import AdminHome from "../pages/Admin/AdminHome";
import TeacherList from "../pages/Admin/Teacher/TeacherList";

import TeacherHome from "../pages/Users/pages/Teacher/Teacher-Home";
import TeacherDetail from "../pages/Admin/Teacher/TeacherDetail";
import ClassDetail from "../pages/Users/pages/Teacher/ClassDetail";
import CreateAssignment from "../pages/Users/pages/Teacher/CreateAssignment";
import GradeAssignments from "../pages/Users/pages/Teacher/GradeAssignments";
import CreateQuiz from "../pages/Users/pages/Teacher/CreateQuiz";
import ViewQuizResultsTeacher from "../pages/Users/pages/Teacher/ViewQuizResultsTeacher";

import StudentHome from "../pages/Users/pages/Student/StudentHome";
import ViewSubjects from "../pages/Users/pages/Student/ViewSubjects";
import ViewOnlineClassStudent from "../pages/Users/pages/Student/ViewOnlineClassStudent";
import SubmitAssignment from "../pages/Users/pages/Student/SubmitAssignment";
import ViewQuizResultsStudent from "../pages/Users/pages/Student/ViewQuizResultsStudent";

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
    { path: "/admin/teacher", component: TeacherList}
  ],

  // Route cho giảng viên
  teacher: [
    { path: "/teacher", component: TeacherHome },
    { path: "/teacher/:id", component: TeacherDetail },
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
