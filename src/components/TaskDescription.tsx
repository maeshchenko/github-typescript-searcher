interface ITaskDescriptionProps {
    page: number
}

export function TaskDescription({ page }: ITaskDescriptionProps) {
    return <div style={{ marginBottom: 30 }}>
        <p style={{ margin: '0 0 3px', lineHeight: 'initial' }}>Поисковый запрос: <strong>language:TypeScript</strong></p>
        <p style={{ margin: '0 0 3px', lineHeight: 'initial' }}>Сортировка по: <strong>★</strong></p>
        <p style={{ margin: '0 0 3px', lineHeight: 'initial' }}>Текущая страница: <strong>{page}</strong></p>
    </div>
}