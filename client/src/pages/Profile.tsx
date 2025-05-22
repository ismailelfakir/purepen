import React, { useState, useEffect } from 'react';
import { User, Settings, Lock, Download, Trash2 } from 'lucide-react';
import Button from '../components/Button';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem('userName') || 'John Doe';
    const userEmail = localStorage.getItem('userEmail') || 'john.doe@example.com';
    
    setName(userName);
    setEmail(userEmail);
    setBio('Student at University of Technology, majoring in Computer Science.');
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Account Settings</h1>
      
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-dark-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === 'profile'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </button>
          
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === 'security'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Lock className="h-5 w-5 mr-2" />
            Security
          </button>
          
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === 'privacy'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Settings className="h-5 w-5 mr-2" />
            Privacy & Data
          </button>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Profile Information</h2>
              
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 dark:border-dark-600 shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 dark:border-dark-600 shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 dark:border-dark-600 shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      onClick={handleSaveProfile}
                      isLoading={isSaving}
                    >
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="sm:flex sm:items-start border-b border-gray-200 dark:border-dark-700 pb-6 mb-6">
                    <div className="bg-primary-100 dark:bg-primary-900/50 h-16 w-16 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl font-bold">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="mt-4 sm:mt-0 sm:ml-6">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">{name}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{email}</p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{bio}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Subscription</h3>
                    <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-md p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Free Plan</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Basic integrity checking with limited submissions</p>
                      </div>
                      <Button variant="secondary">Upgrade</Button>
                    </div>
                  </div>
                  
                  <div>
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Security Settings</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-1 w-full rounded-md border-gray-300 dark:border-dark-600 shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-1 w-full rounded-md border-gray-300 dark:border-dark-600 shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="mt-1 w-full rounded-md border-gray-300 dark:border-dark-600 shadow-sm focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <Button>
                      Update Password
                    </Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Add an extra layer of security to your account by requiring both your password and a verification code.
                  
                  </p>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Privacy & Data Tab */}
          {activeTab === 'privacy' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Privacy & Data</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Data Storage</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Control how long we store your submissions and feedback data.
                  </p>
                  <div className="max-w-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="store-30days"
                          name="data-retention"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 dark:text-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 border-gray-300 dark:border-dark-600"
                        />
                        <label htmlFor="store-30days" className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Store for 30 days
                        </label>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="store-90days"
                          name="data-retention"
                          type="radio"
                          className="h-4 w-4 text-primary-600 dark:text-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 border-gray-300 dark:border-dark-600"
                        />
                        <label htmlFor="store-90days" className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Store for 90 days
                        </label>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="dont-store"
                          name="data-retention"
                          type="radio"
                          className="h-4 w-4 text-primary-600 dark:text-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 border-gray-300 dark:border-dark-600"
                        />
                        <label htmlFor="dont-store" className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Don't store submissions
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Data Export & Deletion</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Export or delete all your data from PurePen.
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="flex items-center text-error-600 dark:text-error-400 border-error-600 dark:border-error-400 hover:bg-error-50 dark:hover:bg-error-900/50">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete All Data
                    </Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Privacy Preferences</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Control how your data is used within the platform.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="anonymous-data"
                          name="anonymous-data"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 dark:text-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 border-gray-300 dark:border-dark-600 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="anonymous-data" className="font-medium text-gray-700 dark:text-gray-300">
                          Anonymous Usage Data
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Allow us to collect anonymous data to improve our AI models.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketing"
                          name="marketing"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 dark:text-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400 border-gray-300 dark:border-dark-600 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketing" className="font-medium text-gray-700 dark:text-gray-300">
                          Marketing Communications
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          Receive updates, tips, and promotional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="mt-6">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;