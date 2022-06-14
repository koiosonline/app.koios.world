import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FindCourseDetail } from "./useWorldDetail";
import courseInfo from "../../assets/data/Worlds.json";
import { Slugify } from "../../components/Util/Slugify";
import { SingleVideo } from "../../types/Courses/SingleVideo";
import { CourseContentParams, CourseDetailParams, VideoSlugParams } from "../../types/Params";
import { getLiterature, getVideoInfo } from "../../api/Api";
import TabInfo from "../../components/TabInfo";
import useQuiz from "../../components/quiz/useQuiz";
import Quiz from "../../components/quiz/Quiz";
import Loading from "../../components/Loading";
import { HashLink } from "react-router-hash-link";
import { Markdown } from "../../components/Markdown";
import { ArticlePageLinks } from "../../components/ArticlePageLinks";
import { compiler } from "markdown-to-jsx";
import { ContentPlayer } from "../../components/ContentPlayer";
import { hasHomework } from "../../components/Util/Assignment";
import { Icon } from "../../components/Util/Icon";

export const WorldDetail = () => {
  const [videoContent, setVideoContent] = useState<SingleVideo>();
  const { worldContent } = useParams<CourseContentParams>();
  const { worldDetail } = useParams<CourseDetailParams>();
  const { videoSlug } = useParams<VideoSlugParams>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courseData, setCourseData] = useState<any[]>();
  const [literatureOfVideo, setliteratureOfVideo] = useState<string>();
  const [videoHasHomework, setVideoHasHomework] = useState<boolean>();
  const [videoList, setVideoList] = useState<any[]>();
  const [extraInfo, setExtraInfo] = useState<any[]>();
  const [quizState, setQuizState] = useState<boolean>(false);
  const [previousVideo, setPreviousVideo] = useState<string>();
  const [nextVideo, setNextVideo] = useState<string>();
  const [tableOfContents, setTableOfContents] = useState<any[]>([]);
  const history = useHistory();

  const showFirstVideo = (firstVideo: string) => {
    history.replace(
      `${worldDetail}/${Slugify(firstVideo, {
        lowerCase: true,
        replaceAmpersand: "and",
      })}`
    );
  };

  const getPreviousAndNextVideo = () => {
    const videoListWithoutChapters = videoList?.filter((item) => !item.chapter);
    const videoTitles = videoListWithoutChapters?.map((video) => video.title);
    const currentVideo = videoContent?.title;
    const currentVideoIndex = videoTitles?.indexOf(currentVideo);
    if (videoList) {
      setPreviousVideo(videoTitles[currentVideoIndex - 1]);
      setNextVideo(videoTitles[currentVideoIndex + 1]);
    }
  };

  const course = courseInfo.find(
    (item) => Slugify(item.url, { lowerCase: true, replaceAmpersand: "and" }) === worldContent
  );

  const courseLevel = course.content.find(
    (item) => Slugify(item.title, { lowerCase: true, replaceAmpersand: "and" }) === worldDetail
  );

  const data = async () => {
    setIsLoading(true);
    const d = await FindCourseDetail(videoSlug, courseLevel.videoInfo);
    videoSlug ? setVideoContent(d) : showFirstVideo(d.title);
    const getVideoList = await getVideoInfo(courseLevel.videoInfo);
    setExtraInfo(getVideoList.literature);
    setVideoList(getVideoList.videos);
    const literature = await getLiterature({
      world: worldContent,
      worldLevel: worldDetail,
      article: videoSlug?.replace("#", "") + ".md",
    });
    setliteratureOfVideo(literature);
    const getCourseData = await getVideoInfo(courseLevel.data);
    setCourseData(getCourseData);
    setVideoHasHomework(hasHomework(literature));
    setIsLoading(false);
  };

  const getCourseId = () => {
    const courseId = videoContent.title;
    const splitted = courseId.split(" ");
    return splitted[0];
  };

  const filterDataById = () => {
    const all = courseData.filter((item) => getCourseId() === item.chapter);
    const addedInfo = extraInfo.filter((item) => getCourseId() === item.chapter);
    const allFilter = courseData.filter((item) => "*" === item.chapter);
    const merged = allFilter.concat(all, addedInfo);
    const unique = merged.filter((v, i, a) => a.findIndex((t) => t.title === v.title && t.url === v.url) === i);
    const withoutPng = unique.filter((item) => !item.png);
    if (withoutPng.length === 0) {
      return false;
    } else {
      return withoutPng;
    }
  };

  const onlyUrl = () => {
    const data = filterDataById();
    if (typeof data !== "boolean") {
      return data.filter((item) => item.url);
    }
  };

  const onlyLiterature = () => {
    const data = filterDataById();
    if (typeof data !== "boolean") {
      return data.filter((item) => item.cid);
    }
  };

  const quiz = useQuiz();

  const openQuiz = () => {
    setQuizState(!quizState);
  };

  const generateTableOfContents = async () => {
    const compiledMarkdown = compiler(`${literatureOfVideo}`, {
      forceBlock: true,
    });
    const filterHeadings = compiledMarkdown.props.children.filter(
      (item) =>
        item.type === "h1" ||
        item.type === "h2" ||
        item.type === "h3" ||
        item.type === "h4" ||
        item.type === "h5" ||
        item.type === "h6"
    );
    const headings = filterHeadings.map((item) => {
      return {
        id: item.props.id,
        title: item.props.children[0],
        type: item.type,
      };
    });
    setTableOfContents(headings);
  };

  useEffect(() => {
    generateTableOfContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [literatureOfVideo]);

  useEffect(() => {
    getPreviousAndNextVideo();
  });

  useEffect(() => {
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSlug, worldDetail]);

  useEffect(() => {
    const target = document.getElementById("#" + videoSlug);
    if (target) {
      target.scrollIntoView({ block: "center", inline: "end" });
    }
  });

  return (
    <div className={"container"}>
      <div className="world-detail">
        {isLoading ? (
          <Loading />
        ) : (
          videoContent && (
            <>
              <ContentPlayer
                worldContent={worldContent}
                worldDetail={worldDetail}
                videoSlug={videoSlug}
                videoContent={videoContent}
                videoList={videoList}
              />
              <div className={"cta-button-container"}>
                <a
                  href="https://c0c6pmb4lmw.typeform.com/FeedbackButton"
                  className={"cta-button"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="cta-button__img cta-button__img--emoji">&#128176;</span>
                  <p className="cta-button__text">Feedback</p>
                </a>

                {quiz && (
                  <button onClick={openQuiz} className={"cta-button"}>
                    <img className="cta-button__img" src={"/images/scroll-solid.svg"} alt={"sheets"} />
                    <p className="cta-button__text">Quiz</p>
                  </button>
                )}

                {videoHasHomework && (
                  <button onClick={()=>document.getElementById(
                    tableOfContents.find(c=>c.title.includes("Portfolio assignment"))?.id
                  )?.scrollIntoView()} 
                  className={"cta-button"}>
                    <Icon type="file-word" className="cta-button__img" />
                    <p className="cta-button__text">Homework</p>
                  </button>
                )}
              </div>

              {quizState && <Quiz quizData={quiz} modalState={openQuiz} />}

              <section className="content">
                <div className="literature">
                  <article className="article">
                    {literatureOfVideo ? (
                      <Markdown value={literatureOfVideo} />
                    ) : (
                      <>
                        <h2>{videoContent.title}</h2>
                        <p>{videoContent.description.replace(/___(.*?)___/g, "")}</p>
                      </>
                    )}
                  </article>

                  <ArticlePageLinks
                    pathname={"/worlds/" + worldContent + "/" + worldDetail}
                    previousVideo={previousVideo ? previousVideo : null}
                    nextVideo={nextVideo ? nextVideo : null}
                  />
                </div>

                <div className="table-of-contents">
                  {literatureOfVideo ? (
                    <>
                      <h2 className="table-of-contents__title">Table of contents</h2>
                      {tableOfContents && (
                        <ul className="table-of-contents__list">
                          {tableOfContents.map((item, index) => (
                            <li
                              key={index}
                              className={`table-of-contents__list-item table-of-contents__list-item--${item.type}`}
                            >
                              <HashLink to={`#${item.id}`} className="table-of-contents__link link">
                                {item.title}
                              </HashLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    courseData &&
                    filterDataById() && <TabInfo allLinks={filterDataById} urls={onlyUrl} literature={onlyLiterature} />
                  )}
                </div>
              </section>
            </>
          )
        )}
      </div>
    </div>
  );
};
