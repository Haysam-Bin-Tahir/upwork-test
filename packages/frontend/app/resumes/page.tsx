'use client';

import { useEffect, useState } from 'react';
import { useResumes } from '@/hooks/useResumes';
import { useSearchResumes } from '@/hooks/useSearchResumes';
import ResumeCard from '@/components/Card/ResumeCard';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function ResumesPage() {
  const router = useRouter();
  const { resumes, isLoading = true, error: fetchError, fetchResumes } = useResumes();
  const { searchResults, isSearching, handleSearch } = useSearchResumes();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const displayedResumes = searchResults ?? resumes;
  const hasSearchQuery = searchQuery.length > 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load resumes. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Byte-sized Resumes</h1>
      
      {/* Search Input - Always show if not loading */}
      {!isLoading && (resumes.length > 0 || hasSearchQuery) && (
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            ) : (
              <Search className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <Input
            type="text"
            placeholder="Search the mini resume you're looking for..."
            className="pl-10 pr-10 w-full"
            value={searchQuery}
            onChange={handleSearchInput}
          />
        </div>
      )}

      {/* No results states */}
      {!isLoading && displayedResumes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {hasSearchQuery ? (
              '🔍 No byte-sized resumes match your search...'
            ) : (
              '🍩 Oops! Seems like there are no byte-sized resumes to munch on...'
            )}
          </p>
          {/* Only show create button if there are no resumes at all */}
          {!hasSearchQuery && (
            <Button
              onClick={() => router.push('/')}
              className="mt-4"
            >
              Create your first byte-sized resume
            </Button>
          )}
        </div>
      )}

      {/* Results grid */}
      {displayedResumes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedResumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
} 