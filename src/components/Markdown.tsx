import React from "react";
import MarkdownToJsx from "markdown-to-jsx";
import { Icon } from "./Util/Icon";

type MarkdownProps = {
  value: string;
};

const OpenLinkInNewTab = ({ href, children }) => (
  <a href={href} rel="noreferrer" target="_blank">
    <Icon type="arrow-right" />
    <span>{children}</span>
  </a>
);

const ResponsiveIframe = ({ src, title }) => (
  <div className="responsive-iframe-container">
    <iframe
      className="responsive-iframe"
      src={src}
      title={title}
      aria-hidden="true"
    />
  </div>
);

const markDownToJsxOptions = {
  forceBlock: true,
  wrapper: React.Fragment,
  overrides: {
    a: OpenLinkInNewTab,
    iframe: ResponsiveIframe,
  },
};

export const Markdown = (props: MarkdownProps) => {
  return (
    <div className="markdown">
      <MarkdownToJsx options={markDownToJsxOptions}>
        {props.value}
      </MarkdownToJsx>
    </div>
  );
};