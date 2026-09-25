import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding official competitions...');

  const competitions = [
    {
      slug: 'biziq',
      name: 'BizIQ',
      description: 'Test your team\'s knowledge of the startup ecosystem, business history, and entrepreneurial fundamentals.',
      format: 'Multi-round quiz format',
      teamSize: '2 members',
    },
    {
      slug: 'pitch-lab',
      name: 'The Pitch Lab',
      description: 'Present a high-growth startup idea to a panel of mock investors and defend your vision.',
      format: 'Pitch Deck Presentation (Pitch + Q&A)',
      teamSize: '1–2 members',
    },
    {
      slug: 'madverse',
      name: 'mADverse',
      description: 'Create a compelling and creative advertising campaign for a product on the spot.',
      format: 'Impromptu Ad Campaign Performance',
      teamSize: '2–3 members',
    },
    {
      slug: 'codex',
      name: 'CODEX',
      description: 'Build a working technical prototype to solve a specific problem statement within the event day.',
      format: 'Single-day development sprint',
      teamSize: '4 members',
    },
    {
      slug: 'dress-a-founder',
      name: 'Dress-A-Founder',
      description: 'Shape the public persona of a hypothetical founder and manage a PR crisis under pressure.',
      format: 'Crisis Simulation & Strategy Presentation',
      teamSize: '1 member',
    },
  ];

  for (const comp of competitions) {
    await prisma.competition.upsert({
      where: { slug: comp.slug },
      update: comp,
      create: comp,
    });
  }
  console.log('Official competitions seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
