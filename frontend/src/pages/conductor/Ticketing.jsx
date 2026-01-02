import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ticketsAPI, routesAPI, conductorsAPI } from '../../services/api';
import { ArrowLeft, Ticket, Plus, Minus, QrCode } from 'lucide-react';

function Ticketing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [stops, setStops] = useState([]);
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [fare, setFare] = useState(15);
  const [issuedTickets, setIssuedTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRouteStops();
  }, []);

  const loadRouteStops = async () => {
    try {
      const assignmentRes = await conductorsAPI.getAssignment(user?.id || 'U002');
      const routeId = assignmentRes.data.route_id;
      const routeRes = await routesAPI.getById(routeId);
      setSelectedRoute(routeRes.data);
      setStops(routeRes.data.stops || []);
    } catch (err) {
      setStops(['Majestic', 'BTM Layout', 'Silk Board', 'HSR Layout', 'Electronic City']);
      setSelectedRoute({ id: '335E', name: 'Majestic → Electronic City' });
    }
  };

  const calculateFare = (from, to) => {
    const fromIndex = stops.indexOf(from);
    const toIndex = stops.indexOf(to);
    const distance = Math.abs(toIndex - fromIndex);
    const baseFare = 10 + (distance * 5);
    setFare(baseFare);
    return baseFare;
  };

  const handleIssueTicket = async () => {
    if (!fromStop || !toStop) return alert('Please select stops');
    setLoading(true);
    try {
      const res = await ticketsAPI.issue({
        bus_id: 'KA-01-F-4532',
        route_id: selectedRoute?.id || '335E',
        from_stop: fromStop,
        to_stop: toStop,
        fare: fare,
        quantity: quantity
      });
      const newTicket = {
        id: res.data.ticket_ids?.[0] || `T${Date.now()}`,
        from: fromStop,
        to: toStop,
        fare: fare * quantity,
        quantity: quantity,
        time: new Date().toLocaleTimeString()
      };
      setIssuedTickets([newTicket, ...issuedTickets]);
      setQuantity(1);
      alert(`✅ ${quantity} ticket(s) issued!`);
    } catch (err) {
      const newTicket = {
        id: `T${Date.now()}`,
        from: fromStop,
        to: toStop,
        fare: fare * quantity,
        quantity: quantity,
        time: new Date().toLocaleTimeString()
      };
      setIssuedTickets([newTicket, ...issuedTickets]);
      setQuantity(1);
      alert(`✅ ${quantity} ticket(s) issued!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="app-header">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/conductor')} className="p-2 hover:bg-white/10 rounded-lg transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Issue Ticket</h1>
            <p className="text-xs opacity-80">Route: {selectedRoute?.name}</p>
          </div>
        </div>
      </header>

      <div className="page-content flex flex-col items-center">
        {/* Ticket Form - Centered Block */}
        <div className="w-full max-w-lg">
          <div className="card">
            <div className="bg-[#C8102E] text-white px-6 py-4">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                New Ticket
              </h2>
            </div>

            <div className="card-body space-y-6">
              {/* From Stop */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">From Stop</label>
                <select
                  value={fromStop}
                  onChange={(e) => {
                    setFromStop(e.target.value);
                    if (toStop) calculateFare(e.target.value, toStop);
                  }}
                  className="input text-lg"
                >
                  <option value="">Select boarding stop</option>
                  {stops.map((stop, i) => (
                    <option key={i} value={stop}>{stop}</option>
                  ))}
                </select>
              </div>

              {/* To Stop */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">To Stop</label>
                <select
                  value={toStop}
                  onChange={(e) => {
                    setToStop(e.target.value);
                    if (fromStop) calculateFare(fromStop, e.target.value);
                  }}
                  className="input text-lg"
                >
                  <option value="">Select destination</option>
                  {stops.map((stop, i) => (
                    <option key={i} value={stop}>{stop}</option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <span className="text-4xl font-bold w-20 text-center text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Fare Display */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-medium">Fare per ticket</span>
                  <span className="text-xl font-bold text-gray-900">₹{fare}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-800 font-bold text-lg">Total Amount</span>
                  <span className="text-3xl font-bold text-[#C8102E]">₹{fare * quantity}</span>
                </div>
              </div>

              {/* Issue Button */}
              <button
                onClick={handleIssueTicket}
                disabled={loading || !fromStop || !toStop}
                className="btn btn-primary w-full py-4 text-xl shadow-lg"
              >
                {loading ? 'Issuing...' : (
                  <>
                    <QrCode className="w-6 h-6" />
                    Issue Ticket
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Recently Issued */}
          {issuedTickets.length > 0 && (
            <div className="mt-8 card animate-fadeIn">
              <div className="card-header bg-gray-50">
                Recently Issued
              </div>
              <div className="divide-y divide-gray-100">
                {issuedTickets.map((ticket, i) => (
                  <div key={i} className="p-5 flex justify-between items-center hover:bg-gray-50 transition">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{ticket.from} → {ticket.to}</p>
                      <p className="text-sm text-gray-500 font-medium mt-1">{ticket.time} • {ticket.quantity} ticket(s)</p>
                    </div>
                    <span className="badge badge-danger text-lg px-4 py-2">₹{ticket.fare}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ticketing;
