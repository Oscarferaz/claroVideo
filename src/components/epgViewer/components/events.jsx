import { memo, useCallback,  } from "react"

function Events({ events = [], onMouseEntered = () => {} }) {
    
  const handleHover = useCallback((program) => onMouseEntered(program), [onMouseEntered])

  return events.map(({ date_begin, date_end, name, description, width, channelId }) => {

   

    return (
      <div
        key={`${date_begin}-${channelId}`}
        className={`h-full border border-slate-700 overflow-hidden transition-colors hover:bg-gray-700`}
        style={{
          width: `${width}px`
        }}
        onMouseEnter={() => handleHover({ date_begin, date_end, name, description })}
        onMouseLeave={() => handleHover(null)}
        onClick={() => handleHover({ date_begin, date_end, name, description })}
      >
          <>
            <p className="text-md text-gray-200">{name}</p>
            <p className="text-xs text-gray-400">{`${date_begin?.split(" ")[1]} - ${date_end?.split(" ")[1]}`}</p>
          </>
      </div>
    )
  })
}

export default memo(Events)

