import React from "react";
type Props = {
  name?: string;
  onClick: () => void;
};
export default function DrawerItem({
  name = "Item",
  onClick = () => {},
}: Props) {
  return (
    <button className="w-full p-8" onClick={onClick}>
      <div>{name}</div>
    </button>
  );
}
