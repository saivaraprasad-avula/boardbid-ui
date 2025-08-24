import { useNavigate } from 'react-router-dom';
import { withBase } from '../utils/basePath.js';

export default function OpsToggle() {
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.checked) {
      navigate(withBase('/ops'));
    }
  };

  return (
    <div className="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 inset-ring inset-ring-gray-900/5 outline-offset-2 outline-[#288dcf] transition-colors duration-200 ease-in-out has-checked:bg-[#288dcf] has-focus-visible:outline-2">
      <span className="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5" />
      <input
        name="ops-mode"
        type="checkbox"
        aria-label="Enable ops mode"
        className="absolute inset-0 appearance-none focus:outline-hidden"
        onChange={handleChange}
      />
    </div>
  );
}

