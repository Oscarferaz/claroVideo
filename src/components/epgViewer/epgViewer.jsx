import { useEffect, useState } from "react"
import { getEpgData } from "../../services/fetchData"
import Hours from "./components/hours"
import Channels from "./components/channel"
import Events from "./components/events"

const getHours = (data) => {
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

const processEpgData = (data) => {
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

function EpgViewer ({onClose}) {

    const [data, setData] = useState([]) 
    const [programHovered, setProgramHovered] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hours, setHours] = useState([])
    
    useEffect( () => {
        const getData = async () => {
            try{
                const epgData = await getEpgData()
                const {data, hours} = processEpgData(epgData)
                setData(data)
                setHours(hours)
                setLoading(false)
            }catch(e){
                console.log(e)
            }
        }
        getData()
    }, [])

    if(loading) return(
        <div className="flex justify-center items-center h-full text-white bg-black" role="status">
           <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
    )

    return(
        <div className="relative flex flex-col h-full text-white bg-black">
             <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white rounded hover:bg-red-600 w-[15px]"
                style={{zIndex: 2}}
            >
                X
            </button>

            <div className="h-[50%] flex flex-col items-center justify-center">
                {
                    programHovered 
                        ? (
                            <>
                                <p>Duracion: {programHovered.duration}</p> 
                                <p>Comienza: {programHovered.date_begin}</p> 
                           </>
                        )  
                        : (<p>No hay informacion</p>)
                }
            </div>

            <div className="h-[50%] overflow-auto" style={{backgroundColor: 'rgb(50 49 49 / 43%)'}}>
                <div className="sticky top-0 z-10 bg-black w-full">
                    <Hours hours={hours}/>
                </div>
            
                    {data?.map(({ id, name, image, number, events }) => (
                        <div key={id} className="flex">
                            <Channels channel={{ name, image, number }} />
                            <div className="w-content flex">
                                <Events events={events} onMouseEntered={(program) => setProgramHovered(program)}/>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default EpgViewer