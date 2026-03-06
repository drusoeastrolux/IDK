import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, TrendingUp, Activity, Plus, Mail, Briefcase, Calendar } from 'lucide-react';

function App() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, statsResponse] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/stats')
      ]);
      setUsers(usersResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', role: '' });
      setShowAddUser(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-float">
          <h1 className="text-6xl font-bold gradient-text mb-4">March 6 Dashboard</h1>
          <p className="text-gray-300 text-lg">A beautiful full-stack application with comprehensive testing</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-morphism p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="text-purple-400" size={32} />
            </div>
          </div>
          
          <div className="glass-morphism p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Projects</p>
                <p className="text-3xl font-bold text-white">{stats.activeProjects}</p>
              </div>
              <TrendingUp className="text-blue-400" size={32} />
            </div>
          </div>
          
          <div className="glass-morphism p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Completed Tasks</p>
                <p className="text-3xl font-bold text-white">{stats.completedTasks}</p>
              </div>
              <Activity className="text-green-400" size={32} />
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="glass-morphism p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Team Members</h2>
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Plus size={20} />
              Add User
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all" data-testid="user-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-semibold">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Mail size={14} className="mr-2" />
                  {user.email}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="glass-morphism p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-white mb-6">Add New User</h3>
              <form onSubmit={handleAddUser}>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    name="name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Role</label>
                  <input
                    type="text"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    name="role"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
