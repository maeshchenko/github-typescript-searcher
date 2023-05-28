interface IControlButtonsProps {
    goLeft: () => void;
    goRight: () => void;
    page: number
}

export function ControlButtons({ goLeft, goRight, page }: IControlButtonsProps) {
    return <div style={{ marginTop: 30 }}>
        <button style={{ marginRight: 10 }} onClick={() => goLeft()} disabled={page === 0}>← Влево</button>
        <button onClick={() => goRight()}>Вправо →</button>
    </div >
}
