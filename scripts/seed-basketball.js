const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Check if article already exists
    const existing = await prisma.blogPost.findUnique({
      where: { slug: 'basketball-winning-teams-wealthtech' }
    });

    if (existing) {
      console.log('✓ Basketball article already exists');
      return;
    }

    console.log('Adding basketball article to database...');

    const article = {
      slug: 'basketball-winning-teams-wealthtech',
      title: 'What Basketball Teaches Us About Building Winning Teams in WealthTech',
      author: 'Sinan Biren',
      date: 'Dec 23, 2025',
      category: 'Leadership',
      readTime: '4 min read',
      excerpt: 'Success isn\'t just about individual talent — it\'s about how well a team moves together. Lessons from basketball coaching applied to wealth management technology.',
      image: '/api/placeholder/800/400',
      content: `
<article>
<p>This past weekend, my son's basketball team took the court for their first tournament. As I watched the coach work with the kids, I was struck by how much coaching a youth basketball team mirrors building and leading teams in wealth management technology.</p>

<p><strong>Success isn't just about individual talent — it's about how well a team moves together.</strong></p>

<h2>Chemistry & Communication First</h2>

<p>The first thing the coach focused on wasn't shooting drills or plays — it was team chemistry. He spent time making sure the kids knew each other's names, understood their roles, and could communicate under pressure.</p>

<p>In wealthtech, we face the same challenge. You can have brilliant engineers, talented designers, and experienced operations people, but if they don't communicate effectively or understand how their work connects, you won't execute well. The best teams I've built started with intentional relationship-building and clear communication protocols.</p>

<h2>Everyone Needs a Playbook</h2>

<p>Basketball teams run plays — structured movements where everyone knows their role. But here's what makes it work: the plays are simple enough to remember under pressure, yet flexible enough to adapt when the defense shifts.</p>

<p>In wealth management operations, we need the same thing:</p>
<ul>
<li><strong>Clear roles</strong> for every team member</li>
<li><strong>Documented processes</strong> that everyone can follow</li>
<li><strong>Built-in flexibility</strong> for when markets shift or client needs change</li>
</ul>

<p>The teams that struggle are often the ones without a playbook — or worse, with a playbook so complex that no one can execute it when it matters.</p>

<h2>Coaching vs. Managing</h2>

<p>Good coaches don't just tell players what to do — they develop them. They watch, they give feedback, they celebrate small wins, and they hold people accountable to the team's standards.</p>

<p>In wealthtech, this distinction matters more than ever. As we integrate AI, modernize systems, and streamline operations, our job as leaders isn't to dictate every move. It's to:</p>
<ul>
<li><strong>Set clear expectations</strong></li>
<li><strong>Provide the right tools and training</strong></li>
<li><strong>Trust the team to execute</strong></li>
<li><strong>Review performance and adjust</strong></li>
</ul>

<p>The best coaches measure their success by how well their team plays when they're not calling every play from the sideline.</p>

<h2>Practice Makes Permanent</h2>

<p>One of the coach's favorite sayings is "practice doesn't make perfect — practice makes permanent." If you practice the wrong technique, you'll execute the wrong technique in the game.</p>

<p>This applies directly to operations. If your team is manually reconciling data every quarter, that's what they'll keep doing — even if there's a better way. If your onboarding process involves 47 steps and three different systems, that's what will become permanent.</p>

<p><strong>Automation and AI are only as good as the processes they're built on.</strong> If you automate a broken process, you just get a broken process that runs faster.</p>

<h2>Winning is a Rhythm</h2>

<p>What struck me most was watching the team find their rhythm. When they started communicating, running plays, and trusting each other, everything clicked. It wasn't about one star player — it was about five kids moving as one unit.</p>

<p>In wealth management, that rhythm is what separates good firms from great ones. It's when:</p>
<ul>
<li><strong>Client service</strong> knows what operations needs</li>
<li><strong>Technology</strong> anticipates what advisors will ask for</li>
<li><strong>Operations</strong> has the data ready before compliance asks</li>
<li><strong>Leadership</strong> trusts the team to execute</li>
</ul>

<p>That's when you win.</p>

<h2>The Takeaway</h2>

<p>Building winning teams — whether in basketball or wealthtech — comes down to the same fundamentals:</p>
<ol>
<li><strong>Chemistry matters more than talent alone</strong></li>
<li><strong>Everyone needs to know the playbook</strong></li>
<li><strong>Coaching beats managing</strong></li>
<li><strong>Practice makes permanent</strong></li>
<li><strong>Winning teams move as one</strong></li>
</ol>

<p>So whether you're coaching 10-year-olds or leading a wealth management technology transformation, remember: <strong>it's not about having the best individual players — it's about building a team that moves together.</strong></p>

<hr />

<p><em>What lessons have you learned from coaching or team sports that apply to your work in financial services? I'd love to hear your thoughts.</em></p>
</article>
      `
    };

    await prisma.blogPost.create({
      data: article
    });

    console.log('✓ Basketball article seeded successfully');
  } catch (error) {
    console.error('Error seeding basketball article:', error);
    // Don't fail the build, just log the error
  } finally {
    await prisma.$disconnect();
  }
}

seed();
