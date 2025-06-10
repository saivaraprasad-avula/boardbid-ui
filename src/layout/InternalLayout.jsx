import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function InternalLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 sm:ml-60">
        <Header staticHeader={true} />
        <main className="px-6 pt-28 pb-16 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
