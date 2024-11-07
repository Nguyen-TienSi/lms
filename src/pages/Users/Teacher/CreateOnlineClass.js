import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/teacher.css';

const CreateOnlineClass = () => {
    const [className, setClassName] = useState('');
    const [classLink, setClassLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý tạo phòng học trực tuyến ở đây
        console.log("Creating online class:", className, classLink);
    };

    return (
        <div className="create-online-class-container">
            <h1 className="create-online-class-title">Tạo Phòng Học Trực Tuyến Mới</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên Phòng Học:</label>
                    <input 
                        type="text" 
                        value={className} 
                        onChange={(e) => setClassName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Liên Kết Phòng Học:</label>
                    <input 
                        type="url" 
                        value={classLink} 
                        onChange={(e) => setClassLink(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Tạo Phòng Học</button>
            </form>
        </div>
    );
};

export default CreateOnlineClass;
