import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function OpsAssignMenu({ current, opsUsers = [], onSelect }) {
  // Stop row click navigation when interacting with the menu
  const stop = (e) => e.stopPropagation();

  const renderMenu = (label) => (
    <Menu as="div" className="relative inline-block text-left" onClick={stop}>
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {label}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-1 outline-black/5">
        <div className="max-h-60 overflow-y-auto py-1">
          {opsUsers.map((u) => (
            <MenuItem key={u.id}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => onSelect(u)}
                  className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center px-4 py-2 text-sm`}
                >
                  {u.image_url ? (
                    <img
                      src={u.image_url}
                      alt={u.email}
                      className="mr-3 h-5 w-5 rounded-full"
                    />
                  ) : null}
                  {u.email}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );

  if (current) {
    return (
      <div className="flex items-center" onClick={stop}>
        {current.image_url ? (
          <img
            src={current.image_url}
            alt={current.email}
            className="mr-2 h-5 w-5 rounded-full"
          />
        ) : null}
        <span className="mr-2 text-sm text-gray-900">{current.email}</span>
        {renderMenu('Reassign')}
      </div>
    );
  }

  return renderMenu('Assign');
}
