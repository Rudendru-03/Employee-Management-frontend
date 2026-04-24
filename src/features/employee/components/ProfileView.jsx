import React from 'react';

const ProfileView = ({ employee, onEdit }) => {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header with Photo and Basic Info */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-5 -mt-16">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover"
                src={employee?.photoUrl || 'https://via.placeholder.com/96?text=No+Photo'}
                alt={employee?.userId?.email}
              />
            </div>
            <div className="mt-6 md:mt-0 md:flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {employee?.userId?.email}
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                ID: {employee?._id}
              </p>
            </div>
            <button
              onClick={onEdit}
              className="mt-4 md:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-indigo-100 rounded-full p-3 mr-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
            <p className="text-gray-900 text-lg mt-1">{formatDate(employee?.dateOfBirth)}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Gender</label>
            <p className="text-gray-900 text-lg mt-1">{employee?.gender || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Phone Number</label>
            <p className="text-gray-900 text-lg mt-1">{employee?.phoneNumber || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Work Location</label>
            <p className="text-gray-900 text-lg mt-1">{employee?.workLocation || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-red-100 rounded-full p-3 mr-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          Emergency Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Contact Information</label>
            <p className="text-gray-900 text-lg mt-1">{employee?.emergencyContact || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="bg-green-100 rounded-full p-3 mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          Bank Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">Bank Name</label>
            <p className="text-gray-900 text-lg mt-1">{employee?.bankName || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Account Number</label>
            <p className="text-gray-900 text-lg mt-1">
              {employee?.bankAccountNumber ? `****${employee?.bankAccountNumber?.slice(-4)}` : 'N/A'}
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Account Holder Name</label>
            <p className="text-gray-900 text-lg mt-1">{employee?.bankAccountHolderName || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Address</label>
            <p className="text-gray-900 text-lg mt-1">{employee?.bankAccountHolderAddress || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Department & Manager */}
      {(employee?.department || employee?.reportingManager) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-purple-100 rounded-full p-3 mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
              </svg>
            </span>
            Organization Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {employee?.department && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Department</label>
                <p className="text-gray-900 text-lg mt-1">{employee?.department?.name || 'N/A'}</p>
              </div>
            )}
            {employee?.reportingManager && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Reporting Manager</label>
                <p className="text-gray-900 text-lg mt-1">
                  {employee?.reportingManager?.email || 'N/A'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
