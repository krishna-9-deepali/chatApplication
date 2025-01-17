import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function useGetMessages() {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // axios.defaults.withCredentials = true;
        const token = sessionStorage.getItem("token");
        let parsedToken = "";
        console.log(token);

        if (!token) {
          console.warn("No token found in sessionStorage.");
          return;
        }
        if (token) {
          parsedToken = JSON.parse(token);
          console.log(parsedToken, "Parsed Token");
        }
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/message/${selectedUser?._id}`,
          {
            headers: {
              Authorization: `Bearer ${parsedToken}`,
            },

            // withCredentials: true,
          }
        );
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUser?._id, setMessages, dispatch]);
}
export default useGetMessages;
