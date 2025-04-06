import Link from 'next/link';

export default function Learning() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Main Section Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#454888]">Learning Resources</h1>
                <hr className="mt-2 border-[#ccc]" />
            </div>

            {/* FlashCards Section */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-[#454888] mb-4">FlashCards</h2>
                {/* Placeholder for FlashCard widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Example FlashCard widget */}
                    <div className="p-4 bg-white shadow rounded border">Flashcard</div>
                    <div className="p-4 bg-white shadow rounded border">Flashcard 2</div>
                </div>
            </div>

            {/* Quizzes Section */}
            <div>
                <h2 className="text-xl font-bold text-[#454888] mb-4">Quizes</h2>
                {/* Placeholder for Quiz widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Example Quiz widget */}
                    <div className="p-4 bg-white shadow rounded border w-[260px]">Quiz 1</div>
                    <div className="p-4 bg-white shadow rounded border">Quiz 2</div>
                </div>
            </div>
        </div>
    );
}