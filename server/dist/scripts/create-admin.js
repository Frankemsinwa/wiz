import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import "dotenv/config";
async function createAdmin() {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || 'System Admin';
    if (!email || !password) {
        console.error('Usage: node scripts/create-admin.js frank@gmail.com password name');
        process.exit(1);
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'ADMIN',
            },
        });
        console.log('✅ Admin user created successfully:');
        console.log(`ID: ${admin.id}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Role: ${admin.role}`);
    }
    catch (error) {
        console.error('❌ Error creating admin:', error.message);
    }
    finally {
        await prisma.$disconnect();
        await pool.end();
    }
}
createAdmin();
//# sourceMappingURL=create-admin.js.map