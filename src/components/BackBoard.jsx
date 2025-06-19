import { useEffect, useState, createContext } from "react";
import "./BackBoard.css";

import BackPostList from "./BackPostList";
import { useNavigate } from "react-router-dom";
// props: id, title, createDate, content, tag
export const BackBoardDispatchContext = createContext();
const BackBoard = () => {

  // postContent
  const postMockData = [
    { id: 1, title: '첫 번째 게시물', createDate: new Date("2023-01-15").getTime(), tag: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', content: '이것은 블로그의 첫 번째 게시물입니다. 리액트의 기본 개념과 컴포넌트 구조에 대해 다룹니다. 앞으로 다양한 웹 개발 주제를 함께 탐구해 나갈 예정이니 많은 기대 부탁드립니다.' },
    { id: 2, title: 'Redux를 이용한 상태 관리', createDate: new Date("2023-02-01").getTime(), tag: '리덕스', content: '리액트 애플리케이션에서 복잡한 상태를 효율적으로 관리하기 위한 Redux의 기본적인 사용법과 핵심 원리들을 설명합니다. 액션, 리듀서, 스토어의 개념을 자세히 알아보세요.' },
    { id: 3, title: 'JavaScript 비동기 처리 이해하기', createDate: new Date("2023-02-20").getTime(), tag: '자바스크립트', content: '자바스크립트의 비동기 처리는 웹 개발에서 필수적인 요소입니다. 콜백, Promise, async/await을 통해 비동기 코드를 어떻게 작성하고 관리하는지 쉽게 설명해 드립니다.' },
    { id: 4, title: 'CSS Grid 완벽 가이드', createDate: new Date("2023-03-05").getTime(), tag: 'CSS', content: '복잡한 레이아웃을 만들 때 CSS Grid는 강력한 도구입니다. Grid 컨테이너와 아이템의 속성들을 깊이 있게 다루고, 실제 예제를 통해 활용법을 익혀보세요.' },
    { id: 5, title: 'React Hooks 심층 분석', createDate: new Date("2023-03-18").getTime(), tag: '리액트', content: 'React Hooks는 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해줍니다. useState, useEffect, useContext 등 주요 훅의 동작 원리와 사용 패턴을 상세히 알아봅니다.' },
    { id: 6, title: 'Node.js로 REST API 구축하기', createDate: new Date("2023-04-02").getTime(), tag: '노드js', content: 'Node.js와 Express 프레임워크를 활용하여 간단하면서도 강력한 RESTful API를 설계하고 구축하는 과정을 단계별로 안내합니다. 데이터베이스 연동까지 실습해보세요.' },
    { id: 7, title: 'TypeScript 시작하기', createDate: new Date("2023-04-15").getTime(), tag: '타입스크립트', content: '자바스크립트에 타입을 부여하여 안정성을 높이는 TypeScript의 기본적인 문법과 환경 설정 방법을 소개합니다. 더 견고한 코드를 작성하는 첫걸음을 떼어보세요.' },
    { id: 8, title: 'Next.js로 SSR 애플리케이션 개발', createDate: new Date("2023-05-01").getTime(), tag: '넥스트js', content: 'Next.js는 React 기반의 SSR(서버 사이드 렌더링) 프레임워크입니다. SEO와 성능 최적화에 유리한 Next.js로 웹 애플리케이션을 개발하는 방법을 알아봅니다.' },
    { id: 9, title: '웹 접근성 기본 원칙', createDate: new Date("2023-05-10").getTime(), tag: '웹접근성', content: '모든 사용자가 웹 콘텐츠에 동등하게 접근할 수 있도록 하는 웹 접근성의 중요성과 기본 원칙들을 설명합니다. Semantic HTML, ARIA 속성 등을 다룹니다.' },
    { id: 10, title: 'Git으로 협업하기', createDate: new Date("2023-05-25").getTime(), tag: 'Git', content: 'Git은 협업을 위한 필수 도구입니다. 브랜치 전략, Pull Request, 충돌 해결 등 Git을 활용한 효율적인 협업 워크플로우를 익혀보세요.' },
    { id: 11, title: 'Vue.js와 React 비교', createDate: new Date("2023-06-01").getTime(), tag: '뷰js', content: '프론트엔드 개발에서 양대 산맥인 Vue.js와 React의 특징, 장단점을 비교 분석합니다. 프로젝트 특성과 개발자의 선호도에 따른 선택 가이드를 제공합니다.' },
    { id: 12, title: 'MobX를 이용한 상태 관리', createDate: new Date("2023-06-10").getTime(), tag: 'MobX', content: 'Redux와는 다른 관점에서 상태 관리를 제공하는 MobX의 핵심 개념과 사용법을 소개합니다. 옵저버블, 액션, 리액션 등의 개념을 이해하고 적용해보세요.' },
    { id: 13, title: 'GraphQL 첫걸음', createDate: new Date("2023-06-25").getTime(), tag: 'GraphQL', content: 'API 설계의 새로운 패러다임을 제시하는 GraphQL의 기본 개념과 REST API와의 차이점을 알아봅니다. 쿼리, 뮤테이션, 스키마 등 GraphQL의 핵심 요소를 다룹니다.' },
    { id: 14, title: 'Webpack 설정 가이드', createDate: new Date("2023-07-01").getTime(), tag: 'Webpack', content: '모던 자바스크립트 애플리케이션 개발에 필수적인 모듈 번들러 Webpack의 설정 방법을 상세히 안내합니다. 로더, 플러그인, 개발 서버 설정 등을 익혀보세요.' },
    { id: 15, title: 'Styled-Components 활용 팁', createDate: new Date("2023-07-15").getTime(), tag: 'Styled-Components', content: 'CSS-in-JS 라이브러리인 Styled-Components를 사용하여 컴포넌트 기반으로 스타일을 작성하는 다양한 팁과 모범 사례를 소개합니다. 테마, 동적 스타일링 등을 다룹니다.' },
    { id: 16, title: 'React Query로 데이터 페칭', createDate: new Date("2023-07-28").getTime(), tag: 'React Query', content: 'React 애플리케이션에서 서버 상태를 효율적으로 관리해주는 React Query의 기본 사용법과 캐싱, 비동기 데이터 관리 전략을 알아봅니다. 데이터 페칭을 더 쉽게 만드세요.' },
    { id: 17, title: '프론트엔드 성능 최적화', createDate: new Date("2023-08-05").getTime(), tag: '성능 최적화', content: '사용자 경험을 향상시키기 위한 프론트엔드 성능 최적화 기법들을 다룹니다. 코드 스플리팅, 이미지 최적화, 렌더링 최적화 등 다양한 방법을 배워보세요.' },
    { id: 18, title: '테스트 코드 작성의 중요성', createDate: new Date("2023-08-18").getTime(), tag: '테스트', content: '안정적이고 유지보수하기 쉬운 애플리케이션을 위한 테스트 코드의 중요성을 강조합니다. 단위 테스트, 통합 테스트, E2E 테스트의 개념과 작성 방법을 소개합니다.' },
    { id: 19, title: 'Electron으로 데스크탑 앱 만들기', createDate: new Date("2023-09-01").getTime(), tag: 'Electron', content: '웹 기술(HTML, CSS, JavaScript)을 활용하여 크로스 플랫폼 데스크탑 애플리케이션을 개발하는 Electron의 기본 개념과 프로젝트 설정 방법을 알아봅니다.' },
    { id: 20, title: 'WebRTC를 이용한 실시간 통신', createDate: new Date("2023-09-15").getTime(), tag: 'WebRTC', content: '웹 브라우저 간 실시간 음성, 영상 통신 및 데이터 공유를 가능하게 하는 WebRTC의 핵심 기술과 구현 원리를 설명합니다. 화상 채팅 앱 예제를 다룹니다.' },
    { id: 21, title: 'Service Worker와 PWA', createDate: new Date("2023-09-28").getTime(), tag: 'PWA', content: '오프라인 지원, 푸시 알림 등 네이티브 앱과 유사한 경험을 제공하는 PWA(Progressive Web App)와 핵심 기술인 Service Worker에 대해 알아봅니다.' },
    { id: 22, title: 'WebSocket으로 채팅 앱 구현', createDate: new Date("2023-10-05").getTime(), tag: 'WebSocket', content: '클라이언트와 서버 간의 양방향 실시간 통신을 가능하게 하는 WebSocket을 사용하여 간단한 채팅 애플리케이션을 구현하는 과정을 단계별로 설명합니다.' },
    { id: 23, title: 'Three.js로 3D 웹 만들기', createDate: new Date("2023-10-18").getTime(), tag: 'Three.js', content: '웹 브라우저에서 3D 그래픽을 쉽게 구현할 수 있도록 돕는 Three.js 라이브러리의 기본 사용법과 카메라, 씬, 렌더러 설정 방법을 배워봅니다.' },
    { id: 24, title: 'D3.js로 데이터 시각화', createDate: new Date("2023-11-01").getTime(), tag: 'D3.js', content: '복잡한 데이터를 아름답고 인터랙티브한 시각화로 표현하는 D3.js의 강력한 기능을 소개합니다. 다양한 차트와 그래프를 만드는 예제를 다룹니다.' },
    { id: 25, title: 'Jest로 React 컴포넌트 테스트', createDate: new Date("2023-11-15").getTime(), tag: 'Jest', content: 'React 애플리케이션에서 컴포넌트의 동작을 효과적으로 검증하기 위한 Jest와 React Testing Library를 사용한 테스트 코드 작성 방법을 알아봅니다.' },
    { id: 26, title: 'Storybook으로 UI 개발', createDate: new Date("2023-11-28").getTime(), tag: 'Storybook', content: '컴포넌트 기반 UI 개발을 위한 Storybook의 활용법을 소개합니다. 독립적인 환경에서 컴포넌트를 개발하고 문서화하는 방법을 익혀보세요.' },
    { id: 27, title: 'Lighthouse로 웹 성능 분석', createDate: new Date("2023-12-05").getTime(), tag: 'Lighthouse', content: '웹 애플리케이션의 성능, 접근성, SEO 등을 진단하는 Google Lighthouse 도구의 사용법과 분석 결과 해석 방법을 배워봅니다. 웹사이트 개선에 활용하세요.' },
    { id: 28, title: 'RxJS를 이용한 반응형 프로그래밍', createDate: new Date("2023-12-18").getTime(), tag: 'RxJS', content: '비동기 이벤트 스트림을 처리하는 강력한 라이브러리 RxJS의 기본 개념과 옵저버블, 연산자를 활용한 반응형 프로그래밍 패턴을 소개합니다.' },
    { id: 29, title: 'Figma로 UI/UX 디자인', createDate: new Date("2024-01-01").getTime(), tag: 'Figma', content: '웹 및 모바일 UI/UX 디자인을 위한 협업 도구 Figma의 기본적인 사용법과 주요 기능들을 설명합니다. 컴포넌트, 프로토타입 등을 활용하는 방법을 배워보세요.' },
    { id: 30, title: 'SEO 기본과 웹 개발', createDate: new Date("2024-01-15").getTime(), tag: 'SEO', content: '검색 엔진 최적화(SEO)의 기본 원칙과 웹 개발 시 고려해야 할 사항들을 다룹니다. 메타 태그, 시맨틱 마크업, 사이트맵 등의 중요성을 알아봅니다.' },
    { id: 31, title: 'CRA 없이 React 프로젝트 설정', createDate: new Date("2024-01-28").getTime(), tag: null, content: 'Create React App 없이 Webpack과 Babel을 사용하여 처음부터 React 프로젝트를 직접 설정하는 방법을 단계별로 안내합니다. 빌드 프로세스를 이해하는 데 도움이 됩니다.' },
    { id: 32, title: '새로운 JavaScript 문법 (ES2023)', createDate: new Date("2024-02-05").getTime(), tag: 'ES2023', content: '최신 ECMAScript(ES2023)에 도입된 새로운 자바스크립트 문법과 기능들을 소개합니다. 개발 생산성을 높이는 새로운 기능들을 빠르게 익혀보세요.' },
    { id: 33, title: 'Docker로 개발 환경 구축', createDate: new Date("2024-02-18").getTime(), tag: 'Docker', content: '개발 환경을 컨테이너화하여 일관성과 효율성을 높이는 Docker의 기본 개념과 사용법을 알아봅니다. Dockerfile 작성부터 이미지 빌드까지 실습해봅니다.' },
    { id: 34, title: 'SSR과 CSR의 차이점', createDate: new Date("2024-03-01").getTime(), tag: null, content: '서버 사이드 렌더링(SSR)과 클라이언트 사이드 렌더링(CSR)의 주요 차이점과 각각의 장단점을 비교 분석합니다. 프로젝트에 적합한 렌더링 방식을 선택하는 데 도움을 드립니다.' },
    { id: 35, title: '웹 애니메이션 기법', createDate: new Date("2024-03-10").getTime(), tag: '애니메이션', content: '사용자 경험을 풍부하게 하는 다양한 웹 애니메이션 기법들을 소개합니다. CSS 애니메이션, JavaScript 애니메이션 라이브러리(GSAP 등) 활용법을 다룹니다.' },
    { id: 36, title: '웹 컴포넌트 마스터하기', createDate: new Date("2024-03-25").getTime(), tag: '웹 컴포넌트', content: '재사용 가능한 커스텀 요소를 만들 수 있게 해주는 웹 컴포넌트의 핵심 기술(Custom Elements, Shadow DOM, HTML Templates)을 깊이 있게 다룹니다.' },
    { id: 37, title: '모바일 웹 성능 최적화', createDate: new Date("2024-04-03").getTime(), tag: '성능 최적화', content: '모바일 환경에서 웹 애플리케이션의 성능을 극대화하기 위한 최적화 전략을 다룹니다. 반응형 디자인, 터치 이벤트, 네트워크 최적화 등을 알아봅니다.' },
    { id: 38, title: 'Tailwind CSS 시작하기', createDate: new Date("2024-04-16").getTime(), tag: 'CSS', content: '유틸리티 우선 CSS 프레임워크인 Tailwind CSS의 기본 사용법과 설정 방법을 소개합니다. 빠르게 반응형 디자인을 구축하는 효율적인 방법을 배워보세요.' },
    { id: 39, title: 'Gatsby.js로 정적 사이트 생성', createDate: new Date("2024-04-29").getTime(), tag: 'Gatsby.js', content: 'React 기반의 정적 사이트 생성기 Gatsby.js를 사용하여 빠르고 SEO에 친화적인 웹사이트를 구축하는 방법을 알아봅니다. GraphQL로 데이터를 가져오는 예제를 다룹니다.' },
    { id: 40, title: 'CI/CD 파이프라인 구축', createDate: new Date("2024-05-10").getTime(), tag: null, content: '지속적 통합(CI)과 지속적 배포(CD) 파이프라인을 구축하여 소프트웨어 개발 과정을 자동화하고 효율성을 높이는 방법을 설명합니다. Jenkins, GitHub Actions 등을 활용합니다.' },
    { id: 41, title: '클라우드 서비스 활용 (AWS)', createDate: new Date("2024-05-22").getTime(), tag: '클라우드', content: '아마존 웹 서비스(AWS)의 주요 서비스들을 활용하여 웹 애플리케이션을 배포하고 관리하는 방법을 소개합니다. EC2, S3, Amplify 등의 서비스를 다룹니다.' },
    { id: 42, title: 'Micro-frontend 아키텍처', createDate: new Date("2024-06-05").getTime(), tag: '아키텍처', content: '대규모 프론트엔드 프로젝트를 여러 개의 작은 독립적인 앱으로 분리하는 Micro-frontend 아키텍처의 개념과 장단점, 구현 전략을 알아봅니다.' },
    { id: 43, title: '웹 보안 기본 지식', createDate: new Date("2024-06-18").getTime(), tag: '보안', content: '웹 애플리케이션을 안전하게 보호하기 위한 기본적인 웹 보안 취약점(XSS, CSRF 등)과 이를 방어하는 방법에 대해 알아봅니다. 안전한 코드를 작성하는 것이 중요합니다.' },
    { id: 44, title: 'WebAssembly 소개', createDate: new Date("2024-07-01").getTime(), tag: 'WebAssembly', content: '고성능 웹 애플리케이션을 위한 바이너리 포맷인 WebAssembly의 기본 개념과 JavaScript와의 상호작용, 활용 사례를 소개합니다. 웹의 가능성을 확장하는 기술입니다.' },
    { id: 45, title: 'Canvas API로 그래픽 그리기', createDate: new Date("2024-07-14").getTime(), tag: 'Canvas', content: 'HTML5 Canvas API를 사용하여 웹 브라우저에서 동적인 2D 그래픽과 애니메이션을 직접 그리는 방법을 알아봅니다. 게임, 데이터 시각화 등에 활용됩니다.' },
    { id: 46, title: '서버리스 함수 개발', createDate: new Date("2024-07-27").getTime(), tag: null, content: '서버를 직접 관리할 필요 없이 코드를 실행할 수 있는 서버리스 아키텍처와 AWS Lambda, Google Cloud Functions 같은 서버리스 함수 개발 방법을 알아봅니다.' },
    { id: 47, title: 'State Machine으로 복잡한 상태 관리', createDate: new Date("2024-08-09").getTime(), tag: '상태 관리', content: '복잡한 UI 상태와 비즈니스 로직을 명확하고 예측 가능하게 관리하기 위한 State Machine 패턴의 개념과 XState 라이브러리를 사용한 구현 방법을 소개합니다.' },
    { id: 48, title: 'TypeScript 고급 타입', createDate: new Date("2024-08-22").getTime(), tag: '타입스크립트', content: 'TypeScript의 제네릭, 유니온 타입, 인터섹션 타입, 조건부 타입 등 고급 타입 시스템을 깊이 있게 다룹니다. 더 견고하고 유연한 코드를 작성하는 데 도움이 됩니다.' },
    { id: 49, title: '웹 소켓을 이용한 게임 개발', createDate: new Date("2024-09-04").getTime(), tag: '게임 개발', content: '실시간 통신이 중요한 웹 기반 멀티플레이어 게임을 개발하기 위해 WebSocket을 활용하는 방법을 알아봅니다. 클라이언트-서버 통신 설계와 구현 예제를 다룹니다.' },
    { id: 50, title: 'Web Vitals 이해하기', createDate: new Date("2024-09-17").getTime(), tag: '웹 성능', content: '사용자 경험을 측정하는 핵심 지표인 Core Web Vitals(LCP, FID, CLS)의 개념과 중요성을 설명합니다. 웹 성능을 개선하고 검색 순위를 높이는 데 활용하세요.' }
  ];

  const [contents, setContents] = useState(postMockData);

  const deleteContent = (id) => {
    const deletedContents = [...contents].filter(content => content.id !== id);
    setContents(deletedContents);
  };

  const [searchWord, setSearchWord] = useState("");
  const [searchingTag, setSearchingTag] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(true);
  const nav = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  function onScroll() {
    if (window.scrollY >= 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [])

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onChange = (event) => {
    setSearchWord(event.target.value);
  }
  const filteredContents = contents.filter(item => {
    const lowerCaseSearchWord = searchWord.toLowerCase();
    const titleIncludes = item.title.toLowerCase().includes(lowerCaseSearchWord);
    const contentIncludes = item.content.toLowerCase().includes(lowerCaseSearchWord);
    const tagIncludes = item.tag ? item.tag.toLowerCase().includes(lowerCaseSearchWord) : null;
    return titleIncludes || contentIncludes || tagIncludes;
  });
  const filteredContentsByTag = contents.filter(item => {
    const tagIncludes = item.tag ? item.tag.toLowerCase().includes(searchingTag.toLowerCase()) : null;
    return tagIncludes;
  })
  return (
    <div>
      <button onClick={() => nav("/")}>캘린더 이동 버튼</button>
      <button className="button_home" onClick={() => (nav(0), setSearchingTag(""))}>홈 버튼(새로고침)</button>
      {scrolled ? (<button id="moveToTopButton" onClick={moveToTop}>페이지 맨 위로 가는 버튼</button>) : (null)}
      {showSearchBar ? (<div className="search">
        <input
          type="text"
          value={searchWord}
          className="search_input"
          placeholder="검색어를 입력하세요"
          onChange={onChange}
        />
      </div>) : (null)}
      <div className="list_wrapper">
        <BackBoardDispatchContext.Provider value={{ deleteContent, setSearchWord, setSearchingTag, setShowSearchBar }}>
          {searchingTag ?
            (<div>
              <h2 className="tag_header">{`#${searchingTag}`}</h2>
              <BackPostList data={filteredContentsByTag} searchingTag={searchingTag} setSearchingTag={setSearchingTag} />
            </div>)
            :
            (<BackPostList data={filteredContents} />)}
        </BackBoardDispatchContext.Provider>
      </div>
    </div>
  )
};

export default BackBoard;
