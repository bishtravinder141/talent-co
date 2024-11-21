import React, { Fragment, useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import { getChatRooms, getSelectedChatRoom } from "../../API/candidateJobs";
import moment from "moment";
import PageLoader from "../loader/PageLoader";
import ButtonLoader2 from "../loader/ButtonLoader2";
import { CHATBASEURL } from "../../config/APIUrls";

const MessageSection = ({ seekerPage = false }) => {
  const [chatLoader, setChatLoader] = useState(false);
  const [pageloader, setPageLoader] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [originalChatRooms, setOriginalChatRooms] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState();
  const [totalMessageCount, setTotalMessageCount] = useState(null);
  const [messagesPerPage, setMessagesPerPage] = useState(100);
  const [senderName, setSenderName] = useState({
    firstName: "",
    lastName: "",
  });
  const [page, setPage] = useState(1);
  const [sendingMsgLoader, setSendingMsgLoader] = useState(false);
  const socket = useRef();
  const scroller = useRef();
  const currentUser = localStorage.getItem("user_id");
  const partnerChatId = localStorage.getItem("roomId");
  const [firstMsgTime, setFirstMsgTime] = useState();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setPageLoader(true);
    getChatRooms()
      .then((res) => {
        if (res.data.data.length > 0) {
          setChatRooms(res.data.data);
          setOriginalChatRooms(res.data.data);
          let currentChatRoom;
          if (partnerChatId) {
            currentChatRoom = res?.data?.data.find(
              (cht) => cht.name === partnerChatId
            );
            localStorage.removeItem("roomId");
          } else {
            currentChatRoom = res?.data?.data[0];
          }
          const firstName = currentChatRoom?.reciever_data?.first_name;
          const lastName = currentChatRoom?.reciever_data?.last_name;
          handleSelectChatRoom(currentChatRoom?.name, firstName, lastName);
        }
        setPageLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setPageLoader(false);
      });
  }, []);

  //seprate useEffect for socket

  useEffect(() => {
    const token = localStorage.getItem("token");
    socket.current = new WebSocket(
      `${CHATBASEURL}/${currentChatRoom}/?token=${token}`
    );
    socket.current.onopen = () => {
      console.log("WebSocket connection established.");
    };
    socket.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages([...messages, receivedMessage]);
      const tempMessages = [...messages, receivedMessage];
      setFirstMsgTime(moment(tempMessages[0].timestamp).format("hh:mm a"));
      const index = chatRooms?.findIndex((curElem) => {
        return curElem.name === currentChatRoom;
      });
      const currentTime = new Date();
      if (index >= 0) {
        const tempChatRoom = [...chatRooms];
        tempChatRoom[index].last_message[0].last_message.message =
          receivedMessage?.message;
        tempChatRoom[index].last_message[0].last_message.timestamp =
          currentTime;

        setChatRooms(tempChatRoom);
        setOriginalChatRooms(tempChatRoom);
      }
    };
    return () => {
      socket.current.close();
    };
  }, [messages]);

  // seprate useEffect for scroller
  useEffect(() => {
    if (scroller && scroller.current) {
      scrollToBottom();
    }
    console.log(scroller,"scroll top");
  }, [messages]);

  // useEffect(()=>{
  //   if(scroller && scroller.current)
  //   {
  //     scroller.current.addEventListener("scroll", handleScroll, false);
  //   }
  //   return ()=>{
  //     scroller?.current?.removeEventListener("scroll", handleScroll, false);
  //   }
  // },[showChat])

  const handleSelectChatRoom = (chatRoomName, first_name, last_name) => {
    if (chatRoomName !== currentChatRoom) {
      setChatLoader(true);
    }
    getSelectedChatRoom(chatRoomName, page, messagesPerPage)
      .then((res) => {
        setTotalMessageCount(res?.data?.data?.count);
        setShowChat(true);
        const tempMessages = [...res?.data?.data?.results?.chat_messages]
          .reverse()
          .map((elem) => elem);
        setMessages(tempMessages);
        setSenderName({ firstName: first_name, lastName: last_name });
        setCurrentChatRoom(chatRoomName);
        setChatLoader(false);
      })
      .catch((err) => {
        setChatLoader(false);
        console.log(err);
      });
  };
  const scrollToBottom = () => {
    scroller.current.scrollTop = scroller.current.scrollHeight;
  };
  const sendMessage = () => {
    setSendingMsgLoader(true);
    if (messageInput !== "") {
      setMessages([
        ...messages,
        { message: messageInput, sender: currentUser },
      ]);
      socket.current.send(JSON.stringify({ message: messageInput }));
      setMessageInput("");
      // adding last message  and current time to the chatroom
      const index = chatRooms?.findIndex((curElem) => {
        return curElem.name === currentChatRoom;
      });
      if (index >= 0) {
        const tempChatRoom = [...chatRooms];
        tempChatRoom[index].last_message[0].last_message.message = messageInput;
        tempChatRoom[index].last_message[0].last_message.timestamp = new Date();
        setChatRooms(tempChatRoom);
        setOriginalChatRooms(tempChatRoom);
      }
    }
    setSendingMsgLoader(false);
  };

  const handleScroll = () => {
    if (scroller.current.scrollTop == 0) {
      const totalPages = Math.round(totalMessageCount / messagesPerPage);
      if (page < totalPages) {
        setPage((prev) => prev + 1);
        setChatLoader(true);
        getSelectedChatRoom(currentChatRoom, page)
          .then((res) => {
            const tempMessages = [...res?.data?.data?.results?.chat_messages]
              .reverse()
              .map((elem) => elem);
            setMessages([...tempMessages, ...messages]);
            setChatLoader(false);
          })
          .catch((err) => {
            console.log(err);
            setChatLoader(false);
          });
      }
    }
  };
  const handleTime = (index) => {
    let difference;
    if (index > 0) {
      const startTime = messages[index - 1].timestamp;
      const endTime = messages[index].timestamp;
      difference = moment
        .utc(moment(endTime, "hh:mm a").diff(moment(startTime, "hh:mm a")))
        .format("mm");
    }
    if (difference > 10 || index === 0) {
      return true;
    }
  };

  const handleSearch = (searchTxt) => {
    setSearchText(searchTxt);
    if (searchTxt.length === 0) {
      setChatRooms(originalChatRooms);
    } else {
      const filteredChatRoom = originalChatRooms.filter((chat) =>
        chat?.reciever_data?.first_name
          ?.toLowerCase()
          .includes(
            searchTxt.toLowerCase() ||
              chat?.reciever_data?.last_name
                ?.toLowerCase()
                .includes(searchTxt.toLowerCase())
          )
      );
      setChatRooms(filteredChatRoom);
    }
  };
  return (
    <>
      {pageloader && <PageLoader />}
      <div className="row">
        <div
          className={`${
            seekerPage ? "col-xxl-3 col-lg-4 mb-2" : "col-xxl-4 col-lg-5 mb-2"
          } col-12`}
        >
          <div className="chat-list-sec border">
            <h5>Messages</h5>
            <div className="chat-lists">
              {!seekerPage && (
                <div className="fieldset custom-search">
                  <input
                    type="text"
                    name=""
                    placeholder="Search by name"
                    className="form-control input-icon search-field"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <span className="input-field-icon">
                    <img src="../assets/images/search-icon.svg" />
                  </span>
                </div>
              )}
              {/* chat room section */}
              {chatRooms.length > 0
                ? chatRooms?.map((curChatRoom) => (
                    <MessageCard
                      isSelected={curChatRoom.name === currentChatRoom}
                      key={curChatRoom.id}
                      first_name={curChatRoom?.reciever_data?.first_name}
                      last_name={curChatRoom?.reciever_data?.last_name}
                      last_message={
                        curChatRoom?.last_message[
                          curChatRoom.last_message.length - 1
                        ]?.last_message?.message
                      }
                      timestamp={
                        curChatRoom?.last_message[
                          curChatRoom.last_message.length - 1
                        ]?.last_message?.timestamp
                      }
                      messageCount={curChatRoom?.last_message?.length}
                      handleSelectChatRoom={handleSelectChatRoom}
                      chatName={curChatRoom?.name}
                      setSenderName={setSenderName}
                      active={showChat}
                    />
                  ))
                : "No chat started yet"}
              {/* chat room section */}
            </div>
          </div>
        </div>
        <div
          className={`${
            seekerPage ? "col-xxl-9 col-lg-8 mb-2" : "col-xxl-8 col-lg-7 mb-2"
          } col-12`}
        >
          {chatRooms.length > 0 ? (
            <div className="chatBox border">
              <div className="applicant-info-col px-3 border-bottom">
                <div className="applicant-thumb">
                  <img src="../assets/images/user-profile.svg" />
                </div>
                <div className="applicant-info">
                  {!seekerPage ? (
                    <>
                      <h6>
                        {senderName.firstName} {senderName.lastName}
                      </h6>
                    </>
                  ) : (
                    <>
                      <h6>
                        {senderName.firstName} {senderName.lastName}
                        <span>
                          4.5 <i className="fas fa-star"></i>
                        </span>
                      </h6>
                      <ul>
                        <li>Web Developer</li>
                        <li>2 year of exp</li>
                        <li>Full-time</li>
                        <li>Remote</li>
                      </ul>{" "}
                    </>
                  )}
                </div>
              </div>
              {/* chat section starts here */}
              {showChat && (
                <div className="chat-container">
                  <div className="chat-messages " ref={scroller}>
                    <div className="chat-inner-message">
                      {chatLoader && (
                        <div className="loaderCenter">
                          {" "}
                          <ButtonLoader2 />
                        </div>
                      )}
                      {messages?.map((message, index) => (
                        <Fragment key={index}>
                          {message.sender == currentUser ? (
                            <div className="messageBox text-end">
                              <div className="chatBot d-flex justify-content-end">
                                <div className="ChatbotMesgg">
                                  <div
                                    key={index}
                                    className="message right bg-black text-white text-start d-inline-block"
                                  >
                                    {message.message}
                                  </div>
                                  {handleTime(index) && (
                                    <span className="d-block">
                                      {moment(message.timestamp).format(
                                        "hh:mm a"
                                      )}
                                    </span>
                                  )}
                                </div>
                                <div className="chat-lists-icon">
                                  <img src="../assets/images/user-profile.svg" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="messageBox text-start">
                              <div className="chatBot d-flex">
                                <div className="chat-lists-icon">
                                  <b>{senderName.firstName[0]}</b>
                                </div>
                                <div className="ChatbotMesgg">
                                  <div
                                    key={index}
                                    className="message left text-start d-inline-block"
                                  >
                                    {message.message}
                                  </div>
                                  <span className="d-block">
                                    {handleTime(index) &&
                                      moment(message.timestamp).format(
                                        "hh:mm a"
                                      )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  {sendingMsgLoader && (
                    <div className="sendingMessageLoader text-end p-3">
                      ...Sending
                    </div>
                  )}
                  <div className="chat-input">
                    <div className="input w-100 pe-4">
                      <input
                        type="text"
                        className="w-100"
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendMessage();
                          }
                        }}
                      />
                    </div>
                    <div className="sendButton" onClick={sendMessage}>
                      <img src="/assets/images/send.svg" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>No chat started yet</div>
          )}
        </div>
      </div>
    </>
  );
};
export default MessageSection;
