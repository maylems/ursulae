'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { authClient } from '@/lib/auth-client';

export default function ProfileViewPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user ?? null;

  return (
    <div className='flex w-full flex-col p-4'>
      <Card className='max-w-xl'>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <UserAvatarProfile className='size-12 rounded-lg' showInfo user={user} />
          <p className='text-muted-foreground text-xs'>
            Member since {user ? new Date(user.createdAt).toLocaleDateString() : ''}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
