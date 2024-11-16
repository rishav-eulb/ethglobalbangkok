import { useState } from 'react';
import { Home, SendHorizontal, PieChart, Activity, Database } from 'lucide-react';
import HomeScreen from './screens/home/home';
import { IconLabel, UserData } from './types/userData';
import SendScreen from './screens/send/sendscreen';
import PortfolioScreen from './screens/portfolio/portfolioscreen';
import DefiScreen from './screens/defi/defiscreen';
import ActivityScreen from './screens/activity/activityscreen';
import NavBar from './components/navbar/navbar';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import LoginPage from './screens/login/loginScreen';

const DashboardUI = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useDynamicContext()
  console.log(import.meta.env)

  const iconLabelMapping: Array<IconLabel> = [
    {label: "home", icon: Home},
    {label: "send", icon: SendHorizontal},
    {label: "portfolio", icon: PieChart},
    {label: "activity", icon: Activity},
    {label: "defi", icon: Database},
  ]

  // Mock data
  const userData: UserData  = {
    totalBalance: 15420.50,
    assets: [
      { name: 'ETH', value: 8240.30, amount: '2.75' },
      { name: 'BTC', value: 5180.20, amount: '0.12' },
      { name: 'USDC', value: 2000.00, amount: '2000.00' }
    ]
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomeScreen userData={userData}/>
      case 'send':
        return <SendScreen/>
      case 'portfolio':
        return <PortfolioScreen/>
      case 'activity':
        return <ActivityScreen/>;
      case 'defi':
        return <DefiScreen/>;
    }
  };

  const HomePage = () => {
    return <div className="h-128 w-256 flex flex-col bg-gray-50 justify-around">
        <div className="max-w-6xl mx-auto py-100 w-full p-4 overflow-scroll min-h-[512px] max-h-[512px] ">
          {renderContent()}
        </div>
        <NavBar iconLabelMapping={iconLabelMapping} setActiveTab={setActiveTab} activeTab={activeTab}/>
      </div>
  }

  return (
    <>
      {!!user ? <HomePage/> : <LoginPage/>}
    </>
  );
};

export default DashboardUI;