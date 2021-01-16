import React from "react";

const PlayList = ({ track }) => {
  return (
    <div className="playlist">
      <div key={track.id} className="playlist-item selected">
        {track.title}
      </div>
    </div>
  );
};

export default PlayList;
