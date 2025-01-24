import { memo } from "react";

function ChangeDateButtons({ changeDate }) {
  return (
    <div className="w-[50px] sticky right-0 bg-black flex items-center justify-between">
    <button className="w-6 h-full hover:bg-gray-800" onClick={() => changeDate(-1)}>
    {"<"}
    </button>
    <button className="w-6 h-full hover:bg-gray-800" onClick={() => changeDate(1)}>
    {">"}
    </button>
</div>
  );
}

export default memo(ChangeDateButtons);