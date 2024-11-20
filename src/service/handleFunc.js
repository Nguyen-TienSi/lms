import axiosInstance from "./axios_helper";

export function handleFormatDateTime(datetime) {
    if (!datetime) {
        return { formattedDate: 'N/A', formattedTime: 'N/A', period: 'N/A' };
    }

    const date = new Date(datetime);
    if (isNaN(date.getTime())) {
        return { formattedDate: 'Invalid Date', formattedTime: 'Invalid Date', period: 'Invalid Date' };
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const formattedTime = date.toLocaleTimeString('vi-VN', { hour: 'numeric', minute: 'numeric' });
    const hour = date.getHours();
    const period = hour < 12 ? 'AM' : 'PM';

    return { formattedDate, formattedTime, period };
}

export const handleDownloadMaterial = async (enpoint, material) => {
    try {
        const response = await axiosInstance.get(`${enpoint}/${material.id}`, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', material.fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Error downloading material:", error);
    }
};
