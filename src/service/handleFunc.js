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