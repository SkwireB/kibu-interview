import React from "react";

export interface Note {
  id: number;
  member: number;
  text: string;
}

export function NoteComponent({ note }: { note: Note }) {
  const lineClampStyle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    marginLeft: 20,
    marginRight: 20,
  };

  const overflowStyle: React.CSSProperties = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
  };

  const combinedStyles: React.CSSProperties = {
    ...lineClampStyle,
    ...overflowStyle,
  };

  return (
    <div>
      <div style={combinedStyles}>{note.text}</div>
    </div>
  );
}