function Events({ events }) {

    const convertToMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return (hours * 100) + ((minutes * 60) / 100)
    }

    const getEventPosition = (startProgam) => (convertToMinutes(startProgam.split(" ")[1]) + 150)

    const getEventWidth = (timeString) => convertToMinutes(timeString) 


    return(

        events.map(({date_begin, date_end, duration}) => (
        <div
            key={date_begin}
            className="absolute top-0 h-full border border-gray-200 p-2 overflow-hidden transition-colors"
            style={{
            left: getEventPosition(date_begin),
            width: getEventWidth(duration),
            }}
            // onMouseEnter={() => setHoveredEvent(event)}
            // onMouseLeave={() => setHoveredEvent(null)}
        >
            <p className="text-xs text-gray-500">
                {`${date_begin.split(' ')[1]} - ${date_end.split(' ')[1]}`}
            </p>
        </div>
        ))
    )
}

export default Events