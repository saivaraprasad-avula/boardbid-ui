import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { ArrowsRightLeftIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import UserAvatarName from './UserAvatarName.jsx';

function cls(...xs) {
  return xs.filter(Boolean).join(' ');
}

export default function OpsAssignMenu({ current, opsUsers = [], onSelect }) {
  const buttonRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  // Normalize opsUsers so every item has `user_id`
  const normalized = useMemo(
    () => (opsUsers || []).map((u) => ({ ...u, user_id: u.user_id ?? u.id })),
    [opsUsers]
  );

  // If current is only { user_id }, enrich it from opsUsers for display
  const resolvedCurrent = useMemo(() => {
    if (!current) return null;
    const uid = current.user_id ?? current.id;
    const fromList = normalized.find((u) => u.user_id === uid);
    return { user_id: uid, ...fromList, ...current };
  }, [current, normalized]);

  const recalc = () => {
    const el = buttonRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      top: r.bottom + 8 + window.scrollY,
      left: r.left + window.scrollX,
      width: r.width,
    });
  };

  const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

  const labelFor = (u) => u?.full_name || u?.email || u?.user_id || u?.id || 'user';

  const LabelWhenAssigned = () => (
    <div className="mr-2">
      <UserAvatarName
        user={resolvedCurrent}
        size="xs"
        className="max-w-[14rem]"
        textClass="text-sm text-gray-900"
      />
    </div>
  );

  return (
    <Menu as="div" className="relative inline-flex items-center gap-2">
      {({ open }) => {
        useLayoutEffect(() => {
          if (open) {
            recalc();
            const onScrollOrResize = () => recalc();
            window.addEventListener('scroll', onScrollOrResize, { passive: true });
            window.addEventListener('resize', onScrollOrResize);
            return () => {
              window.removeEventListener('scroll', onScrollOrResize);
              window.removeEventListener('resize', onScrollOrResize);
            };
          }
        }, [open]);

        return (
          <>
            {resolvedCurrent ? <LabelWhenAssigned /> : null}

            <MenuButton
              ref={buttonRef}
              onClick={(e) => e.stopPropagation()}
              className={cls(
                'inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              )}
              aria-label={resolvedCurrent ? 'Reassign ops owner' : 'Assign ops owner'}
            >
              {resolvedCurrent ? (
                <ArrowsRightLeftIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <UserPlusIcon className="h-4 w-4 text-gray-500" />
              )}
            </MenuButton>

            <Portal>
              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems
                  static
                  className="fixed z-50 mt-1 max-h-72 w-64 origin-top-left overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                  style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
                >
                  <div className="py-1">
                    {normalized.map((u) => (
                      <MenuItem key={u.user_id}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => onSelect(u)} // normalized (has user_id)
                            className={cls(
                              'group flex w-full items-center px-4 py-2 text-left text-sm',
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            )}
                          >
                            {u.image_url ? (
                              <img
                                src={u.image_url}
                                alt={labelFor(u)}
                                className="mr-3 h-5 w-5 rounded-full"
                              />
                            ) : (
                              <div className="mr-3 h-5 w-5 rounded-full bg-gray-200" />
                            )}
                            <div className="min-w-0">
                              <div className="truncate">{labelFor(u)}</div>
                              {u.full_name && u.email && (
                                <div className="truncate text-xs text-gray-500">
                                  {u.full_name}
                                </div>
                              )}
                            </div>
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Transition>
            </Portal>
          </>
        );
      }}
    </Menu>
  );
}