import { Models } from "appwrite"
import Loader from "./Loader"
import GridPostList from "./GridPostList"

type SearchResoultsProps = {
  isSearchFetching: boolean,
  searchedPosts: Models.Document[]
}

const SearchResoults = ({ isSearchFetching, searchedPosts }: SearchResoultsProps) => {
  if (isSearchFetching) return <Loader />

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return (
      <GridPostList posts={searchedPosts.documents} />
    )
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No resoults</p>
  )
}

export default SearchResoults