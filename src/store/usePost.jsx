import useSWR from "swr"
import { useState, useEffect } from "react"

const fetcher = async (page) => {
  const pageNum = parseInt(page)
  const getData = (post) => fetch(`https://616d9e2ea83a850017caa63f.mockapi.io/api/posts/${post}`).then(r => r.json())
  const posts = Array.from({ length: 2 }).map((_, idx) => pageNum * 2 + 1 + idx)
  const result = await Promise.all(posts.map(getData))
  return result
}

export function usePosts(page) {
  const [posts, setPosts] = useState([])

  const { data, error } = useSWR(
    "" + page,
    fetcher
  );

  useEffect(() => {
    if (data && data.length) {
      setPosts([...posts, ...data])
    }
  }, [data])

  console.log("Total get", posts.length, " page >>", page)
  
  return { data, error, posts }
}