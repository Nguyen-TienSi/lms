// routes/index.js
import Login from "../pages/auth/Login";
import NoPage from "../pages/auth/NoPage";

import AdminHome from '../pages/Users/Admin/AdminHome'
import SubjectList from "../pages/Users/Admin/Subject/SubjectList";
import TeacherList from "../pages/Users/Admin/Teacher/TeacherList";
import TeacherDetail from "../pages/Users/Admin/Teacher/TeacherDetail";

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
    { path: "/admin/subject", component: SubjectList },
    { path: "/admin/teacher", component: TeacherList },
    { path: "/admin/teacher/:id", component: TeacherDetail },
    // { path: "/admin/student", component: StudentList },
    // { path: "admin/student/:id", component: StudentDetail }
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
