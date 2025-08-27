import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import Nav from './Nav';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [pdfName, setPdfName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { getToken } = useAuth();

  // Clean up preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError(`Invalid file type for cover image. Only JPEG or PNG files are allowed.`);
        setCoverImage(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Cover image must be less than 5MB.');
        setCoverImage(null);
        return;
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null); // Clear error on valid file selection
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (file.type !== 'application/pdf') {
        setError('Invalid file type. Only PDF files are allowed.');
        setPdfFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('PDF file must be less than 5MB.');
        setPdfFile(null);
        return;
      }
      setPdfFile(file);
      setPdfName(file.name);
      setError(null); // Clear error on valid file selection
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Clear error on any field change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Validate form fields
    if (!formData.title.trim() || !formData.content || !pdfFile || !coverImage) {
      setError('Please fill in all required fields and upload both PDF and cover image.');
      setLoading(false);
      return;
    }

    try {
      const token = await getToken();
     

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('content', formData.content);
      formDataToSend.append('pdf', pdfFile);
      formDataToSend.append('coverImage', coverImage);

 
      const response = await fetch('https://library-3hxq.vercel.app/api/books/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

   

      // Check if response is JSON before trying to parse
      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;

        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            console.error('Failed to parse error response as JSON:', parseError);
          }
        } else {
          // If response is not JSON, it might be HTML error page
          const textResponse = await response.text();
          console.error('Non-JSON error response:', textResponse.substring(0, 200) + '...');

          if (response.status === 500) {
            errorMessage = 'Internal server error. Please check server logs and try again.';
          } else if (response.status === 401) {
            errorMessage = 'Authentication failed. Please try logging in again.';
          } else if (response.status === 413) {
            errorMessage = 'File too large. Please reduce file size and try again.';
          }
        }

        throw new Error(errorMessage);
      }

      // Parse successful response
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        console.warn('Expected JSON response but got:', contentType);
        data = { message: 'Upload completed successfully' };
      }

    
      setSuccess('Book uploaded successfully!');

      // Reset form
      setFormData({ title: '', content: '' });
      setPdfFile(null);
      setCoverImage(null);
      setPdfName('');
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

    } catch (error) {
      console.error('❌ Error posting book:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white relative overflow-hidden">
      <Nav />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>

      {/* Floating orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

      <div className="relative z-10 mt-32 container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl text-center font-black mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
            Upload Your Favorite Books
          </span>
        </motion.h1>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-8 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
              {/* Success Message */}
              {success && (
                <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm">
                  {success}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Title Field */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="title" className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Book Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter the book title..."
                  aria-label="Book title"
                  className="w-full bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-white/30"
                />
              </motion.div>

              {/* Category Field */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label htmlFor="category" className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Category
                </label>
                <select
                  id="category"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  aria-label="Book category"
                  className="w-full bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-white/30"
                >
                  <option value="" className="bg-slate-800">Select a category</option>
                  <option value="Technologies" className="bg-slate-800">Technologies</option>
                  <option value="Business" className="bg-slate-800">Business</option>
                  <option value="Entertainment" className="bg-slate-800">Entertainment</option>
                  <option value="Science" className="bg-slate-800">Science</option>
                  <option value="Politics" className="bg-slate-800">Politics</option>
                </select>
              </motion.div>

              {/* PDF Upload */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label htmlFor="pdf" className="text-lg font-semibold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Upload PDF File
                </label>
                <div className="relative">
                  <input
                    id="pdf"
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfChange}
                    aria-label="Upload PDF file"
                    className="w-full bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white file:cursor-pointer hover:border-white/30 transition-all duration-300 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                  />
                  {pdfName && (
                    <div className="mt-2 p-3 bg-slate-900/30 rounded-lg border border-purple-500/20">
                      <span className="text-purple-300 text-sm">📄 {pdfName}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Cover Image Upload */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label htmlFor="coverImage" className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Cover Image
                </label>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  aria-label="Upload cover image"
                  className="w-full bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white file:cursor-pointer hover:border-white/30 transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

                {previewUrl && (
                  <motion.div
                    className="flex justify-center mt-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Cover Preview"
                        className="w-48 h-64 object-cover rounded-xl border-2 border-white/20 shadow-2xl group-hover:border-purple-500/50 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/25 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  <span className="text-lg">{loading ? 'Uploading...' : 'Upload Book'}</span>
                </button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;