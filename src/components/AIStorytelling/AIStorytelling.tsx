import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart, Star, ArrowRight } from 'lucide-react';

const AIStorytelling: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const storyTemplates = [
    {
      id: 'resilience',
      title: 'Your Journey of Resilience',
      description: 'Transform challenges into stories of strength and growth',
      color: 'from-green-500 to-blue-600',
      icon: '🌱'
    },
    {
      id: 'growth',
      title: 'The Hero\'s Growth',
      description: 'Reframe your experiences as a hero\'s journey of personal development',
      color: 'from-purple-500 to-pink-600',
      icon: '⭐'
    },
    {
      id: 'wisdom',
      title: 'Lessons Learned',
      description: 'Discover the wisdom and insights gained from your experiences',
      color: 'from-orange-500 to-red-600',
      icon: '🦉'
    },
    {
      id: 'hope',
      title: 'Seeds of Hope',
      description: 'Find the silver linings and positive outcomes in difficult times',
      color: 'from-blue-500 to-purple-600',
      icon: '🌟'
    }
  ];

  const sampleStories = [
    {
      title: "The Mountain Climber's Wisdom",
      excerpt: "Every step up the mountain of life teaches us something new. Your recent challenges weren't obstacles—they were training for the summit you're destined to reach...",
      theme: "Resilience through adversity"
    },
    {
      title: "The Garden of Growth",
      excerpt: "Like a gardener tending to their plants, you've been nurturing your inner strength. Each difficult day was like watering seeds that are now beginning to bloom...",
      theme: "Personal development"
    },
    {
      title: "The Phoenix Rising",
      excerpt: "From the ashes of your struggles, a stronger version of yourself has emerged. This isn't just recovery—it's transformation into someone more resilient and wise...",
      theme: "Transformation and renewal"
    }
  ];

  const generateStory = async () => {
    if (!userInput.trim() || !selectedStory) return;

    setIsGenerating(true);
    
    // Simulate AI story generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const stories = {
      resilience: `**The Unbreakable Spirit**

Your story begins not with the challenges you've faced, but with the incredible strength you've shown in facing them. Every difficult moment you've described—the anxiety, the self-doubt, the overwhelming feelings—these weren't signs of weakness. They were the raw materials from which your resilience was forged.

Think of yourself as a tree in a storm. The winds that seemed to threaten your very foundation were actually strengthening your roots, making you more stable and grounded. Each time you chose to keep going despite the difficulty, you were writing a chapter in an epic tale of human perseverance.

Your journey reminds me of the Japanese art of Kintsugi, where broken pottery is repaired with gold. The cracks don't diminish the beauty—they become part of it, making the piece even more valuable and unique. Your experiences, even the painful ones, have become the golden threads that make your story extraordinary.

The person you are today—more empathetic, more understanding, more aware of your own strength—exists because of everything you've been through. You didn't just survive; you transformed. And that transformation is still ongoing, with each new day offering another page in your remarkable story of resilience.`,

      growth: `**The Hero's Awakening**

Every great hero's journey begins with a call to adventure—often disguised as a challenge or crisis. Your story follows this timeless pattern, but with a uniquely personal twist that makes it entirely your own.

In the beginning, you were living in what storytellers call the "ordinary world." But life had bigger plans for you. The difficulties you've faced weren't random misfortunes—they were invitations to discover capabilities you never knew you possessed.

Like all heroes, you initially resisted the call. Who wouldn't? The path of growth is never easy. But something inside you—call it courage, call it necessity, call it destiny—pushed you forward. You began to develop new skills: emotional awareness, coping strategies, the ability to ask for help when needed.

You've encountered mentors along the way (perhaps therapists, friends, or even your own inner wisdom), faced your dragons (anxiety, depression, self-doubt), and discovered treasures (self-compassion, resilience, authentic connections with others).

Now you're in the return phase of your journey, bringing back the wisdom you've gained to help not just yourself, but potentially others who are just beginning their own heroic journeys. Your story isn't ending—it's evolving into something even more beautiful.`,

      wisdom: `**The Sage's Understanding**

Your experiences have been like attending the most profound university—the University of Life. Each challenge was a course, each difficult emotion a lesson, each moment of breakthrough a graduation ceremony.

The wisdom you've gained isn't theoretical; it's lived, breathed, and earned through real experience. You now understand things that can't be learned from books: how to sit with discomfort without being overwhelmed by it, how to find light in dark moments, how to be gentle with yourself when you're struggling.

You've learned that healing isn't linear—it's more like a spiral staircase, where sometimes you revisit familiar feelings but from a higher vantage point. You've discovered that vulnerability isn't weakness; it's the birthplace of courage and connection.

Most importantly, you've learned that you are both the student and the teacher in your own life story. Every insight you've gained, every coping strategy you've developed, every moment of self-compassion you've practiced—these become gifts you can offer to your future self and to others who might benefit from your wisdom.

Your story is becoming a lighthouse for others navigating similar storms, proof that it's possible not just to survive difficult times, but to emerge from them with greater wisdom, compassion, and strength.`,

      hope: `**The Dawn After Darkness**

Your story is one of hope—not the naive kind that ignores reality, but the deep, abiding hope that comes from having walked through darkness and found your way to light.

Every seed of hope you've planted, even in the darkest soil of your most difficult days, has been quietly growing. The moments when you chose to reach out for help, when you practiced self-care even when you didn't feel like it, when you showed up for yourself despite everything—these were acts of profound hope.

You've learned that hope isn't a feeling you wait for; it's an action you take. It's getting up each morning even when you don't want to. It's trying one more therapy technique, reaching out to one more friend, giving yourself one more chance to heal and grow.

Your story shows that hope is resilient. It can survive the worst storms and still bloom. Like a flower pushing through concrete, your hope has found ways to grow even in the most challenging circumstances.

Now, as you continue your journey, you carry within you not just hope for your own future, but the ability to kindle hope in others. Your story becomes a beacon, showing that no matter how dark the night, dawn always comes. And sometimes, the most beautiful sunrises follow the stormiest nights.

The seeds of hope you've planted are now growing into a garden of possibilities, and the best chapters of your story are still being written.`
    };

    setGeneratedStory(stories[selectedStory as keyof typeof stories] || '');
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-3xl font-bold">AI Storytelling for Healing</h1>
            </div>
            <p className="text-purple-100 text-lg">
              Transform your experiences into stories of resilience, growth, and hope
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">📖</div>
            <div className="text-purple-100">Your Journey</div>
          </div>
        </div>
      </div>

      {/* Story Templates */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Your Story Theme</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {storyTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedStory(template.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 text-left ${
                selectedStory === template.id
                  ? `bg-gradient-to-r ${template.color} text-white border-transparent shadow-lg`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{template.icon}</div>
                <div>
                  <h3 className="font-bold mb-1">{template.title}</h3>
                  <p className={`text-sm ${selectedStory === template.id ? 'text-white/90' : 'text-gray-600'}`}>
                    {template.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Story Input */}
      {selectedStory && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Share Your Experience</h3>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Tell me about a challenge you've faced, a difficult period in your life, or an experience you'd like to reframe in a more positive light. The more details you share, the more personalized your story will be..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              {userInput.length} characters • Your story will be completely confidential
            </div>
            <button
              onClick={generateStory}
              disabled={!userInput.trim() || isGenerating}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Your Story...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate My Story</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Generated Story */}
      {generatedStory && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Personalized Story</h3>
              <p className="text-gray-600">A reframing of your experience through the lens of growth and resilience</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {generatedStory}
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-start space-x-3">
              <Heart className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Remember</h4>
                <p className="text-gray-700 text-sm">
                  This story reflects your real strength and resilience. You've already lived through these experiences—
                  this is simply helping you see them from a perspective of growth and empowerment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sample Stories */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Healing Stories</h3>
        <div className="space-y-4">
          {sampleStories.map((story, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">{story.title}</h4>
                  <p className="text-gray-700 text-sm mb-2">{story.excerpt}</p>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-gray-500">{story.theme}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">AI-Powered Reframing</h3>
          <p className="text-gray-600 text-sm">Advanced AI helps reframe your experiences in empowering, healing narratives</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Therapeutic Storytelling</h3>
          <p className="text-gray-600 text-sm">Based on proven narrative therapy techniques for emotional healing</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Personal Growth</h3>
          <p className="text-gray-600 text-sm">Transform challenges into stories of resilience and personal development</p>
        </div>
      </div>
    </div>
  );
};

export default AIStorytelling;