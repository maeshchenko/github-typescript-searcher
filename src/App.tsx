import React, { useEffect, useState, useCallback } from 'react';
import { Octokit } from 'octokit';

function App() {
  interface IItems {
    id: number,
    stars: number,
    name: string,
    url: string
  }

  const octokit = new Octokit({ auth: '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' });

  const [items, setItems] = useState<IItems[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (page: number) => {
    setIsLoading(true);
    const response = await octokit.rest.search.repos({
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
  };

  useEffect(() => {
    getData(page);
  }, [page])

  return (
    <>
      {!isLoading && <>
        <h1>Page: {page}</h1>
        {items && items.map(item => <li key={item.id}><a href={item.url}>{item.name}</a></li>)}
        <button onClick={() => {
          if (page > 0) { setPage(page - 1) }
        }}>←</button>
        <button onClick={() => setPage(page + 1)}>→</button>
      </>}
      {isLoading && <p>Loading...</p>}
    </>
  );
}

export default App;
