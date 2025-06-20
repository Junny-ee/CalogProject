import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const useMarkdown = () => {
  return {
    // inline : 코드블럭으로 감싸지 않은 일반 코드
    // className : 코드블럭 색상 적용할 언어
    // children : 작성한 글
    // ...props : 그 외 모든 속성
    code({ inline, className, children, ...props }) {
      // /language-(\w+)/ 정규 표현식. 영문+숫자 조합 단어 뽑아옴
      // className이 null, undefined, 빈 문자열일 경우를 대비해 ""로 둠
      // exec() : 정규식에서 해당 언어 뽑아올 때 사용
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          // 괄호로 묶인 부분(\w+)에 해당하는 언어 불러옴
          // 0일 경우엔 language-(\w+) 전부 일치해야함
          language={match[1]}
          // div 태그로 감싸서 하이라이팅된 코드 출력됨
          PreTag="div"
          {...props}
        >
          {/* 마지막 줄에 엔터(빈 줄) 있을 경우 제외하고 내용 출력 */}
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        // 코드 블럭 아닌 경우 그냥 일반적으로 작성한 내용 나옴
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
};

export default useMarkdown;
