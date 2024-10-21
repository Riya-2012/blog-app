import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';
import DashboardComp from '../components/DashboardComp';
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    < div className="min-h-screen flex flex-col md:flex-row" >
    
      <div className=''>
        <DashboardSidebar/>

      </div>
      
{tab ==='profile'&&<DashboardProfile/>}
      {tab==='posts'&&<DashPost/>}
      {tab==='users'&&<DashUsers/>}
      {tab==='comments'&&<DashComment/>}
      {tab==='dashboard'&&<DashboardComp/>}
    </div>
  );
}
