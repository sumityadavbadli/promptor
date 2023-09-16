'use client'

import { useState, useMemo, useEffect } from "react";
import PromptCard from "./PromptCard";
import { debounce } from "lodash";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleTagClick = (tag) => {
    document.getElementsByClassName('search_input')[0].value = tag;
    setSearchText(tag);
  }
  const fetchPrompts = async () => {
    const response = await fetch(`/api/prompt/search/${searchText}`);
    const data = await response.json();
    setPosts(data);
  }

  const searchDebounce = debounce(handleSearchChange, 500);

  useEffect(() => {
    if (searchText.length === 0 || searchText.length > 2) {
      fetchPrompts();
    }
  }, [searchText]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-flex-center'>
        <input
          type="text"
          placeholder="Search for a tag or username"
          onChange={searchDebounce}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed