import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Music, Plus, Check } from 'lucide-react';
import axios from 'axios';

const MusicUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  // List of genre tags for suggestions
  const genreSuggestions = [
    'rock', 'pop', 'jazz', 'classical', 'electronic', 'hip-hop', 
    'r&b', 'folk', 'country', 'indie', 'ambient', 'metal', 'punk'
  ];
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = (selectedFile) => {
    // Check if the file is an audio file
    if (!selectedFile.type.startsWith('audio/')) {
      setError('Please upload a valid audio file (MP3, WAV, etc.)');
      return;
    }
    
    // Check if the file size is under 10MB (example limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError('');
  };
  
  const handleAddTag = () => {
    const trimmedTag = currentTag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setCurrentTag('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const addSuggestedTag = (tag) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an audio file to upload');
      return;
    }
    
    if (!title.trim()) {
      setError('Please provide a title for your music');
      return;
    }
    
    setUploading(true);
    setProgress(0);
    setError('');
    
    // Create form data for upload
    const formData = new FormData();
    formData.append('audio_file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));
    
    try {
      // In a real implementation, this would be your actual API endpoint
      // Use axios to track upload progress
      await axios.post('/api/music/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      
      setSuccess(true);
      
      // Redirect to profile after a brief delay
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload music. Please try again later.');
    } finally {
      setUploading(false);
    }
  };
  
  // For development purposes, simulate a successful upload
  const handleMockSubmit = (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an audio file to upload');
      return;
    }
    
    if (!title.trim()) {
      setError('Please provide a title for your music');
      return;
    }
    
    setUploading(true);
    setProgress(0);
    setError('');
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate upload completion
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setUploading(false);
      setSuccess(true);
      
      // Redirect to profile after a brief delay
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Upload Music</h1>
      
      {success ? (
        <div className="bg-green-900/30 border border-green-700 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-green-900/50 rounded-full mx-auto flex items-center justify-center mb-4">
            <Check size={32} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Upload Successful!</h2>
          <p className="text-gray-300 mb-4">Your music has been uploaded successfully.</p>
          <p className="text-gray-400">Redirecting to your profile...</p>
        </div>
      ) : (
        <form onSubmit={handleMockSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              dragActive 
                ? 'border-purple-500 bg-purple-900/10' 
                : file 
                  ? 'border-green-500 bg-green-900/10' 
                  : 'border-gray-700 hover:border-gray-600'
            }`}
            onClick={handleFileInputClick}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
              accept="audio/*"
            />
            
            {file ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Music size={32} className="text-purple-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{fileName}</h3>
                <p className="text-gray-400 text-sm">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setFileName('');
                  }}
                  className="mt-4 text-red-500 hover:text-red-400 flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Remove file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Upload size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">Drag & drop your audio file</h3>
                <p className="text-gray-400 mb-4">or click to browse</p>
                <p className="text-gray-500 text-sm">Supports MP3, WAV, FLAC, AAC (Max 10MB)</p>
              </div>
            )}
          </div>
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-300 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Title of your track or album"
              required
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px]"
              placeholder="Tell listeners about your music..."
            />
          </div>
          
          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-gray-300 mb-2">
              Tags (up to 5)
            </label>
            
            <div className="flex items-center mb-2">
              <input
                type="text"
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add genre or descriptive tags"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={!currentTag.trim() || tags.length >= 5}
                className="ml-2 bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
              </button>
            </div>
            
            {/* Tag suggestions */}
            <div className="mb-3">
              <p className="text-sm text-gray-400 mb-2">Suggested genres:</p>
              <div className="flex flex-wrap gap-2">
                {genreSuggestions.slice(0, 8).map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => addSuggestedTag(genre)}
                    disabled={tags.includes(genre) || tags.length >= 5}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Selected tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-purple-400 hover:text-purple-300"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-200">
              {error}
            </div>
          )}
          
          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Uploading...</span>
                <span className="text-gray-400">{progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? 'Uploading...' : 'Upload Music'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MusicUpload;