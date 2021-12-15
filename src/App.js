import './App.css';
import { usePosts } from './store/usePost'
import { ObverseScroll } from './ObverseScroll'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState(0)
  const { posts, data } = usePosts(page)

  const onFooterHit = n => () => {
    if (!data) {
      // NOTE: is loading, dont change page yet!
      return
    }
    setPage(n + 1)
  }

  return (
    <div className="App">
      <div>Page = {page}</div>
      <button onClick={() => setPage(page + 1)}>inc</button>
      <div className="header">Header</div>
      <ObverseScroll onFooterHit={onFooterHit(page)}>
        {posts.map((post, idx) => (
          <div
            className="item"
            key={post.id}
            style={{ background: idx % 2 === 0 ? 'grey' : 'lightblue' }}
          >
            {post.id} - {post.content}
          </div>
        ))}
      </ObverseScroll>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
