// components/RichTextRenderer.tsx
import React from "react";

interface RichTextChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

interface RichTextRendererProps {
  content: RichTextBlock[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const renderText = (child: RichTextChild, index: number) => {
    let element = <span key={index}>{child.text}</span>;

    if (child.bold) {
      element = <strong key={index}>{element}</strong>;
    }

    if (child.italic) {
      element = <em key={index}>{element}</em>;
    }

    if (child.underline) {
      element = <u key={index}>{element}</u>;
    }

    return element;
  };

  const renderBlock = (block: RichTextBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index}>
            {block.children.map((child, i) => renderText(child, i))}
          </p>
        );
      // You can add more cases for headings, lists, etc.
      default:
        return null;
    }
  };

  return <div>{content.map((block, index) => renderBlock(block, index))}</div>;
};

export default RichTextRenderer;
