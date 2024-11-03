import React from 'react';
import '../../../../styles/ViewOnlineClass.css';

const ViewOnlineClass = () => {
    // Dữ liệu giả lập cho thông tin phòng học trực tuyến
    const onlineClasses = [
        { id: 1, name: 'Phòng Học Trực Tuyến 1', link: 'https://example.com/class1', time: 'Thứ Hai, 10:00 - 12:00' },
        { id: 2, name: 'Phòng Học Trực Tuyến 2', link: 'https://example.com/class2', time: 'Thứ Tư, 14:00 - 16:00' },
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
                        <p className="class-time">{onlineClass.time}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewOnlineClass;
