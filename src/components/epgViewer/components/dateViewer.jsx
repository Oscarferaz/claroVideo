import { memo } from "react";
import { formatReceivedDate } from "../../../utils/utils";

function DateViewer({date}) {
    return (
        <div className="w-[150px] sticky left-0 bg-black p-2 flex justify-center items-center">
                {formatReceivedDate(date)}
        </div>
    )
}

export default memo(DateViewer);