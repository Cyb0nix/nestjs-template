import { registerAs } from '@nestjs/config';
const Joi = require('joi');
const schema = Joi.object({
  secret: Joi.string().base64().required(),
});



export const AuthConfig = registerAs(
  'auth',
  async (): Promise<{
    secret: string;
  }> => {
    const config = {
      secret: process.env[`JWT_SECRET_KEY_BASE64`]
    };
    return schema.validateAsync(config);
  },
);
