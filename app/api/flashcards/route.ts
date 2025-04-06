import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  try {
    // Add logging to see if the route is being hit
    console.log('Flashcards API route hit');
    
    // Parse request body
    let requestBody;
    try {
      requestBody = await request.json();
      console.log('Request body parsed successfully:', requestBody);
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    const { setName, flashcards, noteId } = requestBody;
    
    // Validate required fields
    if (!setName || !flashcards || !Array.isArray(flashcards) || !noteId) {
      console.error('Missing required fields', { setName, flashcards, noteId });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get Supabase client and authenticate user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Insert flashcard set based on your original function schema
    console.log('Inserting flashcard set:', { title: setName, source_note_id: noteId, user_id: user.id });
    const { data: flashcardSet, error: setError } = await supabase
      .from("flashcard_sets")
      .insert([
        {
          title: setName,
          source_note_id: noteId,
          user_id: user.id,
        },
      ])
      .select()
      .single();
      
    if (setError || !flashcardSet) {
      console.error('Error creating flashcard set:', setError);
      return NextResponse.json(
        { error: `Failed to create flashcard set: ${setError?.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
    
    console.log('Flashcard set created successfully:', flashcardSet);
    
    // Insert individual flashcards with the correct schema
    const formattedFlashcards = flashcards.map((card: any, index: number) => ({
      front: card.front,
      back: card.back,
      flashcard_set_id: flashcardSet.id,
      order: index, // optional: helps order the cards
    }));
    
    console.log('Inserting flashcards:', formattedFlashcards);
    const { data: cardData, error: flashcardError } = await supabase
      .from("flashcards")
      .insert(formattedFlashcards);
      
    if (flashcardError) {
      console.error('Error creating flashcards:', flashcardError);
      return NextResponse.json(
        { error: `Failed to create flashcards: ${flashcardError.message}` },
        { status: 500 }
      );
    }
    
    console.log('Flashcards created successfully');
    
    return NextResponse.json({ 
      success: true, 
      flashcardSet
    });
  }
  catch (error: any) {
    console.error('Error creating flashcards:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}