import { Slugify } from "./Util/Slugify";
import { Icon } from "./Util/Icon";

type ArticlePageLinksProps = {
  pathname: string;
  previousVideo?: string;
  nextVideo?: string;
};

export const ArticlePageLinks = (props: ArticlePageLinksProps) => {
  return (
    <div className="nav-page-links">
      {props.previousVideo && (
        <a
          className={`page-link page-link__previous ${!props.nextVideo ? "page-link--full-width" : ""}`}
          href={`#${props.pathname}/${Slugify(props.previousVideo, {
            lowerCase: true,
            replaceDot: "-",
            replaceAmpersand: "and",
          })}`}
        >
          <Icon type="arrow-left"/>
          <div className="page-link-text">
            <span className="page-link-text__sub-title">Previous</span>
            <span className="page-link-text__video-title">{`${props.previousVideo.split(" ")[0]}`}</span>
          </div>
        </a>
      )}

      {props.nextVideo && (
        <a
          className={`page-link ${!props.previousVideo ? "page-link--full-width" : ""}`}
          href={`#${props.pathname}/${Slugify(props.nextVideo, {
            lowerCase: true,
            replaceDot: "-",
            replaceAmpersand: "and",
          })}`}
        >
          <div className="page-link-text">
            <span className="page-link-text__sub-title">Next</span>
            <span className="page-link-text__video-title">{`${props.nextVideo.split(" ")[0]}`}</span>
          </div>
          <Icon type="arrow-right" className="page-link-icon" />
        </a>
      )}
    </div>
  );
};
