import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
type Props = {
  img: string;
  title: string;
  description: string;
  collapse?: boolean;
};
const NotificationComponent = ({
  img = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  title,
  description,
  collapse = false,
}: Props) => {
  return (
    <Card
      style={{ width: "auto" }}
      className="mb-4"
      cover={
        collapse && <img alt="example" src={img} style={{ height: 200 }} />
      }
    >
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={title}
        description={description}
      />
    </Card>
  );
};

export default NotificationComponent;
