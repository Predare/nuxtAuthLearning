import { PrismaClient } from "@prisma/client";
import { hash, genSalt } from "bcrypt";

const prisma = new PrismaClient();

async function main()
{
    const salt = await genSalt();
    const password = "admin";
    
    await prisma.user.create({
        data: {
            email: "admin",
            password: await hash(password, salt),
        }
    });
}

main().then( async () => {
    console.log("done");
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});