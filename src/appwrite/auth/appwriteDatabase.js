import { Account, Client, Databases, ID } from "appwrite";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService{
        client = new Client();
        databse;
        bucket;

        constructor(){
            this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID)
            this.databse = new Databases(this.client)
            this.bucket = new  Storage(this.client)
        }

       async createPost ({title, slug, image, content, status, userid, }){
        try {
            return await this.databse.createDocument(
                config.appwriteUrl,
                config.appwriteProjectID,
                slug,
                {
                    title,
                    image,
                    content,
                    status,
                    userid

                }
            )
        } catch (error) {
            throw error
        }
        }

        async updatePost (slug,{ttile, image, content, status}){
            try{
                return await this.databse.updateDocument(
                    config.appwriteUrl,
                    config.appwriteProjectID,
                    slug,
                    {
                        title,
                        image,
                        content,
                        status
                    }
                )

            }
            catch(error){error}
        }

        async deletePost (slug){
            try {
                await this.databse.deleteDocument(
                    config.appwriteUrl,
                    config.appwriteProjectID,
                    slug
                )
                return true
            } catch (error) {
                throw error
                return false
            }
        }
        
        async getPost(slug){
            try {
                return await this.databse.listDocument(
                    config.appwriteUrl,
                    config.appwriteProjectID,
                    slug
                )

            } catch (error) {
                throw error   
            }
        }

        async getPosts(){
            try {
                return await this.databse.listDocuments(
                    config.appwriteUrl,
                    config.appwriteProjectID,
                    [
                        Query.equal('status','active')
                    ]
                )

            } catch (error) {
                throw error
            }
        }

        async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    config.appwriteBucketId,
                    ID.unique(),
                    file
                )
                
            } catch (error) {
                throw error
            }
        }

        async deleteFile(fileId){
            try {
                await this.bucket.deleteFile(
                    config.appwriteBucketId,
                    fileId
                )
                return true
            } catch (error) {
                throw error
                return false
            }
        }

        async getFilePreview(fileId){
            try {
                return await this.bucket.getFilePreview(
                    config.appwriteBucketId,
                    fileId
                )
            } catch (error) {
                throw error
            }
        }



}

const databaseService = new DatabaseService()

export default databaseService