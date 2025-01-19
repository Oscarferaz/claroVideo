export const getHours = (data) => {
    const allDates = data.flatMap(channel => 
        channel.events.map(event => new Date(event.date_begin))
    );

    const sortedUniqueDates = [...new Set(allDates)]
        .sort((a, b) => a - b)
        .map(date => {
            const roundedDate = new Date(date);
            roundedDate.setMinutes(0, 0, 0);
            return roundedDate;
        });

    return [
        ...new Set(sortedUniqueDates
            .map(date => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }))
        )
    ];
}

export const processEpgData = (data) => {
    const sortedData = data.map(({id, number, image, name, events}) => ({
        id,
        number,
        image,
        name,
        events: events.sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin)),
    }));

    const uniqueSortedStartTimes = getHours(sortedData)

    return {
        data: sortedData,
        hours: uniqueSortedStartTimes
    }
}

export const getWidth = (timeString) => {
        if (!timeString) return 0
        const [hours, minutes] = timeString.split(":").map(Number);
        return (hours * 100) + ((minutes * 60) / 100)
    }