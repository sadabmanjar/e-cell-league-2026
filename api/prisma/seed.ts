import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function checkAndSeed() {
  // Count existing
  const adminCount = await prisma.adminUser.count();
  const compCount = await prisma.competition.count();
  const ecellCount = await prisma.eCell.count();

  console.log('=== Database Status ===');
  console.log('Admin users:', adminCount);
  console.log('Competitions:', compCount);
  console.log('E-Cells:', ecellCount);

  // Create default super admin if none exists
  if (adminCount === 0) {
    console.log('\nNo admin users found. Creating default super admin...');
    const hash = await bcrypt.hash('admin@123', 12);
    const admin = await prisma.adminUser.create({
      data: {
        email: 'admin@ecell-league.com',
        password: hash,
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      },
    });
    console.log('Created admin:', admin.email);
    console.log('Password: admin@123');
    console.log('IMPORTANT: Change this password after first login!');
  } else {
    console.log('\nAdmin users already exist. Skipping admin creation.');
  }

  // Seed competitions if none exist
  if (compCount === 0) {
    console.log('\nNo competitions found. Seeding official competitions...');
    const competitions = [
      { slug: 'biziq', name: 'BizIQ', description: "A rapid-fire entrepreneurship quiz testing teams' knowledge of business landscapes, startups, and entrepreneurial history.", format: 'Multi-round quiz', teamSize: '2 members' },
      { slug: 'pitch-lab', name: 'The Pitch Lab', description: 'Teams pitch a compelling startup idea to mock investors and defend their vision.', format: 'Pitch Deck + Q&A', teamSize: '1–2 members' },
      { slug: 'madverse', name: 'mADverse', description: 'Teams create an impromptu advertising campaign for a product on the spot.', format: 'Impromptu Ad Campaign', teamSize: '2–3 members' },
      { slug: 'codex', name: 'CODEX', description: 'Teams build a working technical prototype to solve a problem statement within the event day.', format: 'Single-day sprint', teamSize: '4 members' },
      { slug: 'dress-a-founder', name: 'Dress-A-Founder', description: "Shape a hypothetical founder's public persona and manage a PR crisis.", format: 'Crisis Simulation & Presentation', teamSize: '1 member' },
    ];
    for (const comp of competitions) {
      await prisma.competition.upsert({
        where: { slug: comp.slug },
        update: comp,
        create: comp,
      });
    }
    console.log('Competitions seeded successfully.');
  } else {
    console.log(`\n${compCount} competitions already exist. Skipping.`);
  }

  console.log('\n=== Done ===');
}

checkAndSeed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
