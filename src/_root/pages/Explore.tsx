import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import SearchResoults from '@/components/shared/SearchResoults'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDevounce'
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutatuions'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Explore = () => {
  const { ref, inView } = useInView()
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()

  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue)

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage()
  }, [inView, searchValue, fetchNextPage])

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResoults = searchValue !== ''
  const shouldShowPosts = !shouldShowSearchResoults && posts.pages.every((item) => item.documents.length === 0)

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/file-upload.svg"
            width={36}
            height={36}
            alt="search"
            className='invert-white'
          />
          <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        </div>
        <div className="flex gap-1 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            height={24}
            width={24}
            className='ml-4'
          />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">

        <h2 className='body-bold md:h3-bold'>Popular Today</h2>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResoults ? (
          <SearchResoults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">No posts</p>
        ) : posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item.documents} />
        ))}
      </div>

      {hasNextPage ? !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      ) : (
        <p className="text-light-4 mt-3 text-center w-full">All posts have been loaded</p>
      )}
    </div>
  )
}

export default Explore