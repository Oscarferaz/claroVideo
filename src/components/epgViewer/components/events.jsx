import { memo, useCallback } from "react";
import { getWidth } from "../../../utils/utils";

function Events({ events = [], onMouseEntered = () => {}}) {

    const handleHover = useCallback(
        (program) => onMouseEntered(program),
        [onMouseEntered]
    );


    return(

        events.map(({date_begin, date_end, duration}) => (
        <div
            key={date_begin}
            className="h-full border border-slate-700 p-2 overflow-hidden hover:bg-gray-700 transition-colors"
            style={{
            width: getWidth(duration) + "px",
            }}
            onMouseEnter={() => handleHover({date_begin, date_end, duration})}
            onMouseLeave={() => handleHover(null)}
            onClick={() => handleHover({date_begin, date_end, duration})}
        >
            <p className="text-xs text-gray-200">
                {`${date_begin?.split(' ')[1]} - ${date_end?.split(' ')[1]}`}
            </p>
        </div>
        ))
    )
}

export default memo(Events)