import React from "react";

const PostVideoPage = (media) => {
  const [media, setMedia] = useState("");

  const handleMediaChange = (event) => {
    setMedia(event.target.value);
  };

  const createPost = (event) => {};

  return (
    <div>
      <form onSubmit={createPost}>
        <label>
          Post
          <input type="file" accept="image/*, video/*" value={media} />
        </label>
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostVideoPage;
