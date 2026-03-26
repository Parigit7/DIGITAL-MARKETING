import React, { useState, useEffect } from 'react'
import { employeeAPI } from '../../services/api'

function MyProfile({ user }) {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await employeeAPI.getById(user.employeeId)
      setProfileData(response.data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      {loading ? (
        <div className="card text-center py-12">
          <p>Loading profile...</p>
        </div>
      ) : profileData ? (
        <div className="card">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{profileData.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600 text-sm">Email</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.email}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">Job Role</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.jobRole}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">NIC</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.nic}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">Birthday</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.birthday}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">Gender</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.gender}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">Status</label>
                    <p className={`text-lg font-semibold ${profileData.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                      {profileData.status}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600 text-sm">Phone Number</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.phoneNo}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">WhatsApp Number</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.whatsappNo}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">Address</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.address}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">Join Date</label>
                    <p className="text-lg font-semibold text-gray-900">{profileData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {profileData.jobDescription && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                <p className="text-gray-600 leading-relaxed">{profileData.jobDescription}</p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-300 pt-6">
            <p className="text-gray-600 text-sm text-center">
              Note: Your profile information cannot be edited by you. Please contact the admin if you need to update any information.
            </p>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-600">Could not load profile</p>
        </div>
      )}
    </div>
  )
}

export default MyProfile
