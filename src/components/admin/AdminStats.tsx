"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { useAuthenticatedApi } from "@/lib/useAuthenticatedApi";

interface AdminStatsData {
  totalAttendees: number;
  acceptedCount: number;
  declinedCount: number;
  pendingCount: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<AdminStatsData>({
    totalAttendees: 0,
    acceptedCount: 0,
    declinedCount: 0,
    pendingCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { apiClient: api } = useAuthenticatedApi();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all attendees to calculate statistics
        const response = await api.getAttendees();
        const attendees = response.attendees;

        const totalAttendees = attendees?.length;
        const acceptedCount = attendees?.filter(
          (a) => a.rsvpStatus === "accepted"
        ).length;
        const declinedCount = attendees?.filter(
          (a) => a.rsvpStatus === "declined"
        ).length;
        const pendingCount = attendees?.filter(
          (a) => a.rsvpStatus === "pending"
        ).length;

        setStats({
          totalAttendees,
          acceptedCount,
          declinedCount,
          pendingCount,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [api]);

  if (loading) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i} className='animate-pulse'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Loading...</CardTitle>
              <div className='h-4 w-4 bg-muted rounded' />
            </CardHeader>
            <CardContent>
              <div className='h-8 bg-muted rounded w-16' />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <p className='text-destructive text-sm'>{error}</p>
        </CardContent>
      </Card>
    );
  }

  const statsCards = [
    {
      title: "Total Attendees",
      value: stats.totalAttendees,
      icon: Users,
      description: "Total invited guests",
    },
    {
      title: "Accepted",
      value: stats.acceptedCount,
      icon: UserCheck,
      description: "Confirmed attendees",
      className: "text-green-600",
    },
    {
      title: "Declined",
      value: stats.declinedCount,
      icon: UserX,
      description: "Declined invitations",
      className: "text-red-600",
    },
    {
      title: "Pending",
      value: stats.pendingCount,
      icon: Clock,
      description: "Awaiting response",
      className: "text-yellow-600",
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <Icon
                className={`h-4 w-4 ${
                  stat.className || "text-muted-foreground"
                }`}
              />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-xs text-muted-foreground'>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
