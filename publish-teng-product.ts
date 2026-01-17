import 'dotenv/config'
import { prisma } from './src/lib/db'

async function publishProduct() {
    const user = await prisma.user.findUnique({
        where: { email: 'teng@gg.com' }
    });

    if (user) {
        await prisma.product.updateMany({
            where: { ownerId: user.id },
            data: { published: true }
        });
        console.log('Published products for', user.email);
    }
}

publishProduct()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
