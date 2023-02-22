import { ReactElement, ReactNode } from "react";

const PageContent = ({title, children}:pageContentProps) => {
    return (
        <div>
            <h1>{title}</h1>
            {children}
        </div>
    );
};

interface pageContentProps{
    title: string,
    children: ReactNode
};

export default PageContent;