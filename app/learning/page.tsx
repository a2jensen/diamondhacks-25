import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function Learning() {
    const supabase = await createClient();
    const { data: instruments } = await supabase.from("instruments").select();

    return (
        <div className="p-2 max-w-6xl mx-auto">
            {/* Main Section Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#454888] mb-1 font-mono text-shadow-lg">Learning Resources</h1>
                <hr className="border-dashed border-[#5E3023] rounded-full border-1" />
                </div>

            {/* FlashCards Section */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-[#454888] mb-4 font-mono">Flash Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {instruments?.map((instrument) => (
                        <Link 
                            href={`/learning/flashcards/${instrument.id}`} 
                            key={instrument.id}
                        >
                            <div className="p-4  bg-[#6D6E93] rounded border border-[#5E3023] border-1 w-[300px] shadow-md shadow-[#000000] hover:border-[#000000] hover:bg-[#6D6E93] hover:text-white hover:shadow-[#000000] text-[#F5F0EE] font-mono bg-[#6D6E93] border-[#D4C0E2] cursor-pointer shadow-md rounded border transform transition duration-300 hover:-translate-y-2 hover:scale-105 ">
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
                            <div className="p-4 bg-[#6D6E93] shadow rounded border border-[#5E3023] border-1 w-[300px] hover:border-[#000000] hover:bg-[#6D6E93] hover:text-white shadow-md shadow-[#000000] hover:shadow-[#000000] text-[#F5F0EE] font-mono hover:border-[#000000] hover:bg-[#6D6E93] hover:text-white text-[#F5F0EE] font-mono bg-[#6D6E93] border-[#D4C0E2] cursor-pointer shadow-md rounded border transform transition duration-300 hover:-translate-y-2 hover:scale-105 ">
                                {instrument.name}
                            </div>
                        </Link>
                    ))}
                </div>
               
            </div>
        </div>
    );
}
