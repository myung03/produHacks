import React from "react";
//DO NOT DO ANYTHING TO FOR NOW
const PostVideoPage = (media) => {
  const [media, setMedia] = useState("");

  const handleMediaChange = (event) => {
    setMedia(event.target.value);
  };

  const createPost = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("media", media);
    formData.append("caption", caption);
    formData.append("user", user._id);

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post created:", data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
