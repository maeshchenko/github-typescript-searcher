import React, { useLayoutEffect, useState } from 'react';
import { Octokit } from 'octokit';

import { ControlButtons } from './components/ControlButtons';
import { ListItems } from './components/ListItems'
import { Wrapper } from './components/Wrapper';
import { TaskDescription } from './components/TaskDescription';


export interface IItems {
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
    <Wrapper title='Тестовое задание в IBS. Кандидат: Ещенко Михаил'>
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

export default App;
