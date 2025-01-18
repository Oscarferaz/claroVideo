function Events({ events = [], onMouseEntered }) {

    const convertToMinutes = (timeString) => {
        if (!timeString) return 0
        const [hours, minutes] = timeString.split(":").map(Number);
        return (hours * 100) + ((minutes * 60) / 100)
    }

    const getEventPosition = (startProgam) => {
        const position = convertToMinutes(startProgam?.split(" ")[1])
        return isNaN(position) ? 0 : position
    }

    const getEventWidth = (timeString) => {
        const width = convertToMinutes(timeString) 
        return isNaN(width) ? 0 : width
    }

    const handleHover = (value) => onMouseEntered(value) 


    return(

        events.map(({date_begin, date_end, duration}) => (
        <div
            key={date_begin}
            className="absolute top-0 h-full border border-gray-200 p-2 overflow-hidden hover:bg-gray-100 transition-colors"
            style={{
            left: getEventPosition(date_begin),
            width: getEventWidth(duration),
            }}
            onMouseEnter={() => handleHover({date_begin, date_end, duration})}
            onMouseLeave={() => handleHover(null)}
        >
            <p className="text-xs text-gray-500">
                {`${date_begin?.split(' ')[1]} - ${date_end?.split(' ')[1]}`}
            </p>
        </div>
        ))
    )
}

export default Events