import React, { FC } from 'react';
import { Link } from 'react-router-dom';


// Tentukan tipe props untuk ButtonHome
interface ButtonHomeProps {
  to: string; // rute tujuan, biasanya string
  children: React.ReactNode; // elemen anak di antara tag <ButtonHome>
  className?: string; // opsional, kelas tambahan untuk styling
}

// Komponen ButtonHome menggunakan tipe ButtonHomeProps
const ButtonHome: FC<ButtonHomeProps> = ({ to, children, className }) => {
  return (
    <Link to={to} className={`btn btn-success rounded-pill px-4 py-2 ${className || ''}`}>
      {children}
      <i className="bi-arrow-right ms-2"></i>
    </Link>
  );
};

export default ButtonHome;
