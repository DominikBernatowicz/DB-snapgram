import { Client, Account, Databases, Storage, Avatars } from 'appwrite'

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databasesId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLL_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLL_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLL_ID,
}

export const client = new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)