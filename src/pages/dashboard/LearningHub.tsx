import React, { useState } from 'react';
import { BookOpen, Play, Check, Clock, TrendingUp, Search, Filter, Star } from 'lucide-react';

export default function LearningHub() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Getting Started', 'AI Tools', 'Advanced', 'Best Practices'];

  const courses = [
    {
      title: 'Getting Started with Devnora AI',
      description: 'Learn the basics of building with AI',
      duration: '45 min',
      lessons: 8,
      level: 'Beginner',
      progress: 100,
      thumbnail: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Mastering the Website Replicator',
      description: 'Clone and customize any website',
      duration: '1.5 hrs',
      lessons: 12,
      level: 'Intermediate',
      progress: 60,
      thumbnail: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Advanced Workflow Automation',
      description: 'Build complex workflows with AI',
      duration: '2 hrs',
      lessons: 15,
      level: 'Advanced',
      progress: 0,
      thumbnail: 'from-purple-500 to-pink-500'
    },
    {
      title: 'AI Code Generation Best Practices',
      description: 'Write better prompts for better code',
      duration: '1 hr',
      lessons: 10,
      level: 'Intermediate',
      progress: 30,
      thumbnail: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Learning Hub</h1>
        <p className="text-slate-600">Master the platform with interactive tutorials and guides</p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl"
          />
        </div>
        <button className="px-6 py-3 bg-white border border-slate-300 rounded-xl flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category.toLowerCase()
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-40 bg-gradient-to-br ${course.thumbnail} p-6 flex items-center justify-center`}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-slate-700" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{course.level}</span>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
              </div>
              <h3 className="text-xl mb-2 text-slate-900">{course.title}</h3>
              <p className="text-slate-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-600">{course.lessons} lessons</span>
                <span className="text-sm text-blue-600">{course.progress}% complete</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}