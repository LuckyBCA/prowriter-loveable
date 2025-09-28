import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      throw new Error('Unauthorized');
    }

    // Check daily limit
    const { data: usage } = await supabaseClient
      .from('daily_usage')
      .select('articles_generated')
      .eq('user_id', user.id)
      .eq('date', new Date().toISOString().split('T')[0])
      .single();

    if (usage && usage.articles_generated >= 5) {
      return new Response(JSON.stringify({ 
        error: 'Daily limit reached. You can generate up to 5 articles per day.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { 
      topic, 
      audience, 
      tone, 
      length, 
      keywords = [], 
      context = '',
      apiProvider = 'deepseek' 
    } = await req.json();

    // Prepare the prompt
    const prompt = `Write a comprehensive ${length}-word article about "${topic}" for ${audience} audience in a ${tone} tone.
    
    ${context ? `Additional context: ${context}` : ''}
    ${keywords.length > 0 ? `Include these keywords naturally: ${keywords.join(', ')}` : ''}
    
    Requirements:
    - Write an engaging, well-structured article
    - Include proper headings and subheadings
    - Make it SEO-friendly
    - Provide valuable insights and information
    - Include a compelling introduction and conclusion
    
    Format the response as clean, readable text with proper markdown formatting.`;

    let generatedText = '';
    let apiKey = '';
    let apiUrl = '';
    let requestBody: any = {};

    if (apiProvider === 'deepseek') {
      apiKey = Deno.env.get('DEEPSEEK_API_KEY') ?? '';
      apiUrl = 'https://api.deepseek.com/chat/completions';
      requestBody = {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a professional content writer who creates high-quality, engaging articles.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: Math.max(parseInt(length) * 1.5, 2000),
        temperature: 0.7
      };
    } else if (apiProvider === 'openrouter') {
      apiKey = Deno.env.get('OPENROUTER_API_KEY') ?? '';
      apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
      requestBody = {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: 'You are a professional content writer who creates high-quality, engaging articles.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: Math.max(parseInt(length) * 1.5, 2000),
        temperature: 0.7
      };
    }

    console.log(`Generating article with ${apiProvider}...`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    generatedText = data.choices[0].message.content;

    // Calculate word count and SEO score
    const wordCount = generatedText.split(/\s+/).length;
    const seoScore = Math.min(95, Math.max(60, 
      (keywords.length * 10) + 
      (generatedText.toLowerCase().includes(topic.toLowerCase()) ? 20 : 0) +
      (wordCount >= parseInt(length) * 0.8 ? 20 : 10) +
      Math.floor(Math.random() * 20) + 30
    ));

    // Save article to database
    const { data: article, error: articleError } = await supabaseClient
      .from('articles')
      .insert({
        user_id: user.id,
        title: topic,
        content: generatedText,
        status: 'draft',
        word_count: wordCount,
        seo_score: seoScore,
        category: 'General',
        keywords: keywords,
        tone: tone,
        audience: audience,
        citations: []
      })
      .select()
      .single();

    if (articleError) {
      console.error('Error saving article:', articleError);
      throw new Error('Failed to save article');
    }

    // Update daily usage
    await supabaseClient.rpc('increment_daily_usage', {
      user_id: user.id,
      words: wordCount
    });

    console.log('Article generated and saved successfully');

    return new Response(JSON.stringify({ 
      article: {
        id: article.id,
        title: article.title,
        content: article.content,
        word_count: wordCount,
        seo_score: seoScore,
        status: article.status,
        created_at: article.created_at
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-article function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to generate article' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});