import 'dotenv/config'
import { prisma } from './src/lib/db'

async function debugProducts() {
    const email = 'teng@gg.com';
    const user = await prisma.user.findUnique({
        where: { email },
        include: { products: true }
    });

    if (!user) {
        console.log('User not found:', email);
        return;
    }

    console.log('User found:', user.email, 'ID:', user.id);
    console.log('Total Products:', user.products.length);
    user.products.forEach(p => {
        console.log(`- Product: ${p.name}, Published: ${p.published}`);
    });
}

debugProducts()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
