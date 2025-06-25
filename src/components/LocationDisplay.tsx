
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

const LocationDisplay: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
              // Using a free geocoding API to get city name
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await response.json();
              
              setLocation({
                city: data.city || data.locality || 'Noma\'lum',
                country: data.countryName || 'Noma\'lum',
                latitude,
                longitude
              });
            } catch (error) {
              console.log('Geolocation service error:', error);
              setLocation({
                city: 'Joylashuv aniqlanmadi',
                country: '',
                latitude,
                longitude
              });
            }
            setLoading(false);
          },
          (error) => {
            console.log('Geolocation error:', error);
            setLocation({
              city: 'Joylashuv ruxsat berilmagan',
              country: '',
              latitude: 0,
              longitude: 0
            });
            setLoading(false);
          }
        );
      } else {
        setLocation({
          city: 'Geolocation qo\'llab-quvvatlanmaydi',
          country: '',
          latitude: 0,
          longitude: 0
        });
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin">📍</div>
            <span className="text-sm">Joylashuv aniqlanmoqda...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg">📍</span>
          <div>
            <p className="text-sm font-medium">
              {location?.city}
              {location?.country && `, ${location.country}`}
            </p>
            {location?.latitude !== 0 && (
              <p className="text-xs text-gray-500">
                {location?.latitude.toFixed(4)}, {location?.longitude.toFixed(4)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDisplay;
