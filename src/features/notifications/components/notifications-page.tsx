'use client';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  NotificationCard,
  type NotificationAction,
  type NotificationStatus
} from '@/components/ui/notification-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { notificationKeys, notificationsQueryOptions } from '../api/queries';
import { markNotificationsRead } from '../api/service';
import type { AppNotification } from '../api/types';

function toActions(notification: AppNotification): NotificationAction[] {
  if (typeof notification.data?.actionHref !== 'string') return [];
  return [
    {
      id: 'primary',
      label:
        typeof notification.data.actionLabel === 'string' ? notification.data.actionLabel : 'Open',
      type: 'redirect',
      style: 'primary'
    }
  ];
}

function toStatus(notification: AppNotification): NotificationStatus {
  return notification.read ? 'read' : 'unread';
}

export default function NotificationsPage() {
  const { getToken } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: notifications } = useSuspenseQuery(notificationsQueryOptions(getToken));

  const count = notifications.filter((notification) => !notification.read).length;

  const markRead = useMutation({
    mutationFn: async (id: string) => markNotificationsRead(await getToken(), [id]),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all })
  });

  const markAll = useMutation({
    mutationFn: async () => markNotificationsRead(await getToken()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all })
  });

  const unreadNotifications = notifications.filter((notification) => !notification.read);
  const readNotifications = notifications.filter((notification) => notification.read);

  const redirect = (notification: AppNotification, actionId: string) => {
    markRead.mutate(notification.id);
    if (actionId === 'primary' && notification.data?.actionHref) {
      router.push(notification.data.actionHref);
    }
  };

  const renderList = (items: AppNotification[]) => {
    if (items.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center py-16'>
          <Icons.notification className='text-muted-foreground/40 mb-3 h-10 w-10' />
          <p className='text-muted-foreground text-sm'>No notifications</p>
        </div>
      );
    }

    return (
      <div className='flex flex-col gap-2'>
        {items.map((notification) => (
          <NotificationCard
            key={notification.id}
            id={notification.id}
            title={notification.title}
            body={notification.body}
            status={toStatus(notification)}
            createdAt={notification.createdAt}
            actions={toActions(notification)}
            onMarkAsRead={(id) => markRead.mutate(id)}
            onAction={(notifId, actionId, actionType) => {
              if (actionType === 'redirect') {
                const target = notifications.find((n) => n.id === notifId);
                if (target) redirect(target, actionId);
              }
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <PageContainer
      pageTitle='Notifications'
      pageDescription='View and manage all your notifications.'
      pageHeaderAction={
        count > 0 ? (
          <Button
            variant='outline'
            size='sm'
            onClick={() => markAll.mutate()}
            disabled={markAll.isPending}
          >
            Mark all as read
          </Button>
        ) : undefined
      }
    >
      <Tabs defaultValue='all'>
        <TabsList>
          <TabsTrigger value='all'>All ({notifications.length})</TabsTrigger>
          <TabsTrigger value='unread'>Unread ({unreadNotifications.length})</TabsTrigger>
          <TabsTrigger value='read'>Read ({readNotifications.length})</TabsTrigger>
        </TabsList>
        <TabsContent value='all' className='mt-4'>
          {renderList(notifications)}
        </TabsContent>
        <TabsContent value='unread' className='mt-4'>
          {renderList(unreadNotifications)}
        </TabsContent>
        <TabsContent value='read' className='mt-4'>
          {renderList(readNotifications)}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
