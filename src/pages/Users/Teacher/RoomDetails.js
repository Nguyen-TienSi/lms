// RoomDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomDetails = ({ classId }) => {
    const [meetLink, setMeetLink] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newLink, setNewLink] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/classes/${classId}`); // Endpoint API để lấy thông tin lớp
                const classData = response.data;
                setMeetLink(classData.onlineLink);
                setNewLink(classData.onlineLink); // Đặt giá trị mới ban đầu
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };

        fetchClassDetails();
    }, [classId]);

    const handleEditClick = () => {
        setIsEditing(true);
        setError('');
    };

    const handleSaveClick = () => {
        if (!isValidURL(newLink)) {
            setError('Vui lòng nhập một liên kết hợp lệ.');
            return;
        }

        setMeetLink(newLink);
        setIsEditing(false);
        setError('');
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewLink(meetLink);
        setError('');
    };

    const isValidURL = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|'+
            'localhost|'+
            '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|'+
            '[0a-f]{1,4}(:[0a-f]{1,4}){7})'+
            '(:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');
        return !!pattern.test(url);
    };

    return (
        <div className="room-details">
            <h2>Phòng Học</h2>
            <p>Để tham gia lớp học, hãy nhấp vào liên kết dưới đây:</p>
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        value={newLink} 
                        onChange={(e) => setNewLink(e.target.value)} 
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }} 
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={handleSaveClick} className="btn-save">Lưu</button>
                    <button onClick={handleCancelClick} className="btn-cancel">Hủy</button>
                </div>
            ) : (
                <div>
                    <div className="room-online">
                        <a href={meetLink} target="_blank" rel="noopener noreferrer" className="meet-link">
                            Tham Gia Phòng Học
                        </a>
                    </div>
                    <button onClick={handleEditClick} className="btn-edit">Chỉnh Sửa</button>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;
