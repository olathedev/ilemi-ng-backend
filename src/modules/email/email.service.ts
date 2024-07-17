import { Enviroment } from "../../shared/config";

class EmailService {
    private sendGridApiKey: string = Enviroment.MAILING.SENDGRID_API_KEY

    constructor() {
        
    }

    public async sendMail() {
        
    }
}