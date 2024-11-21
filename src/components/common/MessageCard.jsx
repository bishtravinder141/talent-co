import moment from "moment";
import React from "react";

const MessageCard = ({
  first_name,
  last_name,
  last_message,
  timestamp,
  messageFrom,
  active,
  messageCount,
  chatName,
  handleSelectChatRoom,
isSelected 
}) => {
  return (
    <div
      class={` ${active ? "active" : ""} chat-lists-col ${!isSelected?"bg-light":""}`}
      onClick={() => {
        handleSelectChatRoom(chatName,first_name,last_name);
      }}
    >
      <div class="chat-lists-icon">
        <img src="../assets/images/user-profile.svg" />
      </div>
      <div class="chat-lists-content">
        <h6>
          {first_name} {last_name}{" "}
        </h6>
        <p>{last_message}</p>
      </div>
      <div class="chat-time">{moment(timestamp).format("hh:mm a")}</div>
      {/* {!active && <div class="message-notification">{messageCount}</div>} */}
    </div>
  );
};

export default MessageCard;