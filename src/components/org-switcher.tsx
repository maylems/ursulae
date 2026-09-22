'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';

export function OrgSwitcher() {
  const { isMobile, state } = useSidebar();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { data: organizations, isPending: listPending } = authClient.useListOrganizations();
  const isPending = !mounted || listPending;
  const { data: activeOrganization } = authClient.useActiveOrganization();

  // null selects the personal workspace (no active organization).
  async function switchTo(organizationId: string | null) {
    if ((activeOrganization?.id ?? null) === organizationId) return;
    await authClient.organization.setActive({ organizationId });
    queryClient.clear();
    router.refresh();
  }

  const label = isPending ? 'Loading...' : (activeOrganization?.name ?? 'Personal workspace');
  const collapsedClass =
    state === 'collapsed'
      ? 'invisible max-w-0 overflow-hidden opacity-0'
      : 'visible max-w-full opacity-100';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size='lg'
                className='data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
              />
            }
          >
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
              <Icons.galleryVerticalEnd className='size-4' />
            </div>
            <div
              className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${collapsedClass}`}
            >
              <span className='truncate font-medium'>{label}</span>
              <span className='text-muted-foreground truncate text-xs'>
                {isPending ? 'Workspaces' : activeOrganization ? 'Organization' : 'Personal'}
              </span>
            </div>
            <Icons.chevronsUpDown
              className={`ml-auto transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--anchor-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className='text-muted-foreground text-xs'>
                Workspaces
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem className='gap-2 p-2' onClick={() => switchTo(null)}>
                Personal workspace
                {!activeOrganization && <Icons.check className='ml-auto size-4' />}
              </DropdownMenuItem>
              {organizations?.map((organization) => (
                <DropdownMenuItem
                  key={organization.id}
                  className='gap-2 p-2'
                  onClick={() => switchTo(organization.id)}
                >
                  {organization.name}
                  {activeOrganization?.id === organization.id && (
                    <Icons.check className='ml-auto size-4' />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className='gap-2 p-2'
                onClick={() => router.push('/dashboard/workspaces')}
              >
                <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                  <Icons.add className='size-4' />
                </div>
                <div className='text-muted-foreground font-medium'>Add organization</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
