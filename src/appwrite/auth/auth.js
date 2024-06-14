import config from "../../config/config";
import {Client , Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectID)

        this.account = new Account(this.client);
    }

    async createAccount (ID, emailId, password,name){
        try{
            const userAccount  = await this.account.create(ID.unique(), emailId, password, name );
                if(userAccount){
                    return this.account.createEmailSession(emailId, password)
                    }
                else{
                    return userAccount
                }
            }
        catch(error){
            throw error
        }
    }

    async Login (emailId, password){
        try{
            return await this.account.createEmailSession(emailId, password)
        }
        catch(error){
            throw error
        }
    }

    async Logout(){
        try{
            await this.account.deleteSessions()
        }
        
        catch(error){
            throw error
        }
    }

    async getCurrenUser(){
        try{
            return await this.account.get();
        }
        catch(error)
        {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null
    }
}

const authService = new AuthService()

export default authService