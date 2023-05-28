import React, { useLayoutEffect, useState } from 'react';
import { Octokit } from 'octokit';


interface IItems {
  id: number,
  stars: number,
  name: string,
  url: string
}

function App() {
  const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_AUTH_KEY });

  const [items, setItems] = useState<IItems[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async (page: number) => {
    try {
      setIsLoading(true);
      await octokit.rest.search.repos({
        q: 'language:TypeScript',
        sort: "stars",
        per_page: 20,
        page: page,
      })
        .then(response => {
          const formattedItems = response.data?.items.map(({ id, stargazers_count, html_url, full_name }) => ({ id, name: full_name, stars: stargazers_count, url: html_url }));

          setItems(formattedItems);
          setIsLoading(false);
        })
    }
    catch (err) {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    getData(page);
  }, [page])

  return (
    <Wrapper>
      <>
        {!isLoading && !isError && <>
          <TaskDescription page={page} />
          <ListItems items={items} />
          <ControlButtons goLeft={() => setPage(page - 1)} goRight={() => setPage(page + 1)} page={page} />
        </>}
        {isLoading && <p>Загрузка...</p>}
        {!isLoading && isError && <p>Обнаружена ошибка</p>}
      </>
    </Wrapper>
  );
}

interface IControlButtonsProps {
  goLeft: () => void;
  goRight: () => void;
  page: number
}

function ControlButtons({ goLeft, goRight, page }: IControlButtonsProps) {
  return <div style={{ marginTop: 30 }}>
    <button style={{ marginRight: 10 }} onClick={() => goLeft()} disabled={page === 0}>← Влево</button>
    <button onClick={() => goRight()}>Вправо →</button>
  </div >
}

interface ITaskDescriptionProps {
  page: number
}

function TaskDescription({ page }: ITaskDescriptionProps) {
  return <div style={{ marginBottom: 30 }}>
    <p style={{ margin: '0 0 3px', lineHeight: 'initial' }}>Поисковый запрос: <strong>language:TypeScript</strong></p>
    <p style={{ margin: '0 0 3px', lineHeight: 'initial' }}>Сортировка по: <strong>★</strong></p>
    <p style={{ margin: '0 0 3px', lineHeight: 'initial' }}>Текущая страница: <strong>{page}</strong></p>
  </div>

}

interface IListProps {
  items: IItems[]
}

function ListItems({ items }: IListProps) {
  return <ul style={{ padding: '0 20px' }}>
    {items && items.map(item => <li key={item.id} style={{ marginBottom: 5 }}><a target='_blank' rel='noreferrer' href={item.url}>{item.name}</a></li>)}
  </ul>
  console.log(items);
}

interface IWrapperProps {
  children?: JSX.Element;
}

function Wrapper({ children }: IWrapperProps) {
  return <div className='window' style={{ width: 500, margin: '100px auto 0' }}>
    <div className="title-bar">
      <div className="title-bar-text">Тестовое задание в IBS. Кандидат: Ещенко Михаил</div>
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

export default App;
