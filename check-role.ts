import 'dotenv/config'
import { prisma } from './src/lib/db'

async function checkAdminRole() {
    const user = await prisma.user.findUnique({
        where: { email: 'admin@example.com' },
        select: { email: true, role: true }
    })
    console.log('Current Admin User State:', user)
}

checkAdminRole()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
