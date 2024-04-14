import { z } from "zod";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();

    const validateCredentials = z.object({
        email: z.string().min(1),
        password: z.string().min(1),
    }).safeParse(await readBody(event));

    if (!validateCredentials.success) {
        wrongCredentialsError();
    } else {

        const { email, password } = validateCredentials.data;
        console.log(email)
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                email: true,
                password: true
            }
        });

        if (!user) {
            wrongCredentialsError();
        } else {
            if (!(await compare(password, user.password))) {
                wrongCredentialsError();
            }

            const expiresIn = parseInt(runtimeConfig.tokenExpireTime);

            const accessToken = jwt.sign(
                {
                    username: user.email,
                    scope: "user",
                },
                runtimeConfig.passwordSecret,
                {
                    expiresIn
                });

            const refreshToken = jwt.sign(
                {
                    username: user.email,
                    scope: "user",
                },
                runtimeConfig.passwordSecret,
                {
                    expiresIn: 60 * 60 * 24
                }
            );

            return {
                token:
                {
                    accessToken,
                    refreshToken
                }
            }
        }


    }
});

function wrongCredentialsError() {
    throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
    });
}