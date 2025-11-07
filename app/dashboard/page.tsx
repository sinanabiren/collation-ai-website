import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import DashboardClient from './DashboardClient';
import { getUserByEmail, isTrialActive, getTrialDaysRemaining } from '@/lib/auth/users';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  // Get user details including trial info
  const user = await getUserByEmail(session.user.email);

  if (!user) {
    redirect('/login');
  }

  const trialActive = isTrialActive(user);
  const daysRemaining = getTrialDaysRemaining(user);

  return (
    <DashboardClient
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        trialActive,
        daysRemaining
      }}
    />
  );
}
