import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth, useUser } from "@clerk/clerk-react";
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      const token = await getToken();
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/canvas/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.data.success) {
          setProjects(response.data.canvases);
        } else {
          setError("No canvases found.");
        }
      } catch (err) {
        setError("Error fetching projects: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user, getToken, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#dbeafe] to-[#f0fdfa] px-6 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-[#2f5376] mb-10">Your Projects</h1>

      {loading && (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      )}

      {error && (
        <p className="text-center text-lg text-red-500">{error}</p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-center text-lg text-gray-600">You have no projects yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:border-[#54B6CA] hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-[#2f5376] mb-2">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Created At: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <NavLink
              to={`/project/${project._id}`}
              className="inline-block px-4 py-2 text-sm bg-[#54B6CA] text-white rounded hover:bg-[#3e9ab2] transition"
            >
              Open Project
            </NavLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
