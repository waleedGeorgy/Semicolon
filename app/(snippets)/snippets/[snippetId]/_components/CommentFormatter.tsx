import CodeBlock from "./CodeBlock";

function CommentFormatter({ contents }: { contents: string }) {
    const parts = contents.split(/(```[\w-]*\n[\s\S]*?\n```)/g);

    return (
        <div className="max-w-none">
            {parts.map((part, index) => {
                if (part.startsWith("```")) {
                    const match = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);

                    if (match) {
                        const [, language, code] = match;
                        return <CodeBlock language={language} code={code} key={index} />;
                    }
                }

                return part.split("\n").map((line, lineIdx) => (
                    <p key={lineIdx} className="mb-4 text-gray-300 last:mb-0">
                        {line}
                    </p>
                ));
            })}
        </div>
    );
}
export default CommentFormatter;
