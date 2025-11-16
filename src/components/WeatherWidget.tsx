import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";

const WeatherWidget = () => {
  // Mock weather data - in production, this would come from an API
  const weatherData = {
    location: "ঢাকা",
    temperature: "২৮°C",
    condition: "আংশিক মেঘলা",
    humidity: "৭৫%",
    windSpeed: "১৫ কিমি/ঘণ্টা",
    forecast: [
      { day: "আজ", temp: "২৮°", icon: Cloud },
      { day: "আগামীকাল", temp: "৩০°", icon: Sun },
      { day: "পরশু", temp: "২৬°", icon: CloudRain },
    ]
  };

  return (
    <Card className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-950 dark:to-blue-900 border-sky-200 dark:border-sky-800 p-6 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/30 dark:bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-2xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-sky-900 dark:text-sky-100">আবহাওয়া</h3>
          <Cloud className="w-8 h-8 text-sky-600 dark:text-sky-300" />
        </div>

        {/* Current weather */}
        <div className="mb-6">
          <p className="text-sm text-sky-700 dark:text-sky-300 mb-1">{weatherData.location}</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold text-sky-900 dark:text-sky-50">
              {weatherData.temperature}
            </span>
            <span className="text-sm text-sky-700 dark:text-sky-300">
              {weatherData.condition}
            </span>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 rounded-lg p-2">
              <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-sky-600 dark:text-sky-400">আর্দ্রতা</p>
                <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
                  {weatherData.humidity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 rounded-lg p-2">
              <Wind className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <div>
                <p className="text-xs text-sky-600 dark:text-sky-400">বাতাস</p>
                <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
                  {weatherData.windSpeed}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="border-t border-sky-300 dark:border-sky-700 pt-4">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300 mb-3">পূর্বাভাস</p>
          <div className="grid grid-cols-3 gap-2">
            {weatherData.forecast.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/60 dark:bg-black/30 rounded-lg p-2 text-center"
              >
                <p className="text-xs text-sky-700 dark:text-sky-300 mb-1">{item.day}</p>
                <item.icon className="w-5 h-5 mx-auto text-sky-600 dark:text-sky-400 mb-1" />
                <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">{item.temp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
