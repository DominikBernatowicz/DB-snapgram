import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutatuions"
import { checkIsLiked } from "@/lib/utils"
import { Models } from "appwrite"
import { useEffect, useState } from "react"

type PostStatsProps = {
  post?: Models.Document,
  userId: string
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id)

  const [likes, setLikes] = useState<string[]>(likesList)
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: savePost } = useSavePost()
  const { mutate: deleteSavedPost } = useDeleteSavedPost()

  const { data: currentUser } = useGetCurrentUser()

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id)

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    let newLikes = [...likes]

    const hasLiked = newLikes.includes(userId)

    if (hasLiked) {
      newLikes = newLikes.filter(id => id !== userId)
    } else {
      newLikes.push(userId)
    }

    setLikes(newLikes)
    likePost({ postId: post?.$id || '', likesArray: newLikes })
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (savedPostRecord) {
      setIsSaved(false)
      deleteSavedPost(savedPostRecord.$id)
    } else {
      savePost({ postId: post?.$id || '', userId })
      setIsSaved(true)
    }
  }

  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [currentUser])

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`/assets/icons/${checkIsLiked(likes, userId) ? 'liked' : 'like'}.svg`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg: base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={`/assets/icons/${isSaved ? 'saved' : 'save'}.svg`}
          alt="like"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  )
}

export default PostStats