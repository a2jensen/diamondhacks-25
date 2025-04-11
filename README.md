## What it does

Memo is a comprehensive knowledge management platform that combines the power of note-taking with active learning tools in one seamless experience:

- **Smart Notes**: Create Markdown-based notes that support rich formatting, code snippets, and embedded content
- **AI-Powered Learning**: Transform your notes into interactive flashcards and quizzes with Gemini AI assistance
- **Visual Organization**: View connections between your ideas through a visual node-based interface
- **Authentication**: Secure user authentication powered by Supabase
- **Responsive Design**: Beautiful UI that works across devices using Next.js and Tailwind CSS

The platform serves as your digital second brain, where information doesn't just sit idly but becomes part of an active learning system enhanced by AI.

## How we built it

We built Memo using a modern tech stack optimized for performance, security, and AI integration:

- **Next.js**: For the frontend framework, providing both server-side rendering and static site generation capabilities
- **Supabase**: For authentication, database, and storage needs
- **Gemini AI**: For intelligent content analysis, flashcard generation, and quiz creation
- **Tailwind CSS**: For responsive styling with a component-based approach
- **shadcn/ui**: For beautiful, accessible UI components
- **React**: For the interactive user interface elements
- **TypeScript**: For type safety and improved developer experience

Our development process began with integrating Gemini's powerful AI capabilities into our workflow. We used Gemini to analyze note content, identify key concepts, and automatically generate learning materials. This AI foundation allowed us to build smarter features throughout the application.

The authentication system was implemented using Supabase, providing secure user management with features like password reset and session persistence. We structured our Next.js application with a clear separation between authentication pages, note management, learning tools, and the visual node interface.

We leveraged Gemini's natural language processing capabilities to:
- Extract important concepts from notes
- Generate meaningful flashcards with appropriate question-answer pairs
- Create quizzes that test understanding rather than just memorization
- Suggest connections between different notes and topics

