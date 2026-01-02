import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoordinatorLayout from '../../components/CoordinatorLayout';
import { busesAPI, routesAPI, notificationsAPI, aiAPI } from '../../services/api';
import { Bus, MessageCircle, Lightbulb, ChevronRight, TrendingUp, TrendingDown, AlertCircle, Zap } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeBuses: 35,
    highDemand: 12,
    lowDemand: 7,
    aiSuggestions: 9,
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [busStats, routeStats, aiStats, recentAlerts] = await Promise.all([
        busesAPI.getStats(),
        routesAPI.getStats(),
        aiAPI.getMLSuggestionsCount(),
        notificationsAPI.getRecent(4),
      ]);
      setStats({
        activeBuses: busStats.data.total_active_buses || 35,
        highDemand: routeStats.data.routes_with_high_demand || 12,
        lowDemand: routeStats.data.routes_with_low_demand || 7,
        aiSuggestions: aiStats.data.ml_suggested_reallocations || 9,
      });
      setAlerts(recentAlerts.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const statsData = [
    { icon: Bus, value: stats.activeBuses, label: 'Active Buses', color: 'bg-blue-500', iconColor: 'text-blue-500', bgLight: 'bg-blue-50' },
    { icon: TrendingUp, value: stats.highDemand, label: 'High Demand Routes', color: 'bg-red-500', iconColor: 'text-red-500', bgLight: 'bg-red-50' },
    { icon: TrendingDown, value: stats.lowDemand, label: 'Low Demand Routes', color: 'bg-amber-500', iconColor: 'text-amber-500', bgLight: 'bg-amber-50' },
    { icon: Zap, value: stats.aiSuggestions, label: 'AI Suggestions', color: 'bg-purple-500', iconColor: 'text-purple-500', bgLight: 'bg-purple-50' },
  ];

  const defaultAlerts = [
    { message: 'Bus KA-01-F-4532 stuck at Silk Board junction', time: '2 min ago' },
    { message: 'Route R-276 at 90% capacity - dispatch recommended', time: '15 min ago' },
    { message: 'Waterlogging near Hebbal flyover', time: '30 min ago' },
  ];

  return (
    <CoordinatorLayout title="Control Center">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {statsData.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className={`stat-icon ${stat.bgLight} ${stat.iconColor}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <div className="lg:col-span-2 card">
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#C8102E]" />
              <span>Recent Alerts</span>
            </div>
            <button className="text-sm text-[#C8102E] font-medium flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="card-body space-y-3">
            {(alerts.length > 0 ? alerts : defaultAlerts).map((alert, idx) => (
              <div key={idx} className="alert-item">
                <p>{alert.message}</p>
                <p className="time">{alert.time || new Date(alert.timestamp).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">Quick Actions</div>
          <div className="card-body space-y-3">
            <button onClick={() => navigate('/coordinator/routes')} className="btn btn-secondary w-full justify-start">
              <Bus className="w-5 h-5" />
              Track Live Buses
            </button>
            <button onClick={() => navigate('/coordinator/ai')} className="btn btn-primary w-full justify-start">
              <Lightbulb className="w-5 h-5" />
              AI Recommendations
            </button>
            <button onClick={() => navigate('/coordinator/communication')} className="btn w-full justify-start bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="w-5 h-5" />
              Message Conductors
            </button>
          </div>
        </div>
      </div>
    </CoordinatorLayout>
  );
}

export default Dashboard;
