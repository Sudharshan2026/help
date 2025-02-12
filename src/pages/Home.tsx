import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, UserCheck, School, GraduationCap, Award, BookOpen, Users } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <div className="relative bg-[#bd9607] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Department of Artificial Intelligence and Data Science
            </h1>
            <p className="text-xl opacity-90">
              Empowering students with cutting-edge AI and Data Science education
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="AI Education"
            className="object-cover w-full h-full opacity-20"
          />
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/od" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div className="text-[#bd9607] mb-4 group-hover:scale-110 transition-transform">
              <FileText size={40} />
            </div>
            <h2 className="text-xl font-semibold mb-2">OD Request</h2>
            <p className="text-gray-600">
              Submit on-duty requests for academic activities and events
            </p>
          </Link>

          <Link to="/leave" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div className="text-[#bd9607] mb-4 group-hover:scale-110 transition-transform">
              <Clock size={40} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Leave Request</h2>
            <p className="text-gray-600">
              Apply for leave due to personal or medical reasons
            </p>
          </Link>

          <Link to="/status" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div className="text-[#bd9607] mb-4 group-hover:scale-110 transition-transform">
              <UserCheck size={40} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Check Status</h2>
            <p className="text-gray-600">
              Track your OD and leave request status
            </p>
          </Link>

          <Link to="/admin" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div className="text-[#bd9607] mb-4 group-hover:scale-110 transition-transform">
              <Users size={40} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Admin Portal</h2>
            <p className="text-gray-600">
              Manage and review student requests
            </p>
          </Link>
        </div>
      </div>

      {/* Department Highlights */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Department Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-md">
                <School className="text-[#bd9607]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-gray-600">Experienced professors and industry experts</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-md">
                <GraduationCap className="text-[#bd9607]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Curriculum</h3>
              <p className="text-gray-600">Industry-aligned AI & DS coursework</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-md">
                <Award className="text-[#bd9607]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certifications</h3>
              <p className="text-gray-600">Professional certifications and training</p>
            </div>

            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-md">
                <BookOpen className="text-[#bd9607]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Research Focus</h3>
              <p className="text-gray-600">Cutting-edge research opportunities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Image */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://ai.sairam.edu.in/wp-content/uploads/sites/10/2024/04/SEC-AIDS-Banners-1.png"
            alt="College Campus"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Sri Sairam Engineering College</h2>
              <p className="text-xl">Shaping the future of AI and Data Science education</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};