import InternalLayout from '../layout/InternalLayout';
import PageHeader from '../components/PageHeader';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Campaigns() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadCampaigns = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${user.id}/campaigns`);
        if (!res.ok) {
          setCampaigns([]);
          return;
        }
        const data = await res.json();
        setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
      } catch (err) {
        console.error('Failed to fetch campaigns', err);
        setCampaigns([]);
      }
    };

    loadCampaigns();
  }, [user]);

  return (
    <InternalLayout>
      <PageHeader title="My Campaigns" />
      {campaigns.length === 0 ? (
        <p className="text-center text-gray-500">No campaigns found.</p>
      ) : (
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
          {campaigns.map((campaign) => (
            <li
              key={campaign.id}
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
              className="overflow-hidden rounded-xl outline outline-gray-200 cursor-pointer dark:-outline-offset-1 dark:outline-white/10"
            >
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 dark:border-white/10 dark:bg-gray-800/50">
                <img
                  alt={campaign.company_name}
                  src="https://ik.imagekit.io/boardbid/faviconBB.svg?updatedAt=1754589379642"
                  className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10 dark:bg-gray-700 dark:ring-white/10"
                />
                <div className="text-sm/6 font-medium text-gray-900 dark:text-white">{campaign.company_name}</div>
                <Menu as="div" className="relative ml-auto" onClick={(e) => e.stopPropagation()}>
                  <MenuButton className="relative block text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white">
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                      >
                        View<span className="sr-only">, {campaign.company_name}</span>
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                      >
                        Edit<span className="sr-only">, {campaign.company_name}</span>
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
              <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6 dark:divide-white/10">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">Start</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    <time dateTime={campaign.campaign_start_date}>{campaign.campaign_start_date}</time>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">End</dt>
                  <dd className="text-gray-700 dark:text-gray-300">
                    <time dateTime={campaign.campaign_end_date}>{campaign.campaign_end_date}</time>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">Status</dt>
                  <dd className="text-gray-700 dark:text-gray-300">{campaign.status}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </InternalLayout>
  );
}
