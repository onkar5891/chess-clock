import React from "react"
import { NotificationContent } from "../types/NotificationContent";

interface Props {
  content: NotificationContent
}
const AppNotification = (props: Props) => {
  const colorMap = new Map([["info", "green"], ["error", "red"]]);

  return (
    <div style={{ margin: "2rem", color: colorMap.get(props.content.type), fontSize: "2rem"}}>
      <p>{props.content.message}</p>
    </div>
  )
}

export default AppNotification