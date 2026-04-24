import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileView from '../components/ProfileView';
import ProfileEdit from '../components/ProfileEdit';
import { employeeService } from '../services/employeeService';

const Profile = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEmployeeProfile();
  }, []);

  const fetchEmployeeProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await employeeService.getProfile();
      setEmployee(data);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (formData) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      // Prepare data for update (exclude photoUrl if it's a data URL, it will be handled separately)
      const updateData = { ...formData };
      const photoUrl = updateData.photoUrl;
      delete updateData.photoUrl;

      // Update profile
      await employeeService.updateProfile(updateData);

      // Upload photo if it was changed
      if (photoUrl && photoUrl.startsWith('data:')) {
        await employeeService.uploadPhoto(photoUrl);
      }

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      await fetchEmployeeProfile();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Header with Back Button */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
              <h1 className="text-4xl font-bold text-gray-900">
                {isEditing ? 'Edit Profile' : 'My Profile'}
              </h1>
              <p className="mt-2 text-gray-600">
                {isEditing ? 'Update your personal and professional information' : 'View and manage your profile information'}
              </p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Content */}
          {isEditing ? (
            <ProfileEdit
              employee={employee}
              onSave={handleSaveProfile}
              onCancel={handleCancel}
              loading={saving}
            />
          ) : (
            <ProfileView
              employee={employee}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
