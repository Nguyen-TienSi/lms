import React from 'react';
import '../../styles/Teacher/TeacherHome.css'; 
import '../../styles/common.css';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import { Link } from 'react-router-dom';

const ClassList = () => {
    const classes = [
        { id: 1, name: 'Lớp Học Toán', img: require('../../image/image.png') },
        { id: 2, name: 'Lớp Học Lý', img: require('../../image/image.png') },
        { id: 3, name: 'Lớp Học Hóa', img: require('../../image/image.png') },
        { id: 4, name: 'Lớp Học Tiếng Anh', img: require('../../image/image.png') },
        { id: 5, name: 'Lớp Học Toán', img: require('../../image/image.png') },
        { id: 6, name: 'Lớp Học Lý', img: require('../../image/image.png') },
        { id: 7, name: 'Lớp Học Hóa', img: require('../../image/image.png') },
        { id: 8, name: 'Lớp Học Tiếng Anh', img: require('../../image/image.png') },
        { id: 9, name: 'Lớp Học Toán', img: require('../../image/image.png') },
        { id: 10, name: 'Lớp Học Lý', img: require('../../image/image.png') },
        { id: 11, name: 'Lớp Học Hóa', img: require('../../image/image.png') },
        { id: 12, name: 'Lớp Học Tiếng Anh', img: require('../../image/image.png') },
    ];

    return (
        <div>
            <Header />
            <div className='container'>
                <div className="class-list">
                    <h1 className="class-list-title">Danh Sách Các Lớp Học</h1>
                    <div className="class-grid">
                        {classes.map((classItem) => (
                            <Link to={`/teacherhome/${classItem.name}`} key={classItem.id} className="class-item">
                                <img src={classItem.img} alt={classItem.name} />
                                <h2>{classItem.name}</h2>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ClassList;
