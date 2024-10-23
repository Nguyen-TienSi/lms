src/
│
├── components/                 # Các thành phần (components) dùng chung hoặc riêng
│   ├── Common/                 # Các thành phần dùng chung cho cả Giáo viên và Học sinh
│   │   ├── Header.js           # Header dùng chung
│   │   ├── Footer.js           # Footer dùng chung
│   │   └── Sidebar.js          # Sidebar hoặc Menu dùng chung
│   │
│   ├── Teacher/                # Các thành phần dành riêng cho Giáo viên
│   │   ├── AssignmentForm.js   # Form tạo bài tập
│   │   ├── AssignmentList.js   # Danh sách bài tập đã giao
│   │   └── TeacherLink.js      # Link liên kết dành riêng cho giáo viên
│   │
│   └── Student/                # Các thành phần dành riêng cho Học sinh
│       ├── AssignmentItem.js   # Hiển thị chi tiết bài tập cho học sinh
│       └── QuizItem.js         # Hiển thị thông tin câu hỏi trắc nghiệm
│
├── pages/                      # Các trang chính của ứng dụng
│   ├── Teacher/                # Các trang dành riêng cho Giáo viên
│   │   ├── TeacherHome.js          # Trang chủ dành cho giáo viên
│   │   ├── TeacherExercise.js      # Trang bài tập của giáo viên
│   │   ├── ViewClasses.js          # Trang xem danh sách lớp học
│   │   ├── ViewOnlineClass.js      # Trang xem thông tin phòng học trực tuyến
│   │   ├── CreateOnlineClass.js    # Trang tạo phòng học trực tuyến mới
│   │   ├── ViewAttendance.js       # Trang xem danh sách điểm danh
│   │   ├── MarkAttendance.js       # Trang điểm danh học sinh
│   │   ├── CreateAssignment.js     # Trang tạo bài tập mới
│   │   ├── ViewAssignments.js      # Trang xem bài tập đã giao
│   │   ├── GradeAssignments.js     # Trang chấm bài tập
│   │   ├── CreateQuiz.js           # Trang tạo câu hỏi trắc nghiệm
│   │   └── ViewQuizResults.js      # Trang xem kết quả trắc nghiệm
│   │
│   └── Student/                # Các trang dành riêng cho Học sinh
│       ├── StudentHome.js          # Trang chủ dành cho học sinh
│       ├── ViewSubjects.js         # Trang xem danh sách môn học
│       ├── ViewOnlineClass.js      # Trang xem phòng học trực tuyến
│       ├── ViewAssignments.js      # Trang xem bài tập
│       ├── SubmitAssignment.js     # Trang nộp bài tập
│       ├── ViewQuizzes.js          # Trang xem danh sách bài kiểm tra trắc nghiệm
│       ├── TakeQuiz.js             # Trang làm bài kiểm tra trắc nghiệm
│       ├── ViewQuizResults.js      # Trang xem kết quả bài kiểm tra
│       └── ViewAttendance.js       # Trang xem lịch sử điểm danh
│
├── auth/                       # Các trang liên quan đến xác thực người dùng
│   ├── Login.js                # Trang đăng nhập
│   └── ChangePassword.js       # Trang đổi mật khẩu cho cả giáo viên và học sinh
│
├── styles/                     # Thư mục chứa các file CSS hoặc SCSS nếu có
│   ├── common.css              # CSS chung cho cả hệ thống
│   ├── teacher.css             # CSS riêng cho giáo viên
│   └── student.css             # CSS riêng cho học sinh
│
└── utils/                      # Thư mục chứa các hàm tiện ích
    ├── api.js                  # Các hàm API để kết nối với backend
    ├── dateUtils.js            # Các hàm xử lý liên quan đến ngày tháng
    └── validation.js           # Các hàm kiểm tra, validate dữ liệu
