interface IWrapperProps {
    children?: JSX.Element;
    title: string;
}

export function Wrapper({ children, title }: IWrapperProps) {
    return <div className='window' style={{ width: 500, margin: '100px auto 0' }}>
        <div className="title-bar">
            <div className="title-bar-text">{title}</div>
            <div className="title-bar-controls">
                <button aria-label="Minimize"></button>
                <button aria-label="Maximize"></button>
                <button aria-label="Close"></button>
            </div>
        </div>
        <div className="window-body" style={{ padding: '20px 5px' }}>
            {children}
        </div>
    </div>
}