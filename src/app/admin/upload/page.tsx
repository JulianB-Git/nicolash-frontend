export default function AdminUploadPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>Bulk Upload</h2>
        <p className='text-muted-foreground'>
          Upload attendees from a CSV file to quickly populate your guest list.
        </p>
      </div>

      {/* Upload functionality will be implemented in a future task */}
      <div className='rounded-lg border border-dashed p-8 text-center'>
        <p className='text-muted-foreground'>
          CSV upload functionality will be implemented here.
        </p>
      </div>
    </div>
  );
}
