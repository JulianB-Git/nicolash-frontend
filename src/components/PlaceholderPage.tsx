import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({
  title,
  description,
  icon,
}: PlaceholderPageProps) {
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>{title}</h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            {description}
          </p>
        </div>

        <Card className='max-w-2xl mx-auto'>
          <CardHeader className='text-center'>
            {icon && (
              <div className='flex justify-center mb-4'>
                <div className='p-3 bg-gray-100 rounded-full'>{icon}</div>
              </div>
            )}
            <CardTitle className='text-2xl'>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className='text-center space-y-6'>
            <p className='text-gray-600'>
              We're working on bringing you more details about our special day.
              Check back soon for updates!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button asChild>
                <Link href='/rsvp'>RSVP Now</Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='/'>Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
