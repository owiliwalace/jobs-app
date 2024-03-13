"use client"

import CalendarDemo from '@/components/dashboard/calender';
import ControlButtonArea from '@/components/dashboard/control';
import Header from '@/components/dashboard/header';
import MessagesArea from '@/components/dashboard/messages';
import QRCodeArea from '@/components/dashboard/qrCode';
import Sidebar from '@/components/dashboard/sideBar';

import React from 'react';


const Home: React.FC = () => {
  return (
    <div className="flex h-screen">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 ">
          <QRCodeArea />
        
          <CalendarDemo />
        </div>
      </div>
    </div>
  );
};

export default Home;
