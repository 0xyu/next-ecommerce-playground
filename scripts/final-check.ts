import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.update({
        where: { email: 'teng@gg.com' },
        data: { sellerCode: 'TENG001' }
    })
    console.log('Final check - Seller Code set:', user.sellerCode)
}

main().finally(() => prisma.$disconnect())
