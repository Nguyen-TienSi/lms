// RoomDetails.js
import React, { useState } from 'react';

const RoomDetails = () => {
    // URL của phòng họp Google Meet
    const [meetLink, setMeetLink] = useState("https://meet.google.com/your-meeting-link"); // Thay đổi thành liên kết thực tế của bạn
    const [isEditing, setIsEditing] = useState(false);
    const [newLink, setNewLink] = useState(meetLink);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setMeetLink(newLink);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewLink(meetLink); // Hoàn tác thay đổi
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
