const dateCache = new Map()

const MILLIS_PER_HOUR = 3600000

export const processEpgData = (data, currentDate) => {
    return data.map(({ id, number, image, name, events }) => {
        const processedEvents = events
            .sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin))
            .map((event, index, arr) => {
                const startDate = parseDateISO(event.date_begin)
                const endDate = parseDateISO(event.date_end)
                
                const isFirst = index === 0
                const isLast = index === arr.length - 1
                
                return {
                    ...event,
                    startDate,
                    endDate,
                    startTime: event.date_begin.split(" ")[1],
                    endTime: event.date_end.split(" ")[1],
                    width: calculateWidth(isFirst || isLast, startDate, endDate, currentDate)
                }
            })

        return { id, number, image, name, events: processedEvents }
    })
}

const parseDateISO = (dateString) => {
    if (!dateCache.has(dateString)) {
        dateCache.set(dateString, new Date(dateString.replace(/\/| /g, m => m === " " ? "T" : "-")))
    }
    return dateCache.get(dateString)
}

const calculateWidth = (isEdge, startDate, endDate, currentDate) => {
    const todayStart = new Date(currentDate.slice(0, 4), currentDate.slice(4, 6) - 1, currentDate.slice(6, 8), 0, 0, 0)
    todayStart.setHours(0, 0, 0, 0)

    const todayEnd = new Date(todayStart)
    todayEnd.setHours(23, 59, 59)

    const actualStart = startDate < todayStart ? todayStart : startDate
    const actualEnd = endDate > todayEnd ? todayEnd : endDate

    
    return isEdge 
        ? ((actualEnd - actualStart) /  MILLIS_PER_HOUR * 500)
        : ((endDate - startDate) / MILLIS_PER_HOUR * 500)
}

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