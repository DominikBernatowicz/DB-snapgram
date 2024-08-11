import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, ImageGravity, Query } from "appwrite";
import { id } from "date-fns/locale";
import { ifError } from "assert";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl
    })

    return newUser
  } catch (err) {
    console.log(err)
    return err
  }
}

export async function saveUserToDB(user: {
  accountId: string,
  email: string,
  name: string,
  imageUrl: URL,
  username?: string
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databasesId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    )

    return newUser
  } catch (err) {
    console.log(err)
  }
}

export async function signInAccount(user: {
  email: string,
  password: string
}) {
  try {
    // Sprawdzenie, czy istnieje aktywna sesja
    const currentSession = await account.getSession('current').catch(() => null);

    if (currentSession) {
      console.log('Istnieje już aktywna sesja:', currentSession);
      return currentSession;
    }

    // Utworzenie nowej sesji
    const session = await account.createEmailPasswordSession(user.email, user.password);
    return session;
  } catch (err) {
    console.log(err)
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (err) {
    console.log(err)
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databasesId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (err) {
    console.log(err)
  }
}

export async function createPost(post: INewPost) {
  try {
    // Upload image to storage
    const uploadedFile = await uploadFile(post.file[0])

    if (!uploadedFile) throw Error

    // Get URL
    const fileUrl = await getFilePreview(uploadedFile.$id)

    if (!fileUrl) {
      deleteFile(uploadedFile.$id)
      throw Error
    }

    // Convert tags in an array
    const tags = post.tags?.replace(/ /g, '').split(',').filter(tag => tag !== '') || []

    // Save post to database
    const newPost = await databases.createDocument(
      appwriteConfig.databasesId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags,
      }
    )

    if (!newPost) {
      await deleteFile(uploadedFile.$id)
      throw Error
    }

    return newPost
  } catch (err) {
    console.log(err)
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadFile
  } catch (err) {
    console.log(err)
  }
}

export async function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    )

    return fileUrl
  } catch (err) {
    console.log(err)
  }
}

export async function deleteFile(fileId: string) {
  try {
    storage.deleteFile(
      appwriteConfig.storageId,
      fileId
    )

    return { status: 'ok' }
  } catch (err) {
    console.log(err)
  }
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databasesId,
    appwriteConfig.postsCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(20)]
  )

  if (!posts) throw Error

  return posts
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatePost = await databases.updateDocument(
      appwriteConfig.databasesId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray
      }
    )

    if (!updatePost) throw Error

    return updatePost
  } catch (err) {
    console.log(err)
  }
}

export async function savePost(postId: string, userId: string) {
  try {
    const updatePost = await databases.createDocument(
      appwriteConfig.databasesId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )

    if (!updatePost) throw Error

    return updatePost
  } catch (err) {
    console.log(err)
  }
}


export async function deleteSavedPost(savedRecordID: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databasesId,
      appwriteConfig.savesCollectionId,
      savedRecordID,
    )

    if (!statusCode) throw Error

    return { status: 'ok' }
  } catch (err) {
    console.log(err)
  }
}

export async function getPostById(postId: string) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databasesId,
      appwriteConfig.postsCollectionId,
      postId
    )

    if (!post) throw Error

    return post
  } catch (err) {
    console.log(err)
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    }

    if (hasFileToUpdate) {
      // Upload image to storage
      const uploadedFile = await uploadFile(post.file[0])

      if (!uploadedFile) throw Error

      // Get URL
      const fileUrl = await getFilePreview(uploadedFile.$id)

      if (!fileUrl) {
        deleteFile(uploadedFile.$id)
        throw Error
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
    }

    // Convert tags in an array
    const tags = post.tags?.replace(/ /g, '').split(',').filter(tag => tag !== '') || []

    // Save post to database
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databasesId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags,
      }
    )

    if (!updatedPost) throw Error

    return updatedPost
  } catch (err) {
    console.log(err)
  }
}

export async function deletePost(postId: string, imageId: string) {
  if (!postId || !imageId) throw Error

  try {
    await databases.deleteDocument(
      appwriteConfig.databasesId,
      appwriteConfig.postsCollectionId,
      postId
    )

    return { status: 'ok' }
  } catch (err) {
    console.log(err)
  }
}