import { useCallback, useEffect, useState } from "react"
import { getEpgData } from "../../services/fetchData"
import Hours from "./components/hours"
import Channels from "./components/channel"
import Events from "./components/events"
import { addDaysToDate, getCurrentDateTime, processEpgData } from "../../utils/utils"
import ChangeDateButtons from "./components/changeDateButtons"
import DateViewer from "./components/dateViewer"
import ProgramDetails from "./components/programDetails"



function EpgViewer ({onClose}) {

    const [data, setData] = useState([]) 
    const [programHovered, setProgramHovered] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filterDate, setFilterDate] = useState(getCurrentDateTime())
    
    useEffect( () => {
        const getData = async () => {
            try{
                setLoading(true)
                const epgData = await getEpgData(filterDate)
                const data = processEpgData(epgData, filterDate)
                setData(data)
                setLoading(false)
            }catch(e){
                console.log(e)
            }
        }
        getData()
    }, [filterDate])

    const handleMouseEnter = useCallback((program) => {
        setProgramHovered(program);
    }, [])

    const handleFilterDate = useCallback((daysToAdd) => {
        setFilterDate((prev) => addDaysToDate(prev, daysToAdd))
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
                className="absolute top-2 right-2 text-white rounded hover:bg-red-600 w-[15px] z-2"
            >
                X
            </button>

            <div className="h-[50%] flex flex-col justify-center p-2">
                <ProgramDetails program={programHovered}/>
            </div>

            <div className="h-[50%] overflow-auto" style={{backgroundColor: 'rgb(50 49 49 / 43%)'}}>

            <div className="w-max">
                <div className="sticky top-0 z-10 bg-black flex">
                        <DateViewer date={filterDate}/>
                        <Hours handleClick={handleFilterDate}/>
                        <ChangeDateButtons changeDate={handleFilterDate}/>
                    </div>
                
                    {data.map(({ id, name, image, number, events }) => (
                        <div key={id} className="flex">
                            <Channels channel={{ name, image, number }} />
                            <div className="flex">
                                <Events currentDate={filterDate} events={events} onMouseEntered={handleMouseEnter}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EpgViewer