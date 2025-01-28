import { memo, useMemo } from "react"

function ProgramDetails({ program }) {

    const { name, timeRange, description } = useMemo(() => {
        if (!program) return {}
        
        return {
          name: program.name,
          timeRange: `${program.date_begin.split(' ')[1]} - ${program.date_end.split(' ')[1]}`,
          description: program.description
        }
      }, [program])

    if(!program) return null

    return(
        <>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="font-light text-xs">{timeRange}</p> 
            <p className="font-light text-xs">{description}</p>
        </>
    )
}

export default memo(ProgramDetails)