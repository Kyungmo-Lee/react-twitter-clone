import { authService } from "fBase";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  // const getMyTweets = async () => {
  //   const tweets = await dbService
  //     .collection("tweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt", "desc")
  //     .get();
  //   console.log(tweets.docs.map((doc) => doc.data()));
  // };

  // useEffect(() => {
  //   getMyTweets();
  // }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
    }
    refreshUser();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          value={newDisplayName}
          onChange={onChange}
          type="text"
          placeholder="Display name"
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
