import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const token = getHeader(event, "authorization")?.split("Bearer ")[1];
    const runtimeConfig = useRuntimeConfig();

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }

    try {
        jwt.verify(token, runtimeConfig.passwordSecret);
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }
    const data = jwt.decode(token);
    const { username, scope } = data as { username: string, scope: string };

    return {
        username: username,
        scope: scope,
    }
});