import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header({ title, subtitle, icon }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg shadow-md mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-blue-100 text-sm">{subtitle}</p>
      </div>
      <FontAwesomeIcon icon={icon} className="text-white text-4xl opacity-30" />
    </div>
  );
}
