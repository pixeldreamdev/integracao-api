// import React from 'react';
// import { FaLightbulb, FaSync, FaCreditCard, FaCalendar, FaWallet } from 'react-icons/fa';
// import { ArrowUpRight } from 'lucide-react';

// const icons = {
//   lightbulb: FaLightbulb,
//   refresh: FaSync,
//   'credit-card': FaCreditCard,
//   calendar: FaCalendar,
//   wallet: FaWallet,
// };

// const ServiceBox = ({ title, description, icon, image }) => {
//   const Icon = icons[icon];

//   return (
//     <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-black/95 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-600/20">
//       {/* Tag superior */}
//       <div className="absolute left-4 top-4 z-20">
//         <span className="inline-block rounded-full bg-yellow-500 px-4 py-1 shadow-lg shadow-yellow-500/20">
//           <small className="text-sm font-bold text-black">Empréstimos</small>
//         </span>
//       </div>

//       {/* Imagem com gradiente */}
//       <div className="relative h-[280px] w-full overflow-hidden">
//         <image
//           src="/api/placeholder/400/320"
//           alt={title}
//           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

//         {/* Título sobre a imagem */}
//         <h3 className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xl font-bold text-white transition-colors group-hover:text-yellow-500">
//           {title}
//           <ArrowUpRight className="h-6 w-6 transform text-green-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-yellow-500" />
//         </h3>
//       </div>

//       {/* Área de conteúdo */}
//       <div className="flex flex-1 flex-col justify-between p-6">
//         <p className="mb-6 text-gray-300">{description}</p>

//         <button className="group relative w-full overflow-hidden rounded-lg bg-green-600 py-3 text-center font-medium text-white transition-all hover:bg-green-700">
//           <span className="relative z-10 flex items-center justify-center gap-2">
//             Simular Agora
//             <Icon className="h-4 w-4 transform transition-transform duration-300 group-hover:rotate-12" />
//           </span>
//           <div className="absolute inset-0 z-0 h-full w-0 bg-gradient-to-r from-yellow-500 to-green-600 transition-all duration-300 group-hover:w-full" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServiceBox;
