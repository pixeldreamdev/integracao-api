import React from 'react';
import { FaLightbulb, FaSync, FaCreditCard, FaCalendar, FaWallet } from 'react-icons/fa';

const icons = {
  lightbulb: FaLightbulb,
  refresh: FaSync,
  'credit-card': FaCreditCard,
  calendar: FaCalendar,
  wallet: FaWallet,
};

const ServiceBox = ({ title, description, icon }) => {
  const Icon = icons[icon];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl text-primary mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceBox;
