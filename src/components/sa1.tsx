import React, { useState } from 'react';

const LikeDislikeComponent = () => {
  const [likes, setLikes] = useState(100);
  const [dislikes, setDislikes] = useState(25);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeClick = () => {
    if (!liked && !disliked) {
      setLikes(likes + 1);
      setLiked(true);
    } else if (liked && !disliked) {
      setLikes(likes - 1);
      setLiked(false);
    } else if (!liked && disliked) {
      setLikes(likes + 1);
      setLiked(true);
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
  };

  const handleDislikeClick = () => {
    if (!liked && !disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
    } else if (!liked && disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else if (liked && !disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <div>
      <button
        style={{ backgroundColor: liked ? 'lightblue' : 'initial' }}
        onClick={handleLikeClick}
      >
        Like | <span>{likes}</span>
      </button>
      <button
        style={{ backgroundColor: disliked ? 'lightcoral' : 'initial' }}
        onClick={handleDislikeClick}
      >
        Dislike | <span>{dislikes}</span>
      </button>
    </div>
  );
};

export default LikeDislikeComponent;