export const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
 
    return `${year}${month}${day}`;
}

export const formatReceivedDate = (dateString) => {
    const now = new Date();
    const currentDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;

    
    const receivedDate = dateString.slice(0, 8); 

    if (receivedDate === currentDate) {
        return "Hoy";
    } else {
       
        const year = receivedDate.slice(0, 4);
        const month = receivedDate.slice(4, 6);
        const day = receivedDate.slice(6, 8);

        return `${day}/${month}/${year}`; 
    }
}

const parseDateISO = (dateString) => {
    return new Date(dateString.replace(/\/| /g, (match) => (match === " " ? "T" : "-")));
};

export const adjustEventToToday = (date_begin, date_end, currentDate) => {
    const todayStart = new Date(currentDate.slice(0, 4), currentDate.slice(4, 6) - 1, currentDate.slice(6, 8), 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59);

    const eventStart = parseDateISO(date_begin); // Convertir al formato ISO
    const eventEnd = parseDateISO(date_end);
    
    const actualStart = eventStart < todayStart ? todayStart : eventStart;
    const actualEnd = eventEnd > todayEnd ? todayEnd : eventEnd;
    
    return ((actualEnd - actualStart) / (1000 * 60 * 60) * 1200); // Convertir al formato ISO
}

export const  addDaysToDate =(dateString, daysToAdd) => {
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1;
    const day = parseInt(dateString.slice(6, 8), 10);

    const date = new Date(year, month, day);

    date.setDate(date.getDate() + daysToAdd);

    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newDay = String(date.getDate()).padStart(2, '0');

    return `${newYear}${newMonth}${newDay}`;
}

export const processEpgData = (data) => {
    const sortedData = data.map(({id, number, image, name, events}) => ({
        id,
        number,
        image,
        name,
        events: events.sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin)),
    }));

    return sortedData      
}

export const getWidth = (timeString) => {
    if (!timeString) return 0
    const [hours, minutes] = timeString.split(":").map(Number);
    return (hours * 1200) + ((minutes * 1200) / 60)
}