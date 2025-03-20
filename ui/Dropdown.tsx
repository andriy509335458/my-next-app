import React from "react";

export default function Dropdown({
  dropdownContent,
}: {
  dropdownContent: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const header = (
    <div onClick={() => setIsOpen(!isOpen)}>
      <div>Header</div>
    </div>
  );

  if (isOpen) {
    return (
      <div>
        {header}
        {dropdownContent}
      </div>
    );
  } else {
    return <div className="z-50">{header}</div>;
  }
}
