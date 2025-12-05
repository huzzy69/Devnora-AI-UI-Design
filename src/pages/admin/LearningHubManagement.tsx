import React from 'react';
import { BookOpen, Video, FileText, Users, Plus } from 'lucide-react';

export default function LearningHubManagement() {
  const courses = [
    {
      title: 'Getting Started with Horosoft',
      lessons: 8,
      students: 1250,
      status: 'Published'
    },
    {
      title: 'Advanced AI Features',
      lessons: 12,
      students: 890,
      status: 'Published'
    },
    {
      title: 'Website Replication Guide',
      lessons: 10,
      students: 670,
      status: 'Draft'
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Learning Hub Management</h1>
          <p className="text-slate-600">Manage courses and educational content</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Courses', value: '24', icon: BookOpen, color: 'blue' },
          { label: 'Total Students', value: '2,810', icon: Users, color: 'green' },
          { label: 'Video Lessons', value: '156', icon: Video, color: 'purple' },
          { label: 'Articles', value: '89', icon: FileText, color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div className={`text-3xl mb-1 text-${stat.color}-600`}>{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Courses List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl text-slate-900">All Courses</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {courses.map((course, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50">
              <div>
                <h3 className="text-lg text-slate-900 mb-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>{course.lessons} lessons</span>
                  <span>•</span>
                  <span>{course.students} students</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-sm rounded-lg ${
                    course.status === 'Published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {course.status}
                </span>
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
