import React from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const ViewOnlineClass = () => {
    // Dữ liệu giả lập cho thông tin phòng học trực tuyến
    const onlineClasses = [
        { id: 1, name: 'Phòng Học Trực Tuyến 1', link: 'https://example.com/class1' },
        { id: 2, name: 'Phòng Học Trực Tuyến 2', link: 'https://example.com/class2' },
    ];

    return (
        <div className="view-online-class-container">
            <h1 className="view-online-class-title">Thông Tin Phòng Học Trực Tuyến</h1>
            <ul className="online-classes-list">
                {onlineClasses.map((onlineClass) => (
                    <li key={onlineClass.id}>
                        <a href={onlineClass.link} target="_blank" rel="noopener noreferrer">
                            {onlineClass.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewOnlineClass;
