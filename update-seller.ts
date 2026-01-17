import 'dotenv/config'
import { prisma } from './src/lib/db'

async function updateSellerRole() {
    const user = await prisma.user.update({
        where: { email: 'teng@gg.com' },
        data: { role: 'SELLER' }
    })
    console.log('User Updated to SELLER:', user)
}

updateSellerRole()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('Error updating user:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
