import React, { useState } from "react";
import axios from "axios";
import "./YouTubeComments.css";

function YouTubeComments() {
  const [videoLink, setVideoLink] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const videoId = extractVideoId(videoLink);
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyAfZTjnRADIeEjoNVZgxMZtD706by1wOmc`;
    const response = await axios.get(apiUrl);
    setComments(response.data.items);
  };

  const extractVideoId = (link) => {
    const regex = /(?:\?v=|\/embed\/|\/\d+\/|\.be\/)([\w\-]+)(?=&|$)/;
    const match = link.match(regex);
    return match[1];
  };

  return (
    <div className="">
      <div className="form">
        <div className="form-item">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              autocomplete="off"
              required
              value={videoLink}
              onChange={(event) => setVideoLink(event.target.value)}
            />
            <label>YouTube video link:</label>
            
          </form>

          <button type="submit" onClick={handleSubmit}>Search</button>
        </div>
      </div>
      <div className="Container-Comment">
            <ul className="Comments">
              {comments.map((comment) => (
                <li key={comment.id} className="line-Comments">
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </li>
              ))}
            </ul>
        </div>   
    </div>
  );
}

export default YouTubeComments;
