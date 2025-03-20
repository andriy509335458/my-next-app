import React, { useEffect } from "react";

export default function Dropdown({
  headerText,
  dropdownContent,
}: {
  headerText: string;
  dropdownContent: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const header = (
    <div onClick={() => setIsOpen(!isOpen)} style={{ userSelect: "none" }}>
      <div>{headerText}</div>
    </div>
  );

  if (isOpen) {
    return (
      <div className="z-50" ref={dropdownRef} onClick={() => setIsOpen(false)}>
        {header}
        {dropdownContent}
      </div>
    );
  } else {
    return <div>{header}</div>;
  }
}
