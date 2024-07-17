export interface IEnviroment {
    APP: {
        NODE_ENV: string;
        PORT: number;
        CLIENT_URL?: string;
    };

    DB: {
        MONGO_URI: string
    },

    MAILING: {
        SENDGRID_API_KEY: string;
        SENDGRID_FROM: string;
    },

    JWT: {
        SECRET: string;
        EXPIRES_IN: string;
    },

    BCRYPT: {
        SALT_ROUNDS: number
    }

}