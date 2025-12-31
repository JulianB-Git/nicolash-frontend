"use client";

import { useState, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { GroupManagementFallback } from "@/components/FallbackUI";
import LoadingSpinner from "@/components/LoadingSpinner";
import { GroupWithMembers } from "@/types";

// Lazy load group components for better performance
const GroupForm = lazy(() => import("@/components/admin/GroupForm"));
const GroupList = lazy(() => import("@/components/admin/GroupList"));
const GroupDetails = lazy(() => import("@/components/admin/GroupDetails"));

export default function AdminGroupsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupWithMembers | null>(
    null
  );
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleGroupCreated = (group: GroupWithMembers) => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleViewGroup = (group: GroupWithMembers) => {
    setSelectedGroup(group);
    setShowGroupDetails(true);
  };

  const handleGroupUpdated = () => {
    setRefreshTrigger((prev) => prev + 1);
    // Refresh the selected group details if it's currently open
    if (selectedGroup) {
      // The GroupDetails component will handle refreshing its own data
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold mb-2'>Group Management</h2>
          <p className='text-muted-foreground'>
            Create and manage invitation groups for families and couples.
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className='h-4 w-4 mr-2' />
          Create Group
        </Button>
      </div>

      <ErrorBoundary
        context='Group Management'
        fallback={<GroupManagementFallback />}
      >
        <Suspense fallback={<LoadingSpinner text='Loading groups...' />}>
          <GroupList
            onViewGroup={handleViewGroup}
            refreshTrigger={refreshTrigger}
          />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary context='Group Form'>
        <Suspense fallback={<div />}>
          <GroupForm
            open={showCreateForm}
            onOpenChange={setShowCreateForm}
            onSuccess={handleGroupCreated}
          />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary context='Group Details'>
        <Suspense fallback={<div />}>
          <GroupDetails
            group={selectedGroup}
            open={showGroupDetails}
            onOpenChange={setShowGroupDetails}
            onGroupUpdated={handleGroupUpdated}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
