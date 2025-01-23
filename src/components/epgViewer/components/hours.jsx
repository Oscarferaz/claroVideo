import { memo } from "react"
import { formatReceivedDate } from "../../../utils/utils"

function Hours({ date, handleClick }) {
  return (
    <>
      <div className="flex sticky top-0 h-fit w-max">
        <div className="w-[150px] sticky left-0 bg-black p-2 flex justify-center items-center">
          {formatReceivedDate(date)}
        </div>
        {Array.from({ length: 24 }).flatMap((_, index) => [
          <p key={`${index}:00`} className="w-[250px] p-2">
            {`${String(index).padStart(2, "0")}:00`}
          </p>,
          <p key={`${index}:30`} className="w-[250px] p-2">
            {`${String(index).padStart(2, "0")}:30`}
          </p>,
        ])}
        <div className="w-[100px] sticky right-0 bg-black p-2 flex items-center justify-between">
          <button onClick={() => handleClick(-1)}>{"<"}</button>
          <button onClick={() => handleClick(1)}>{">"}</button>
        </div>
      </div>
    </>
  )
}

export default memo(Hours)

