import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function Learning() {
    const supabase = await createClient();
    const { data: instruments } = await supabase.from("instruments").select();

    return (
        <div className="p-2 max-w-6xl mx-auto">
            {/* Main Section Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#454888]">Learning Resources</h1>
                <hr className="mt-2 border-[#ccc]" />
            </div>

            {/* FlashCards Section */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-[#454888] mb-4">FlashCards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {instruments?.map((instrument) => (
                        <Link 
                            href={`/learning/flashcards/${instrument.id}`} 
                            key={instrument.id}
                        >
                            <div className="p-4 bg-white shadow rounded border border-[#6D6E93] w-[300px]">
                                {instrument.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quizzes Section */}
            <div className= "mb-10">
                <h2 className="text-xl font-bold text-[#454888] mb-4">Quizzes</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {instruments?.map((instrument) => (
                        <Link 
                            href={`/learning/quiz/${instrument.id}`} 
                            key={instrument.id}
                        >
                            <div className="p-4 bg-white shadow rounded border border-[#6D6E93] border-2 w-[300px]">
                                {instrument.name}
                            </div>
                        </Link>
                    ))}
                </div>
               
            </div>
        </div>
    );
}
