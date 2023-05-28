import { IItems } from '../App';

interface IListItemsProps {
    items: IItems[]
}

export function ListItems({ items }: IListItemsProps) {
    return <ul style={{ padding: '0 20px' }}>
        {items && items.map(item => <li key={item.id} style={{ marginBottom: 5 }}><a target='_blank' rel='noreferrer' href={item.url}>{item.name}</a></li>)}
    </ul>
}