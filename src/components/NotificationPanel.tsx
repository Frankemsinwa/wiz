import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Loader2, X } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/accounts/notifications');
      setNotifications(res.data.data.notifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-16 right-6 w-80 bg-white border border-border rounded-2xl shadow-xl z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Notifications</h3>
        <button onClick={onClose}><X size={20} /></button>
      </div>
      {loading ? (
        <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-muted text-center py-4">No notifications.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                <p>{n.message}</p>
                <span className="text-xs text-muted block mt-1">{new Date(n.createdAt).toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
